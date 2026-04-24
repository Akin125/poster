import Link from "next/link";

interface BirthdayLoginPageProps {
  searchParams?: Promise<{
    next?: string;
    error?: string;
  }>;
}

function normalizeNextPath(nextPath: string | undefined): string {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/create/birthday";
  }
  return nextPath;
}

export default async function BirthdayLoginPage({ searchParams }: BirthdayLoginPageProps) {
  const params = await searchParams;
  const nextPath = normalizeNextPath(params?.next);
  const hasError = params?.error === "1";

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 sm:px-6 pt-28 pb-16 flex items-start justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 shadow-2xl shadow-black/30">
        <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300/70">Restricted Access</p>
        <h1 className="text-2xl font-bold tracking-tight mt-2">Birthday Creator Login</h1>
        <p className="text-sm text-white/45 mt-2">Enter the credentials configured in your environment.</p>

        {hasError && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            Invalid username or password.
          </p>
        )}

        <form action="/api/birthday-login" method="post" className="mt-5 space-y-3">
          <input type="hidden" name="next" value={nextPath} />
          <div>
            <label htmlFor="username" className="text-xs text-white/60">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-purple-400/45 focus:bg-white/8 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs text-white/60">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-purple-400/45 focus:bg-white/8 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-sm font-semibold px-4 py-2.5 transition-colors shadow-lg shadow-purple-500/20"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-xs text-white/45">
          <Link href="/create" className="text-purple-300 hover:text-purple-200">Back to creators</Link>
        </div>
      </div>
    </main>
  );
}

