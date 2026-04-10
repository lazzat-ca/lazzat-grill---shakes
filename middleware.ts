import { next } from "@vercel/functions";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __lazzatMiddlewareRateStore: Map<string, RateLimitEntry> | undefined;
}

const rateStore = globalThis.__lazzatMiddlewareRateStore ?? new Map<string, RateLimitEntry>();
globalThis.__lazzatMiddlewareRateStore = rateStore;

const blockedUserAgentPattern = /curl|wget|python|axios|node-fetch|go-http-client|headless|selenium|playwright|phantom|scrapy|postman|insomnia/i;
const assetHotspotPattern = /\/assets\/.+\.(mp4|webm|mov)$/i;

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
};

const checkRateLimit = (key: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const current = rateStore.get(key);

  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: Math.ceil(windowMs / 1000) };
  }

  current.count += 1;
  rateStore.set(key, current);

  return {
    allowed: current.count <= limit,
    retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
};

export const config = {
  matcher: ["/api/:path*", "/assets/:path*"],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent")?.trim() || "unknown";
  const isApiRoute = path.startsWith("/api/");
  const isHotAsset = assetHotspotPattern.test(path);

  if (isApiRoute || isHotAsset) {
    if (userAgent === "unknown" || blockedUserAgentPattern.test(userAgent)) {
      console.warn("[lazzat-middleware] blocked_user_agent", JSON.stringify({ path, ip, userAgent }));
      return new Response("Forbidden", {
        status: 403,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      });
    }
  }

  if (isApiRoute) {
    const result = checkRateLimit(`api:${ip}`, 12, 10 * 60 * 1000);
    if (!result.allowed) {
      console.warn("[lazzat-middleware] api_rate_limited", JSON.stringify({ path, ip, retryAfter: result.retryAfter }));
      return new Response("Too many requests", {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfter),
          "Cache-Control": "no-store, max-age=0",
        },
      });
    }
  }

  if (isHotAsset) {
    const result = checkRateLimit(`asset:${ip}:${path}`, 8, 10 * 60 * 1000);
    if (!result.allowed) {
      console.warn("[lazzat-middleware] asset_rate_limited", JSON.stringify({ path, ip, retryAfter: result.retryAfter }));
      return new Response("Too many requests", {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfter),
          "Cache-Control": "public, max-age=60",
        },
      });
    }
  }

  return next();
}
