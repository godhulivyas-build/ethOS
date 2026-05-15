"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-dim px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-display-lg font-semibold tracking-tight text-on-surface">
              ETHOS
            </span>
          </Link>
          <p className="text-on-surface-variant mt-2 font-body-md text-sm">
            {isLogin ? 'Initialize your identity kernel.' : 'Create your identity profile.'}
          </p>
        </div>

        <div className="glass-panel inner-glow p-8 rounded-2xl border border-outline-variant/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-label-mono text-outline uppercase">Display Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-body-md"
                  placeholder="Jane Doe"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-label-mono text-outline uppercase">Identity String (Email)</label>
              <input
                type="email"
                required
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-body-md"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-label-mono text-outline uppercase">Access Key</label>
              <input
                type="password"
                required
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-body-md"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-label-mono px-4 py-3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center mt-4 tracking-wider text-[11px] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-sm mr-2 animate-spin">refresh</span>
                  AUTHENTICATING...
                </>
              ) : (
                isLogin ? 'INITIALIZE LOGIN' : 'CREATE PROFILE'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs font-body-md text-on-surface-variant">
              {isLogin ? "No identity kernel?" : "Already initialized?"}{' '}
              <button onClick={() => setIsLogin(!isLogin)} type="button" className="text-primary hover:underline font-medium">
                {isLogin ? 'Initialize here' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
