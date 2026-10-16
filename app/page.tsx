import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SplashPage() {
  return (
    <main className="relative mx-auto flex h-dvh max-w-md flex-col overflow-hidden bg-brand-900 text-white">
      {/* Background photo */}
      <Image
        src="/images/splash-bg.png"
        alt=""
        fill
        priority
        sizes="(max-width: 448px) 100vw, 448px"
        className="object-cover object-[68%_center]"
      />

      {/* Upore halka, niche gaero gradient, jate lekha porishkar pora jay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent via-45% to-black/80"
      />

      {/* Logo + naam */}
      <header className="relative z-10 flex flex-col items-center pt-[6vh] text-center">
        <Image
          src="/images/logo-emblem.png"
          alt="AgroBondhu logo"
          width={200}
          height={200}
          priority
          className="h-auto w-65 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
        />
        {/* <h1 className="mt-3 text-[40px] font-bold leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          AgroBondhu
        </h1> */}
        {/* <p className="mt-1 text-lg font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          স্মার্ট কৃষি, সমৃদ্ধ ভবিষ্যৎ
        </p> */}
      </header>

      {/* Niche: slogan + button */}
      <section className="relative z-10 mt-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <p className="text-center text-[15px] leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          আপনার জমি, আপনার হিসাব, আপনার ফসল
          <br />
          সব এক অ্যাপে
        </p>

        <Link
          href="/register"
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-700 text-lg font-semibold shadow-[0_8px_20px_rgba(20,102,58,0.45)] ring-1 ring-white/20 transition active:scale-[0.98]"
        >
          শুরু করুন
          <ArrowRight size={20} aria-hidden />
        </Link>
      </section>
    </main>
  );
}