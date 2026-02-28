import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Inbox,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useClaimOwner,
  useGetContactSubmissions,
  useGetOwner,
} from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

function formatIndianDateTime(timestampNs: bigint): string {
  const ms = Number(timestampNs / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function SubmissionSkeleton() {
  return (
    <div className="p-6 rounded-3xl border border-border shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <Skeleton className="h-3 w-28 flex-shrink-0" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const sectionRef = useReveal();
  return (
    <main className="pt-20 min-h-screen">
      <section
        className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-24 relative overflow-hidden"
        aria-label="Admin login"
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
          className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-25 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.09 15), transparent)",
            transform: "translate(40%, -40%)",
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-72 h-72 rounded-full opacity-15 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.1 20), transparent)",
            transform: "translate(-40%, 40%)",
          }}
        />

        {/* Login Card */}
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className="relative z-10 w-full max-w-sm mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="p-10 rounded-3xl border border-border shadow-luxury text-center space-y-6"
            style={{ background: "oklch(0.99 0.004 8)" }}
          >
            {/* Lock icon */}
            <div className="flex justify-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                }}
              >
                <Lock size={26} className="text-rose-deep" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Orders Inbox
              </h1>
              <div className="divider-rose max-w-[8rem] mx-auto">
                <span className="text-rose-deep text-sm">✦</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Please login to view all contact & order submissions from your
                clients.
              </p>
            </div>

            {/* Login button */}
            <button
              type="button"
              onClick={onLogin}
              className="w-full h-12 rounded-xl text-sm font-semibold btn-luxury text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-rose flex items-center justify-center gap-2"
            >
              <Lock size={15} />
              Login to View Orders
            </button>

            <p className="text-xs text-muted-foreground/70">
              Secured with Internet Identity
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export function Orders() {
  const { identity, login, clear } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: ownerPrincipal, isLoading: ownerLoading } = useGetOwner();
  const claimOwnerMutation = useClaimOwner();

  const myPrincipal = identity?.getPrincipal().toString();
  const noOwnerYet = ownerPrincipal === "No owner set yet.";
  const isOwner =
    !!ownerPrincipal &&
    ownerPrincipal !== "No owner set yet." &&
    myPrincipal === ownerPrincipal;
  const isAccessDenied = !ownerLoading && !noOwnerYet && !isOwner && !!identity;

  const {
    data: submissions,
    isLoading,
    refetch,
    isRefetching,
  } = useGetContactSubmissions();
  const sectionRef = useReveal();

  if (!isLoggedIn) {
    return <LoginScreen onLogin={login} />;
  }

  // Loading owner check
  if (ownerLoading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw
            size={24}
            className="animate-spin text-rose-deep mx-auto"
          />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </main>
    );
  }

  // No owner set yet - show Claim Ownership screen
  if (noOwnerYet) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-10 rounded-3xl border border-border shadow-luxury text-center space-y-6 max-w-sm w-full"
          style={{ background: "oklch(0.99 0.004 8)" }}
        >
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
              }}
            >
              <Lock size={26} className="text-rose-deep" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-foreground">
              First Time Setup
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No owner is set yet. Click below to claim ownership of this Orders
              Inbox. Only you will be able to do this — it can only be done
              once.
            </p>
          </div>
          <button
            type="button"
            onClick={() => claimOwnerMutation.mutate()}
            disabled={claimOwnerMutation.isPending}
            className="w-full h-12 rounded-xl text-sm font-semibold btn-luxury text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {claimOwnerMutation.isPending ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Lock size={15} />
            )}
            Claim Ownership
          </button>
          {claimOwnerMutation.isError && (
            <p className="text-xs text-red-500">
              Error: {(claimOwnerMutation.error as Error).message}
            </p>
          )}
        </motion.div>
      </main>
    );
  }

  // Access denied
  if (isAccessDenied) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-10 rounded-3xl border border-border shadow-luxury text-center space-y-6 max-w-sm w-full"
          style={{ background: "oklch(0.99 0.004 8)" }}
        >
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.93 0.05 15), oklch(0.88 0.07 20))",
              }}
            >
              <Lock size={26} className="text-rose-deep opacity-60" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Access Denied
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You are not authorized to view this page. Only the website owner
              can access the Orders Inbox.
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="w-full h-12 rounded-xl text-sm font-semibold border border-border text-foreground/70 hover:text-rose-deep hover:border-rose-mid transition-all duration-300"
          >
            Logout
          </button>
        </motion.div>
      </main>
    );
  }

  const principalShort = `${identity?.getPrincipal().toString().slice(0, 12)}...`;

  return (
    <main className="pt-20 min-h-screen">
      {/* ── Page Hero ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        aria-label="Orders inbox hero"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.035 15) 0%, oklch(0.98 0.012 30) 60%, oklch(0.96 0.02 10) 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 w-80 h-80 rounded-full opacity-25 z-0"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.09 15), transparent)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-rose-deep font-semibold mb-3 block reveal">
                Admin Dashboard
              </span>
              <div className="flex items-center gap-3 reveal">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Orders Inbox
                </h1>
                {!isLoading && submissions && (
                  <Badge
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                      color: "oklch(var(--rose-deep))",
                      border: "none",
                    }}
                  >
                    {submissions.length}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2 reveal">
                All contact and order requests from your clients
              </p>
            </div>

            {/* Right side: user info + logout */}
            <div className="flex items-center gap-3 reveal">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs text-muted-foreground">
                  Logged in as
                </span>
                <span
                  className="text-xs font-mono text-foreground/60"
                  title={identity?.getPrincipal().toString()}
                >
                  {principalShort}
                </span>
              </div>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isRefetching}
                className="p-2 rounded-xl border border-border hover:border-rose-mid hover:bg-rose-light transition-all duration-200 text-muted-foreground hover:text-rose-deep"
                title="Refresh"
              >
                <RefreshCw
                  size={15}
                  className={isRefetching ? "animate-spin" : ""}
                />
              </button>
              <button
                type="button"
                onClick={clear}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl border border-border hover:border-rose-mid hover:bg-rose-light text-muted-foreground hover:text-rose-deep transition-all duration-200"
              >
                <LogOut size={13} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Submissions List ── */}
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="py-10 pb-32"
        aria-label="Submissions"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          {/* Loading skeletons */}
          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
                <SubmissionSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && submissions && submissions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 space-y-4"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.93 0.05 15), oklch(0.88 0.07 20))",
                }}
              >
                <Inbox size={32} className="text-rose-deep opacity-70" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                No orders yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                When clients send you messages through the contact form, they'll
                appear here.
              </p>
            </motion.div>
          )}

          {/* Submissions */}
          {!isLoading && submissions && submissions.length > 0 && (
            <AnimatePresence>
              <div className="space-y-4">
                {submissions
                  .slice()
                  .sort((a, b) =>
                    Number(b.timestamp - a.timestamp) > 0 ? 1 : -1,
                  )
                  .map((submission, index) => (
                    <motion.article
                      key={`${submission.email}-${String(submission.timestamp)}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.07,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="group p-6 rounded-3xl border border-border shadow-luxury hover:border-rose-mid hover:shadow-rose transition-all duration-300"
                      style={{ background: "oklch(0.99 0.004 8)" }}
                    >
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{
                              background:
                                "linear-gradient(135deg, oklch(0.88 0.08 15), oklch(0.78 0.12 20))",
                            }}
                          >
                            <User size={17} className="text-rose-deep" />
                          </div>
                          {/* Name + email */}
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {submission.name}
                            </p>
                            <a
                              href={`mailto:${submission.email}`}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-deep transition-colors duration-200"
                            >
                              <Mail size={11} />
                              {submission.email}
                            </a>
                          </div>
                        </div>
                        {/* Timestamp */}
                        <time className="text-xs text-muted-foreground/70 flex-shrink-0 tabular-nums">
                          {formatIndianDateTime(submission.timestamp)}
                        </time>
                      </div>

                      {/* Divider */}
                      <div
                        className="h-px w-full mb-4"
                        style={{
                          background:
                            "linear-gradient(to right, oklch(var(--rose-light)), oklch(var(--border)), oklch(var(--rose-light)))",
                        }}
                      />

                      {/* Message */}
                      <div className="flex gap-2.5">
                        <MessageSquare
                          size={14}
                          className="text-rose-deep flex-shrink-0 mt-0.5 opacity-70"
                        />
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {submission.message}
                        </p>
                      </div>

                      {/* Quick reply link */}
                      <div className="mt-4 flex justify-end">
                        <a
                          href={`mailto:${submission.email}?subject=Re: Your Custom Sketch Enquiry`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-deep hover:text-foreground transition-colors duration-200 underline underline-offset-4"
                        >
                          <Mail size={12} />
                          Reply via Email
                        </a>
                      </div>
                    </motion.article>
                  ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </main>
  );
}
