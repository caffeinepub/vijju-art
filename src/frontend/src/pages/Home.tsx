import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const featuredArtworks = [
  {
    src: "/assets/generated/portrait-sketch-1.dim_600x750.jpg",
    title: "Elegant Portrait",
    category: "Pencil Sketch",
  },
  {
    src: "/assets/generated/portrait-sketch-2.dim_600x750.jpg",
    title: "Couple's Memory",
    category: "Portrait Art",
  },
  {
    src: "/assets/generated/portrait-sketch-6.dim_600x750.jpg",
    title: "Bridal Portrait",
    category: "Custom Order",
  },
];

export function Home() {
  const sectionRef = useReveal();

  return (
    <main>
      {/* ── Hero Section ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-bg.dim_1400x800.jpg"
            alt="Artist workspace"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Multi-layer overlay for luxury feel */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.06 15 / 0.78) 0%, oklch(0.22 0.04 20 / 0.55) 50%, oklch(0.15 0.08 10 / 0.75) 100%)",
            }}
          />
          {/* Rose vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, oklch(0.12 0.06 15 / 0.5) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center pt-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8 animate-fade-in-up animate-delay-100">
            <Sparkles size={13} className="text-rose-mid" />
            <span className="text-xs text-white/80 tracking-widest uppercase font-medium">
              Premium Handcrafted Art
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up animate-delay-200">
            Turning Your
            <span
              className="block mt-2"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.88 0.1 15), oklch(0.82 0.12 30), oklch(0.92 0.06 15))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Precious Moments
            </span>
            into Timeless Sketch Art
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up animate-delay-300">
            Premium Handmade Portraits Crafted with Passion and Detail.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-400">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide rounded-full btn-luxury text-white transition-all duration-300 hover:scale-105 hover:shadow-rose-lg group"
            >
              Order Your Custom Sketch
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wide rounded-full border border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              View Gallery
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animate-delay-700">
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
              <div
                className="w-1 h-2 rounded-full bg-white/60"
                style={{ animation: "fadeInUp 1.5s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Artworks ── */}
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32"
        aria-label="Featured artworks"
      >
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 reveal">
            <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-3 block">
              Featured Works
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Artistry in Every Stroke
            </h2>
            <div className="divider-rose max-w-xs mx-auto mt-6">
              <span className="text-rose-deep text-lg">✦</span>
            </div>
          </div>

          {/* Artwork Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredArtworks.map((artwork, i) => (
              <article
                key={artwork.src}
                className={`gallery-card rounded-xl shadow-luxury cursor-pointer reveal ${
                  i === 1 ? "md:mt-8" : ""
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={artwork.src}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="overlay">
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                        {artwork.category}
                      </p>
                      <h3 className="font-display text-white text-xl font-semibold">
                        {artwork.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View all link */}
          <div className="text-center mt-12 reveal">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-rose-deep hover:text-foreground transition-colors group"
            >
              View Full Gallery
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Artist Introduction ── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        aria-label="About the artist"
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.025 15) 0%, oklch(0.98 0.012 30) 50%, oklch(0.975 0.018 10) 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-30 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.08 15), transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-64 h-64 rounded-full opacity-20 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.1 20), transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.1 15), oklch(0.6 0.14 20))",
                    transform: "rotate(-2deg) scale(1.02)",
                    zIndex: 0,
                  }}
                />
                <img
                  src="/assets/generated/artist-at-work.dim_800x600.jpg"
                  alt="Vijju sketching a portrait"
                  className="relative z-10 w-full rounded-2xl shadow-luxury object-cover aspect-[4/3]"
                  loading="lazy"
                />
                {/* Badge */}
                <div className="absolute z-20 -bottom-5 -right-3 bg-white rounded-xl px-5 py-3 shadow-luxury">
                  <p className="font-display text-2xl font-bold text-rose-deep leading-none">
                    5+
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Years of Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="reveal order-1 lg:order-2 space-y-6">
              <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold">
                Meet the Artist
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Crafted with Soul,{" "}
                <span className="shimmer-text">Sketched with Heart</span>
              </h2>
              <div className="h-0.5 w-16 bg-rose-deep rounded-full" />
              <p className="text-base text-muted-foreground leading-relaxed">
                Hi, I'm Vijju — a passionate sketch and portrait artist
                dedicated to capturing the essence of your most precious
                moments. Every line I draw tells a story, every shadow reveals
                emotion.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                With meticulous attention to detail and a deep love for
                realistic portraiture, I transform your photographs into
                hand-drawn masterpieces that will be treasured for generations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full btn-luxury text-white transition-all hover:scale-105 hover:shadow-rose group"
                >
                  My Story
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-border text-foreground hover:bg-muted transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial / Process Banner ── */}
      <section className="py-20 relative overflow-hidden" aria-label="Process">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.16 15) 0%, oklch(0.42 0.14 20) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed max-w-3xl mx-auto italic">
            "Every portrait I create is a bridge between memory and art — a
            timeless gift that speaks when words cannot."
          </p>
          <p className="mt-6 text-white/60 text-sm tracking-widest uppercase">
            — Vijju, Artist
          </p>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-24 lg:py-32" aria-label="How it works">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-3 block">
              How It Works
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your Custom Portrait Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Share Your Photo",
                desc: "Send me a clear, high-quality photograph of your loved one or special moment.",
              },
              {
                number: "02",
                title: "Choose Your Style",
                desc: "Select from pencil sketch, portrait art, or custom mixed-media styles.",
              },
              {
                number: "03",
                title: "I Create Your Art",
                desc: "I sketch your portrait by hand with passion and meticulous attention to detail.",
              },
              {
                number: "04",
                title: "Delivered to You",
                desc: "Receive your framed or digital artwork ready to cherish forever.",
              },
            ].map((step, i) => (
              <div
                key={step.number}
                className="reveal text-center space-y-4 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                  }}
                >
                  <span className="font-display text-rose-deep font-bold text-sm">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 reveal">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide rounded-full btn-luxury text-white transition-all duration-300 hover:scale-105 hover:shadow-rose-lg group"
            >
              Order Your Custom Sketch
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
