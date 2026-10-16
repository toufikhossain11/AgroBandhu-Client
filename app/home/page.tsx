import Image from "next/image";
import Link from "next/link";
import { Bell, Check, ChevronRight, CloudRain, User } from "lucide-react";

// TODO: pore server/API theke ashbe
const user = {
  name: "মোঃ রশিদুল ইসলাম",
  avatar: null as string | null, // jemon: "/images/avatar.jpg"
  hasUnread: true,
};

const summary = { income: 45000, expense: 27500 };
const profit = summary.income - summary.expense;

const weather = {
  temp: 28,
  condition: "হালকা মেঘলা",
  rainChance: 80,
};

const tasks = [
  { id: 1, title: "সেচ দিতে হবে (সবজি খেত)" },
  { id: 2, title: "সার প্রয়োগ (ধান খেত)" },
];

// Bangla digit chai hole "en-US" er jaygay "bn-BD" dao
const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

export default function HomePage() {
  return (
<main className="mx-auto min-h-dvh max-w-md bg-white pb-24 shadow-sm">      {/* Header */}
      <header className="flex items-center justify-between bg-gradient-to-b from-brand-900 to-brand-700 px-4 pb-6 pt-8 text-white">
        <h1 className="min-w-0 truncate pr-3 text-xl font-bold">{user.name}</h1>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/notifications"
            aria-label="নোটিফিকেশন"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 active:bg-white/20"
          >
            <Bell size={22} aria-hidden />
            {user.hasUnread && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-brand-800" />
            )}
          </Link>

          <Link
            href="/profile"
            aria-label="প্রোফাইল"
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-brand-100 text-brand-700"
          >
            {user.avatar ? (
              <Image src={user.avatar} alt="" fill sizes="44px" className="object-cover" />
            ) : (
              <User size={22} aria-hidden />
            )}
          </Link>
        </div>
      </header>

      <div className="space-y-6 px-4 py-5">
        {/* Ei masher sarongsho */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">এই মাসের সারাংশ</h2>
          <div className="grid grid-cols-3 gap-3">
            <SummaryCard label="আয়" value={taka(summary.income)} tone="green" />
            <SummaryCard label="ব্যয়" value={taka(summary.expense)} tone="red" />
            <SummaryCard label="লাভ" value={taka(profit)} tone="green" />
          </div>
        </section>

        {/* Weather */}
        <section
          aria-label="আজকের আবহাওয়া"
          className="flex items-center justify-between rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-sky-100/70 p-4"
        >
          <div className="flex items-center gap-3">
            <CloudRain size={48} className="text-sky-500" strokeWidth={1.6} aria-hidden />
            <div>
              <p className="text-sm font-medium text-ink">আজকের আবহাওয়া</p>
              <p className="text-3xl font-bold leading-tight text-ink">{weather.temp}°C</p>
              <p className="text-sm text-muted">{weather.condition}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted">বৃষ্টি সম্ভাবনা</p>
            <p className="text-3xl font-bold text-sky-600">{weather.rainChance}%</p>
          </div>
        </section>

        {/* Ajker kaj */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink">আজকের কাজ</h2>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id}>
                <Link
                  href="/reminder"
                  className="flex items-center gap-3 rounded-xl border border-line bg-white p-3.5 shadow-sm active:bg-brand-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Check size={18} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-ink">{task.title}</span>
                  <ChevronRight size={20} className="text-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "red";
}) {
  const styles =
    tone === "green"
      ? "border-green-200 bg-green-50 text-income"
      : "border-red-200 bg-red-50 text-expense";

  return (
    <div className={`rounded-xl border px-2 py-3 text-center ${styles}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-1 text-[17px] font-bold">{value}</p>
    </div>
  );
}