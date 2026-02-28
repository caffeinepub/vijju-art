import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Category } from "../backend";
import { useGalleryItems } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

// Fallback gallery data using generated images
const FALLBACK_ITEMS = [
  {
    id: BigInt(1),
    title: "Elegant Woman Portrait",
    category: Category.pencilSketch,
    description: "Detailed pencil sketch capturing graceful feminine features",
    imageUrl: "/assets/generated/portrait-sketch-1.dim_600x750.jpg",
  },
  {
    id: BigInt(2),
    title: "Couple's Cherished Moment",
    category: Category.portraitArt,
    description: "A beautiful portrait capturing the bond between two souls",
    imageUrl: "/assets/generated/portrait-sketch-2.dim_600x750.jpg",
  },
  {
    id: BigInt(3),
    title: "Childhood Innocence",
    category: Category.pencilSketch,
    description: "A delicate child portrait full of wonder and joy",
    imageUrl: "/assets/generated/portrait-sketch-3.dim_600x750.jpg",
  },
  {
    id: BigInt(4),
    title: "Wisdom in Lines",
    category: Category.portraitArt,
    description: "Portrait of an elderly gentleman with dignified presence",
    imageUrl: "/assets/generated/portrait-sketch-4.dim_600x750.jpg",
  },
  {
    id: BigInt(5),
    title: "Family Legacy",
    category: Category.customOrders,
    description: "A custom multi-person family portrait, full of love",
    imageUrl: "/assets/generated/portrait-sketch-5.dim_600x750.jpg",
  },
  {
    id: BigInt(6),
    title: "Bridal Radiance",
    category: Category.customOrders,
    description: "An exquisite bridal portrait capturing timeless elegance",
    imageUrl: "/assets/generated/portrait-sketch-6.dim_600x750.jpg",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  [Category.pencilSketch]: "Pencil Sketch",
  [Category.portraitArt]: "Portrait Art",
  [Category.customOrders]: "Custom Orders",
};

type FilterKey = "all" | Category;

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const sectionRef = useReveal();

  const { data: galleryItems, isLoading, isError } = useGalleryItems();

  // Use backend data if available, otherwise fallback
  const items =
    galleryItems && galleryItems.length > 0
      ? galleryItems.map((item, i) => ({
          ...item,
          imageUrl:
            item.imageUrl ||
            `/assets/generated/portrait-sketch-${(i % 6) + 1}.dim_600x750.jpg`,
        }))
      : FALLBACK_ITEMS;

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <main ref={sectionRef as React.RefObject<HTMLElement>} className="pt-20">
      {/* ── Page Hero ── */}
      <section
        className="py-24 lg:py-28 relative overflow-hidden"
        aria-label="Gallery hero"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.035 15) 0%, oklch(0.98 0.012 30) 60%, oklch(0.96 0.02 10) 100%)",
          }}
        />
        <div
          className="absolute left-0 top-0 w-96 h-96 rounded-full opacity-30 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.09 15), transparent)",
            transform: "translate(-30%, -30%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-4 block reveal">
            Portfolio
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 reveal">
            The Art of <span className="shimmer-text">Every Story</span>
          </h1>
          <div className="divider-rose max-w-xs mx-auto mb-6 reveal">
            <span className="text-rose-deep text-lg">✦</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            Browse through a collection of handcrafted portraits, each one a
            unique journey through emotion, detail, and artistry.
          </p>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="py-12 lg:py-20 pb-32" aria-label="Gallery grid">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-14 reveal">
            {(
              [
                "all",
                Category.pencilSketch,
                Category.portraitArt,
                Category.customOrders,
              ] as FilterKey[]
            ).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "btn-luxury text-white shadow-rose"
                    : "border border-border text-muted-foreground hover:border-rose-mid hover:text-foreground bg-card"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
              <Loader2 size={20} className="animate-spin text-rose-deep" />
              <span className="text-sm">Loading artworks...</span>
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-sm mb-4">
                Showing portfolio from local collection.
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          {!isLoading &&
            (filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-2xl text-muted-foreground mb-3">
                  No works in this category yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back soon for new pieces!
                </p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                {filtered.map((item, i) => (
                  <article
                    key={String(item.id)}
                    className="gallery-card rounded-2xl shadow-luxury overflow-hidden break-inside-avoid reveal"
                    style={{ transitionDelay: `${(i % 6) * 80}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full object-cover block"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const idx = (i % 6) + 1;
                          target.src = `/assets/generated/portrait-sketch-${idx}.dim_600x750.jpg`;
                        }}
                      />
                      <div className="overlay rounded-2xl">
                        <div className="w-full">
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 text-white/80"
                            style={{
                              background: "oklch(0.52 0.16 15 / 0.7)",
                            }}
                          >
                            {CATEGORY_LABELS[item.category]}
                          </span>
                          <h3 className="font-display text-white text-lg font-semibold leading-tight">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-white/70 text-xs mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}

          {/* CTA */}
          <div className="text-center mt-20 reveal">
            <p className="font-display text-xl text-muted-foreground mb-6">
              Love what you see? Commission your own portrait.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full btn-luxury text-white hover:scale-105 hover:shadow-rose-lg transition-all group"
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
