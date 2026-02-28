import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "vijjuart.icp0.io";

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.04 15) 0%, oklch(0.18 0.06 20) 100%)",
        }}
      />

      {/* Decorative rose petal shapes */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.1 15), transparent)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.12 10), transparent)",
          transform: "translate(30%, 30%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-white/90">
                Vijju <span className="text-rose-mid">Art</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Transforming precious moments into timeless sketch art, crafted
              with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-widest text-white/40 font-semibold">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-white/60 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-widest text-white/40 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:vijjuart245@gmail.com"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
              >
                <Mail
                  size={15}
                  className="group-hover:text-rose-mid transition-colors flex-shrink-0"
                />
                vijjuart245@gmail.com
              </a>
              <a
                href="https://instagram.com/vijjuart245"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
              >
                <SiInstagram
                  size={15}
                  className="group-hover:text-rose-mid transition-colors flex-shrink-0"
                />
                @vijjuart245
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {year} Vijeyta yadav. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
