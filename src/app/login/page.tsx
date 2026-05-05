"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid admin credentials");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-ivory pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-12 bg-white p-10 shadow-2xl border border-gray-100">
        
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-charcoal tracking-widest uppercase mb-4">Welcome Back</h1>
          <p className="text-xs text-slate font-medium uppercase tracking-[0.2em]">Select your login method</p>
        </div>

        {/* Google Auth for Users */}
        <div>
          <button 
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-charcoal hover:bg-gray-50 transition-all group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
            <span className="px-4 bg-white text-slate">Or Admin Access</span>
          </div>
        </div>

        {/* Admin Login */}
        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate mb-2">Admin ID</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-ivory border-b border-gray-200 py-3 px-4 focus:outline-none focus:border-gold transition-all text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ivory border-b border-gray-200 py-3 px-4 focus:outline-none focus:border-gold transition-all text-sm"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-[60px] bg-charcoal text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-gold transition-all duration-500 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Admin Sign In"}
          </button>
        </form>

      </div>
    </main>
  );
}
