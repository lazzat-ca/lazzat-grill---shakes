import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouteLoader } from "@/components/shared/RouteLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

const Index = lazy(() => import("./pages/Index"));
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Locations = lazy(() => import("./pages/Locations"));
const Order = lazy(() => import("./pages/Order"));
const Contact = lazy(() => import("./pages/Contact"));
const Flavours = lazy(() => import("./pages/Flavours"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Catering = lazy(() => import("./pages/Catering"));
const Blog = lazy(() => import("./pages/Blog"));

// Admin pages (lazy-loaded, only loaded when navigating to /admin)
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMenu = lazy(() => import("./pages/admin/AdminMenu"));
const AdminSauces = lazy(() => import("./pages/admin/AdminSauces"));
const AdminSeasonings = lazy(() => import("./pages/admin/AdminSeasonings"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/order" element={<Order />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/flavours" element={<Flavours />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/menu" element={<AdminMenu />} />
              <Route path="/admin/sauces" element={<AdminSauces />} />
              <Route path="/admin/seasonings" element={<AdminSeasonings />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
              <Route path="/admin/users" element={<AdminUsers />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
