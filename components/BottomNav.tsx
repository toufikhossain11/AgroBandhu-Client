"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sprout, Wallet, Bell, Menu } from "lucide-react";

const items = [
  { href: "/home", label: "হোম", Icon: Home },
  { href: "/jomi", label: "জমি", Icon: Sprout },
  { href: "/hisab", label: "হিসাব", Icon: Wallet },
  { href: "/reminder", label: "রিমাইন্ডার", Icon: Bell },
  { href: "/more", label: "আরও", Icon: Menu },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 bg-surface border-t border-line">
      <ul className="mx-auto max-w-md grid grid-cols-5">
        {items.map(({ href, label, Icon }) => {
          const active = path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 text-xs ${
                  active ? "text-brand-600 font-semibold" : "text-muted"
                }`}
              >
                <Icon size={22} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
