"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck, Smartphone } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// Bangla digit (০১২৩...) ke English digit e convert kore
function toEnglishDigits(value: string) {
  return value.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
}

// 017XXXXXXXX, +88017XXXXXXXX, 88017XXXXXXXX shob format e kaj korbe
function normalizePhone(value: string) {
  const digits = toEnglishDigits(value).replace(/[\s\-()]/g, "");
  return digits.replace(/^\+?88/, "");
}

const BD_PHONE = /^01[3-9]\d{8}$/;

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push("/login");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const cleanPhone = normalizePhone(phone);

    if (!BD_PHONE.test(cleanPhone)) {
      setError("সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)");
      return;
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      setError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    try {
      // TODO: tomar server er register endpoint onujayi milao
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone: cleanPhone, password }),
      });
      const data = await res.json().catch(() => ({}));

      // Age theke account thakle login page e pathao
      if (res.status === 409) {
        router.push(`/login?phone=${encodeURIComponent(cleanPhone)}&exists=1`);
        return;
      }
      if (!res.ok) throw new Error(data.message || "রেজিস্ট্রেশন করা যায়নি");

      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "flex h-[52px] items-center gap-3 rounded-xl border border-line bg-white/80 px-4 shadow-sm focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20";
  const inputClass =
    "w-full bg-transparent text-base text-ink outline-none placeholder:text-muted";

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

      {/* Logo (shobar upore) */}
      <header className="flex flex-col items-center text-center">
        <Image
          src="/images/logo-emblem.png"
          alt="AgroBondhu logo"
          width={200}
          height={200}
          priority
          className="h-auto w-50"
        />
      </header>

      {/* Title */}
      <section className="mt-7">
        <h2 className="text-2xl font-bold text-brand-900">নতুন অ্যাকাউন্ট</h2>
        <p className="mt-1 text-[15px] text-muted">
          মোবাইল নম্বর দিয়ে রেজিস্ট্রেশন করুন
        </p>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <label className={fieldClass}>
          <Smartphone size={22} className="shrink-0 text-brand-700" aria-hidden />
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="মোবাইল নম্বর"
            aria-label="মোবাইল নম্বর"
            className={inputClass}
          />
        </label>

        <div className={fieldClass}>
          <Lock size={22} className="shrink-0 text-brand-700" aria-hidden />
          <input
            type={showPass ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
            aria-label="পাসওয়ার্ড"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            className="text-muted"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className={fieldClass}>
          <ShieldCheck size={22} className="shrink-0 text-brand-700" aria-hidden />
          <input
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="পাসওয়ার্ড নিশ্চিত করুন"
            aria-label="পাসওয়ার্ড নিশ্চিত করুন"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            className="text-muted"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-expense">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-[52px] w-full rounded-xl bg-gradient-to-b from-brand-600 to-brand-700 text-lg font-semibold text-white shadow-[0_6px_16px_rgba(20,102,58,0.3)] transition active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "রেজিস্ট্রেশন"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => {
          // TODO: Google login
        }}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-line bg-white text-[15px] font-medium text-ink shadow-sm active:bg-brand-50"
      >
        <GoogleIcon />
        Google দিয়ে চালিয়ে যান
      </button>

      {/* Login link */}
      <p className="mt-10 text-center text-[15px] text-ink">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/login" className="font-semibold text-brand-600">
          লগইন করুন
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