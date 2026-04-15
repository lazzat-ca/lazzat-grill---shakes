// src/components/admin/AdminLayout.tsx
import { useEffect, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UtensilsCrossed,
  FlaskConical,
  Sparkles,
  BookOpen,
  Users,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, adminOnly: true },
  { label: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed, adminOnly: true },
  { label: "Sauces", href: "/admin/sauces", icon: FlaskConical, adminOnly: true },
  { label: "Seasonings", href: "/admin/seasonings", icon: Sparkles, adminOnly: true },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { label: "Users", href: "/admin/users", icon: Users, adminOnly: true },
  { label: "Account", href: "/admin/account", icon: Users }, // for email/password change
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, profile, loading, signOut, isAdmin, isSeoEditor, profileLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !profileLoading && !user) {
      navigate("/admin/login");
    }
  }, [loading, profileLoading, user, navigate]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  // Not authenticated — useEffect will redirect; render nothing to avoid flash
  if (!user) return null;

  if (!profile || !isSeoEditor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/40 border border-primary/20 rounded-xl p-6 text-center">
          <h1 className="font-serif text-2xl text-foreground mb-2">Access Pending</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Your account has no assigned admin role yet. Please contact an admin to set your role.
          </p>
          <Button onClick={() => navigate("/admin/login")}>Back to Login</Button>
        </div>
      </div>
    );
  }

  // Only show Blog Posts and Account for seo_editor (admins see all)
  const visibleNav = isAdmin
    ? navItems
    : navItems.filter((item) => item.label === "Blog Posts" || item.label === "Account");

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-black/60 border-r border-primary/20 flex flex-col">
        {/* Brand */}
        <div className="px-4 py-5 border-b border-primary/20">
          <Link to="/" className="font-serif text-lg text-foreground">
            Lazzat <span className="text-primary">Admin</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {profile?.email ?? user.email}
          </p>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
            {profile?.role ?? "—"}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {visibleNav.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(href);
            return (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-sans transition-colors",
                  active
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-primary/20">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
