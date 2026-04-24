import Link from "next/link";

export default function CreateBirthdayPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 sm:px-6 pt-28 pb-16">
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/80">Coming Soon</p>
        <h1 className="text-3xl font-bold mt-3">Birthday Creator</h1>
        <p className="text-white/45 mt-3">
          This template will be added after White Coat Ceremony is finalized.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/create"
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            Back to Portal
          </Link>
          <Link
            href="/create/white-coat-ceremony"
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold transition-colors"
          >
            Open White Coat Creator
          </Link>
        </div>
      </div>
    </main>
  );
}

