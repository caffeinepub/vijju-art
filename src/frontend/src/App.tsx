import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/layout/Footer";
import { Navigation } from "./components/layout/Navigation";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Gallery } from "./pages/Gallery";
import { Home } from "./pages/Home";
import { Orders } from "./pages/Orders";

// ── Root layout ──
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  ),
});

// ── Page routes ──
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
});

// ── Router ──
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  galleryRoute,
  contactRoute,
  ordersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
