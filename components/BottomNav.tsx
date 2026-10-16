"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, LayoutGrid, Sprout, Wallet } from "lucide-react";

const items = [
  { href: "/home", label: "হোম", Icon: Home },
  { href: "/jomi", label: "জমি", Icon: Sprout },
  { href: "/hisab", label: "হিসাব", Icon: Wallet },
  { href: "/diary", label: "ডায়েরি", Icon: BookOpen },
  { href: "/more", label: "আরও", Icon: LayoutGrid },
];

export default function BottomNav() {
  const path = usePathname();

  return (
<nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map(({ href, label, Icon }) => {
          const active = path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-xs ${
                  active ? "font-semibold text-brand-600" : "text-muted"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.4 : 2} aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}