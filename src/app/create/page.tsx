import Link from "next/link";

export default function CreatePage() {
  const options = [
    {
      href: "/create/iwd",
      title: "IWD",
      subtitle: "International Women's Day",
      status: "Ready",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
    {
      href: "/create/white-coat-ceremony",
      title: "White Coat Ceremony",
      subtitle: "Ceremony poster creator",
      status: "Ready",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
    {
      href: "/create/birthday",
      title: "Birthday",
      subtitle: "Campaign template (login required)",
      status: "Protected",
      badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 sm:px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300/70">Social Committee Portal</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">Select a Poster Creator</h1>
        <p className="text-white/45 mt-3 max-w-2xl">
          Each event runs independently with its own template layout and export naming.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {options.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-purple-500/30 hover:bg-purple-500/[0.04] transition-all duration-300"
            >
              <span className={`inline-flex text-[10px] px-2.5 py-1 rounded-full border ${option.badgeClass}`}>
                {option.status}
              </span>
              <h2 className="text-xl font-semibold mt-4">{option.title}</h2>
              <p className="text-sm text-white/45 mt-1">{option.subtitle}</p>
              <p className="text-xs text-purple-300/80 mt-6">Open creator →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

