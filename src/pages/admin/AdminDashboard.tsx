// src/pages/admin/AdminDashboard.tsx
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuthContext } from "@/context/AuthContext";
import { UtensilsCrossed, FlaskConical, Sparkles, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  { label: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed, desc: "Add, edit or remove menu items" },
  { label: "Sauces", href: "/admin/sauces", icon: FlaskConical, desc: "Manage sauce offerings" },
  { label: "Seasonings", href: "/admin/seasonings", icon: Sparkles, desc: "Manage spice & seasoning library" },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen, desc: "Create and publish blog content" },
  { label: "Users", href: "/admin/users", icon: Users, desc: "Manage admin users and roles", adminOnly: true },
];

const AdminDashboard = () => {
  const { profile, isAdmin } = useAuthContext();
  const visibleCards = cards.filter((c) => !c.adminOnly || isAdmin);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-foreground">
          Welcome back<span className="text-primary">,</span>{" "}
          {profile?.email?.split("@")[0] ?? "Admin"}
        </h1>
        <p className="text-muted-foreground mt-1">
          Role: <span className="text-primary capitalize">{profile?.role ?? "—"}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCards.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            to={href}
            className="block p-5 rounded-xl border border-primary/20 bg-black/40 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Icon size={18} className="text-primary" />
              </div>
              <h2 className="font-serif text-lg text-foreground">{label}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
