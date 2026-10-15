const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "কিছু একটা সমস্যা হয়েছে");
  }
  return res.json();
}
