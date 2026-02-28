import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { SiInstagram } from "react-icons/si";
import { useSubmitContact } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitContact = useSubmitContact();
  const sectionRef = useReveal();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      await submitContact.mutateAsync({ name, email, message });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    }
  };

  return (
    <main ref={sectionRef as React.RefObject<HTMLElement>} className="pt-20">
      {/* ── Page Hero ── */}
      <section
        className="py-24 lg:py-28 relative overflow-hidden"
        aria-label="Contact hero"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.035 15) 0%, oklch(0.98 0.012 30) 60%, oklch(0.96 0.02 10) 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 w-80 h-80 rounded-full opacity-30 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.09 15), transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-64 h-64 rounded-full opacity-20 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.1 20), transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-4 block reveal">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 reveal">
            Let's Create Something{" "}
            <span className="shimmer-text">Beautiful Together</span>
          </h1>
          <div className="divider-rose max-w-xs mx-auto mb-6 reveal">
            <span className="text-rose-deep text-lg">✦</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            Have a portrait in mind? I'd love to hear about it. Reach out and
            let's bring your vision to life.
          </p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="py-16 pb-32" aria-label="Contact form and info">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-3 reveal">
              <div
                className="p-8 md:p-10 rounded-3xl border border-border shadow-luxury"
                style={{ background: "oklch(0.99 0.004 8)" }}
              >
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                      }}
                    >
                      <CheckCircle size={28} className="text-rose-deep" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                      Thank you for reaching out! I'll get back to you within
                      24–48 hours with all the details about your custom
                      portrait.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm text-rose-deep hover:text-foreground transition-colors underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-luxury h-11 rounded-xl"
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-luxury h-11 rounded-xl"
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about the portrait you'd like — who is it of, what occasion, any special details or reference photos..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="input-luxury rounded-xl resize-none"
                      />
                    </div>

                    {submitContact.isError && (
                      <p className="text-sm text-destructive" role="alert">
                        Something went wrong. Please try again or email me
                        directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={
                        submitContact.isPending || !name || !email || !message
                      }
                      className="w-full h-12 rounded-xl text-sm font-semibold btn-luxury text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-rose disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {submitContact.isPending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 reveal">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  Reach Out Directly
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Whether you have a clear vision or just an idea, I'm here to
                  guide you through every step of creating your perfect
                  portrait.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                <a
                  href="mailto:vijjuart245@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-rose-mid hover:shadow-luxury transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                    }}
                  >
                    <Mail size={18} className="text-rose-deep" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      Email
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-rose-deep transition-colors">
                      vijjuart245@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/vijjuart245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-rose-mid hover:shadow-luxury transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                    }}
                  >
                    <SiInstagram size={17} className="text-rose-deep" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      Instagram
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-rose-deep transition-colors">
                      @vijjuart245
                    </p>
                  </div>
                </a>
              </div>

              {/* Info card */}
              <div
                className="rounded-2xl p-6 space-y-3"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.93 0.05 15), oklch(0.96 0.03 20))",
                }}
              >
                <h3 className="font-display text-base font-semibold text-foreground">
                  What to Include
                </h3>
                <ul className="space-y-2">
                  {[
                    "A clear reference photo",
                    "Subject and occasion details",
                    "Preferred size and style",
                    "Any special requirements",
                    "Expected delivery date",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-rose-deep mt-0.5 flex-shrink-0">
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response time */}
              <div className="text-center py-4 px-6 rounded-2xl border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Response Time
                </p>
                <p className="font-display text-lg font-semibold text-rose-deep">
                  Within 24–48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
