import PosterBuilder from "@/components/PosterBuilder";
import { BIRTHDAY_PRESET } from "@/lib/poster-presets";
import { isBirthdayAuthenticated } from "@/lib/birthday-auth";
import { redirect } from "next/navigation";

export default async function CreateBirthdayPage() {
  const authenticated = await isBirthdayAuthenticated();
  if (!authenticated) {
    redirect("/birthday-login?next=%2Fcreate%2Fbirthday");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="h-20" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <div className="mb-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/2 px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300/70">Protected Access</p>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Birthday Poster Creator</h1>
          </div>
          <form action="/api/birthday-logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        <PosterBuilder preset={BIRTHDAY_PRESET} />
      </main>
    </div>
  );
}

