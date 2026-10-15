"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Lock, Smartphone } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ager page e jabe, history na thakle splash e
  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    try {
      // TODO: tomar server er login endpoint onujayi milao
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier: identifier.trim(), password, remember }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "লগইন করা যায়নি");
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-dvh max-w-md bg-gradient-to-b from-white via-white to-[#e8f4ef] px-6 pb-10 pt-5">
      {/* Back button */}
      <button
        type="button"
        onClick={goBack}
        aria-label="পেছনে যান"
        className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-brand-900 active:bg-brand-50"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Logo */}
      <header className="flex flex-col items-center text-center">
        <Image
          src="/images/logo-emblem.png"
          alt="AgroBondhu logo"
          width={100}
          height={100}
          priority
          className="h-auto w-50"
        />
        
      </header>

      {/* Welcome */}
      <section className="mt-7">
        <h2 className="text-2xl font-bold text-brand-900">স্বাগতম!</h2>
        <p className="mt-1 text-[15px] text-muted">আপনার অ্যাকাউন্ট লগইন করুন</p>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5" noValidate>
        <label className="flex h-13 items-center gap-3 rounded-xl border border-line bg-white/80 px-4 py-3 shadow-sm focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20">
          <Smartphone size={22} className="shrink-0 text-brand-700" aria-hidden />
          <input
            type="text"
            inputMode="email"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="মোবাইল নম্বর / ইমেইল"
            aria-label="মোবাইল নম্বর বা ইমেইল"
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </label>

        <label className="mt-4 flex h-13 items-center gap-3 rounded-xl border border-line bg-white/80 px-4 py-3 shadow-sm focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20">
          <Lock size={22} className="shrink-0 text-brand-700" aria-hidden />
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
            aria-label="পাসওয়ার্ড"
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
        </label>

        {/* Remember + forgot */}
        <div className="mt-4 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[15px] text-ink">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="peer sr-only"
            />
            <span className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-brand-600 bg-white text-white peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600/40">
              {remember && <Check size={16} strokeWidth={3} aria-hidden />}
            </span>
            আমাকে মনে রাখুন
          </label>

          <Link href="/forgot-password" className="text-[15px] font-semibold text-brand-600">
            ভুলে গেছেন?
          </Link>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-expense">
            {error}
          </p>
        )}

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 h-13 w-full rounded-xl bg-gradient-to-b from-brand-600 to-brand-700 py-3.5 text-lg font-semibold text-white shadow-[0_6px_16px_rgba(20,102,58,0.3)] transition active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "লগইন"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* Social login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => {
            // TODO: Google login
          }}
          className="flex h-13 items-center justify-center gap-2 rounded-xl border border-line bg-white py-3 text-[15px] font-medium text-ink shadow-sm active:bg-brand-50"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={() => {
            // TODO: Facebook login
          }}
          className="flex h-13 items-center justify-center gap-2 rounded-xl border border-line bg-white py-3 text-[15px] font-medium text-ink shadow-sm active:bg-brand-50"
        >
          <FacebookIcon />
          Facebook
        </button>
      </div>

      {/* Register link */}
      <p className="mt-10 text-center text-[15px] text-ink">
        নতুন অ্যাকাউন্ট?{" "}
        <Link href="/register" className="font-semibold text-brand-600">
          রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.4 19.5v-6.2h2.1l.4-2.5h-2.5V9.3c0-.7.3-1.3 1.4-1.3H16V5.8c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.7H8.7v2.5h2.1v6.2h2.6z"
      />
    </svg>
  );
}