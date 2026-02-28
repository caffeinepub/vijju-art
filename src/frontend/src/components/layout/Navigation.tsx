import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = location.pathname;
  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on route change
  useEffect(() => {
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur ${
        scrolled
          ? "bg-background/90 border-b border-border shadow-luxury"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-02-28-at-4.48.04-PM-1.jpeg"
              alt="Vijeyta Portrait Artist"
              className="h-16 w-auto object-contain group-hover:opacity-85 transition-opacity duration-300"
              style={{ maxWidth: "180px" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md group ${
                  pathname === link.to
                    ? "text-rose-deep"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
                {pathname === link.to && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-deep rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2 text-sm font-medium rounded-full btn-luxury text-white transition-all duration-300 hover:scale-105 hover:shadow-rose"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-background/95 border-t border-border px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                pathname === link.to
                  ? "text-rose-deep bg-rose-light"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-2 mx-0 px-4 py-3 text-sm font-medium text-center rounded-full btn-luxury text-white"
          >
            Order Your Custom Sketch
          </Link>
        </nav>
      </div>
    </header>
  );
}
