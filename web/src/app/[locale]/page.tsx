import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { LocaleSwitcher } from "@/components/locale-switcher";

const FEATURE_ICONS = [
  <svg key="shield" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="search" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  <svg key="zap" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="git" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>,
  <svg key="moon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  <svg key="eye" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const stats = t.raw("stats.items") as { value: string; label: string }[];
  const steps = t.raw("howItWorks.steps") as { number: string; title: string; description: string }[];
  const features = t.raw("features.items") as { title: string; description: string }[];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">

      {/* ── Navbar ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="text-sm font-bold tracking-tight">ForgeFlow AI</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("nav.features")}</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("nav.howItWorks")}</a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("nav.docs")}</a>
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <a href="#" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-opacity hover:opacity-90 sm:block">
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-28 pt-24">

          {/* Background layers */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute left-1/4 top-40 -z-10 h-[300px] w-[300px] animate-float rounded-full bg-violet-500/8 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute right-1/4 top-60 -z-10 h-[250px] w-[250px] animate-float-delay rounded-full bg-blue-500/8 blur-3xl" />

          <div className="mx-auto max-w-5xl text-center">

            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-semibold text-primary">{t("hero.badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-foreground">{t("hero.headline1")}</span>
              <span className="gradient-text block">{t("hero.headline2")}</span>
              <span className="block text-foreground">{t("hero.headline3")}</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("hero.subheadline")}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30">
                {t("hero.cta")}
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <a href="#" className="flex items-center gap-2 rounded-xl border border-border bg-background px-8 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Terminal card */}
          <div className="mx-auto mt-20 max-w-3xl">
            <div className="relative rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/8">
              {/* Glow behind card */}
              <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
              {/* Titlebar */}
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="ml-4 text-xs font-medium text-muted-foreground/70 font-mono">forgeflow — bash</span>
              </div>
              {/* Code */}
              <div className="space-y-1 p-6 font-mono text-sm leading-7">
                <p><span className="text-primary">❯</span> <span className="text-foreground">ff send supervisor &quot;add dark mode toggle to navbar&quot;</span></p>
                <p className="text-muted-foreground"><span className="text-primary/60">▸</span> Classifying task...</p>
                <p className="text-muted-foreground"><span className="text-primary/60">▸</span> Surface: <span className="text-emerald-500 font-semibold">web</span></p>
                <p className="text-muted-foreground"><span className="text-primary/60">▸</span> Workers: <span className="text-blue-400">repo-inspector</span>, <span className="text-blue-400">frontend-web</span></p>
                <p className="text-muted-foreground"><span className="text-primary/60">▸</span> Inspecting <span className="text-foreground">src/components/navbar.tsx</span>...</p>
                <p className="text-muted-foreground"><span className="text-primary/60">▸</span> Pattern: <span className="text-foreground">next-themes ThemeProvider</span> ✓</p>
                <p className="text-muted-foreground"><span className="text-primary/60">▸</span> Writing toggle component...</p>
                <p><span className="text-emerald-500 font-bold">✓</span> <span className="text-emerald-500">DONE:frontend-web:navbar-dark-mode-01</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────── */}
        <section className="border-y border-border/60 bg-muted/30 px-6 py-16">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="gradient-text text-5xl font-extrabold tracking-tight">{s.value}</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────── */}
        <section id="how-it-works" className="px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t("howItWorks.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("howItWorks.subheading")}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={i} className="group relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div aria-hidden className="absolute left-full top-5 hidden h-px w-full -translate-y-px bg-gradient-to-r from-primary/30 to-transparent lg:block" />
                  )}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-base font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────── */}
        <section id="features" className="relative overflow-hidden px-6 py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-muted/30" />
          <div className="mx-auto max-w-6xl">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t("features.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("features.subheading")}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div key={i} className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    {FEATURE_ICONS[i]}
                  </div>
                  <h3 className="mb-3 text-base font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────── */}
        <section className="px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-20 text-center sm:px-20">
              {/* Decorative blobs inside */}
              <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <h2 className="relative text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
                {t("cta.heading")}
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-lg text-primary-foreground/75">
                {t("cta.subheading")}
              </p>
              <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#" className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-all hover:shadow-xl hover:opacity-95">
                  {t("cta.button")}
                </a>
                <a href="#" className="rounded-xl border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  {t("cta.buttonSecondary")}
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <span className="font-semibold text-foreground text-sm">ForgeFlow AI</span>
            </div>
            <span>{t("footer.tagline")}</span>
            <span>&copy; {new Date().getFullYear()} {t("footer.rights")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
