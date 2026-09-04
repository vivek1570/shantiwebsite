"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const { signIn, isAdmin, loading, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAdmin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!email.trim() || !password.trim()) {
      setLocalError("Please enter both email and password");
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.push("/admin/dashboard");
    } catch {
      setLocalError("Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-bg">
        <div className="animate-pulse text-primary text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E3A42] via-primary-dark to-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-white/60 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back to Website
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 lg:p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl mb-4">
              🔐
            </div>
            <h1 className="font-heading text-2xl font-bold text-white mb-1">
              Admin Login
            </h1>
            <p className="text-white/60 text-sm">
              P. Balakrishnan Master Memorial Special School
            </p>
          </div>

          {/* Error message */}
          {(localError || error) && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-red-100 text-sm">
              {localError || error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-white/80 text-sm font-medium mb-1.5">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-accent focus:bg-white/15 transition-all text-sm"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-white/80 text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-accent focus:bg-white/15 transition-all text-sm"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${
                submitting
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-accent text-[#0E3A42] hover:bg-accent-light hover:shadow-lg shadow-md"
              }`}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-white/40 text-xs">
            Only authorized administrators can access this area.
          </p>
        </div>
      </div>
    </section>
  );
}
