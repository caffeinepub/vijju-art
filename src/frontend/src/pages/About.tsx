import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Heart, Palette, Star } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const qualities = [
  {
    icon: Heart,
    title: "Created with Passion",
    desc: "Every stroke is an expression of love for the craft and dedication to your memories.",
  },
  {
    icon: Palette,
    title: "Artistic Excellence",
    desc: "Years of training and practice merge to deliver portraits of extraordinary realism.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "Using the finest pencils, papers, and techniques to ensure lasting beauty.",
  },
  {
    icon: Award,
    title: "100% Handcrafted",
    desc: "Every single line drawn by hand — no digital shortcuts, pure artistry.",
  },
];

export function About() {
  const sectionRef = useReveal();

  return (
    <main ref={sectionRef as React.RefObject<HTMLElement>} className="pt-20">
      {/* ── Page Hero ── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        aria-label="About hero"
      >
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.035 15) 0%, oklch(0.98 0.012 30) 60%, oklch(0.96 0.02 10) 100%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-40 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.09 15), transparent)",
            transform: "translate(25%, -25%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-4 block reveal">
              The Artist
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 reveal">
              The Story Behind{" "}
              <span className="shimmer-text">Vijeyta yadav</span>
            </h1>
            <div className="divider-rose max-w-xs mx-auto mb-8 reveal">
              <span className="text-rose-deep text-lg">✦</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed reveal">
              Where passion meets pencil, and memories become masterpieces.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="py-24 lg:py-32" aria-label="Artist story">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image collage */}
            <div className="reveal">
              <div className="relative">
                {/* Main image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-luxury">
                  <img
                    src="/assets/generated/artist-at-work.dim_800x600.jpg"
                    alt="Vijju at work sketching"
                    className="w-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </div>
                {/* Floating portrait */}
                <div className="absolute -bottom-8 -right-6 z-20 w-36 h-44 rounded-xl overflow-hidden shadow-luxury border-4 border-white hidden sm:block">
                  <img
                    src="/assets/generated/portrait-sketch-1.dim_600x750.jpg"
                    alt="Sample portrait sketch"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Decorative blob */}
                <div
                  className="absolute -top-6 -left-6 w-32 h-32 rounded-full z-0 hidden sm:block"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.85 0.1 15), oklch(0.78 0.12 20))",
                    opacity: 0.6,
                  }}
                />
                {/* Year badge */}
                <div className="absolute top-4 -left-4 z-20 bg-white rounded-xl px-4 py-3 shadow-luxury hidden sm:block">
                  <p className="font-display text-2xl font-bold text-rose-deep leading-none">
                    500+
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Portraits Created
                  </p>
                </div>
              </div>
            </div>

            {/* Story text */}
            <div className="space-y-8">
              <div className="space-y-5 reveal">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  A Lifelong Love for Lines and Light
                </h2>
                <div className="h-0.5 w-16 bg-rose-deep rounded-full" />
                <p className="text-base text-muted-foreground leading-relaxed">
                  My name is Vijju, and I have been captivated by the art of
                  sketching since childhood. Growing up, I was always the one
                  with pencil in hand, trying to capture the faces of the people
                  I loved most. What began as a quiet hobby blossomed into a
                  deep calling — a way to preserve emotion, identity, and
                  connection through art.
                </p>
              </div>

              <div className="space-y-4 reveal">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  From Sketchbook to Canvas
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Over the years, I refined my technique by studying classical
                  portraiture, practicing thousands of hours of figure drawing,
                  and developing my own signature style — one that blends
                  photographic realism with an emotional softness that
                  photographs alone cannot capture.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  I specialize in pencil sketches and portrait art, accepting
                  custom commissions from clients who want to gift or preserve a
                  special moment. Whether it's a wedding portrait, a beloved
                  family member, a cherished pet, or a timeless memory — I pour
                  my heart into every piece.
                </p>
              </div>

              <div
                className="rounded-2xl p-6 reveal"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.93 0.05 15), oklch(0.96 0.03 20))",
                }}
              >
                <p className="font-display text-lg italic text-foreground/80 leading-relaxed">
                  "Art is the language the soul speaks when words fall short. I
                  don't just sketch faces — I sketch stories."
                </p>
                <p className="mt-3 text-sm text-muted-foreground font-medium">
                  — Vijju
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="py-24 relative overflow-hidden" aria-label="Mission">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.16 15) 0%, oklch(0.42 0.14 20) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-4 block reveal">
            My Mission
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 reveal">
            Delivering Emotional, Realistic Artwork That Captures Souls
          </h2>
          <p className="text-lg text-white/75 leading-relaxed mb-10 reveal">
            My mission is simple yet profound: to deliver artwork that doesn't
            merely resemble its subject, but truly captures the spirit within. I
            believe that a great portrait makes you feel something — it holds
            the laughter in the eyes, the warmth of a smile, the quiet dignity
            of a face you love.
          </p>
          <div className="reveal">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide rounded-full bg-white text-rose-deep hover:bg-rose-light transition-all duration-300 hover:scale-105 group"
            >
              Commission Your Portrait
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Qualities Grid ── */}
      <section className="py-24 lg:py-32" aria-label="Artist qualities">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-3 block">
              Why Choose Vijeyta yadav
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Art You Can Feel
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {qualities.map((q, i) => {
              const Icon = q.icon;
              return (
                <div
                  key={q.title}
                  className="reveal flex gap-5 p-6 rounded-2xl border border-border hover:border-rose-mid hover:shadow-luxury transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                    }}
                  >
                    <Icon size={20} className="text-rose-deep" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {q.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {q.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Artwork Preview Strip ── */}
      <section
        className="py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.95 0.035 15), oklch(0.98 0.01 20))",
        }}
        aria-label="Portfolio preview"
      >
        <div className="container mx-auto px-6 lg:px-8 text-center mb-10 reveal">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            A Glimpse of My Work
          </h2>
        </div>
        <div className="flex gap-4 px-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="gallery-card flex-shrink-0 w-48 h-60 rounded-xl shadow-luxury snap-center reveal"
            >
              <img
                src={`/assets/generated/portrait-sketch-${n}.dim_600x750.jpg`}
                alt={`Portrait sketch ${n}`}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
              <div className="overlay rounded-xl" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold rounded-full btn-luxury text-white hover:scale-105 hover:shadow-rose transition-all group"
          >
            View Full Gallery
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
