// src/vite-api-plugin.ts
// Vite plugin that serves /api/* routes in development mode.
// Uses server.ssrLoadModule to transform TypeScript API handlers
// through Vite's pipeline (resolves aliases, handles TS).
import type { Plugin, Connect } from "vite";
import type { IncomingMessage } from "node:http";

async function nodeReqToWebRequest(
  req: IncomingMessage & { body?: unknown },
  base: string
): Promise<Request> {
  const url = new URL(req.url!, base);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === "string") headers.set(k, v);
    else if (Array.isArray(v)) v.forEach((val) => headers.append(k, val));
  }

  let body: BodyInit | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve) => {
      req.on("data", (chunk: Buffer) => chunks.push(chunk));
      req.on("end", () => resolve());
    });
    if (chunks.length > 0) {
      body = Buffer.concat(chunks);
    }
  }

  return new Request(url.toString(), {
    method: req.method ?? "GET",
    headers,
    body,
  });
}

export function viteApiPlugin(): Plugin {
  return {
    name: "lazzat-api-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req: Connect.IncomingMessage, res, next) => {
        const pathname = (req.url ?? "").split("?")[0];
        if (!pathname.startsWith("/api/")) return next();

        // Map URL path to file: /api/chat -> api/chat.ts, /api/admin/menu -> api/admin/menu.ts
        const handlerFile = pathname.replace(/^\//, "").replace(/\/$/, "") + ".ts";

        try {
          const module = await server.ssrLoadModule(`/${handlerFile}`);
          const handler = module.default as { fetch?: (req: Request) => Promise<Response> } | undefined;

          if (!handler?.fetch) return next();

          const base = `http://${req.headers.host ?? "localhost"}`;
          const webRequest = await nodeReqToWebRequest(req, base);
          const webResponse = await handler.fetch(webRequest);

          res.statusCode = webResponse.status;
          webResponse.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });

          const buffer = Buffer.from(await webResponse.arrayBuffer());
          res.end(buffer);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[api-dev] ${pathname}:`, msg);
          // Don't swallow – send a JSON error response
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal dev API error", detail: msg }));
        }
      });
    },
  };
}
