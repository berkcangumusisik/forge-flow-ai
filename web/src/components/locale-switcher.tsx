"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

const FLAGS: Record<string, string> = {
  en: "🇬🇧",
  tr: "🇹🇷",
};

const LABELS: Record<string, string> = {
  en: "EN",
  tr: "TR",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const fullPathname = usePathname(); // e.g. "/en" or "/en/about"

  const next = locale === "en" ? "tr" : "en";

  // Strip current locale prefix and prepend the next one
  const pathWithoutLocale = fullPathname.replace(/^\/(en|tr)/, "") || "/";
  const href = `/${next}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground"
    >
      <span className="text-base leading-none">{FLAGS[locale]}</span>
      <span>{LABELS[locale]}</span>
    </Link>
  );
}
