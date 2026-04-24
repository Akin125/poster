import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const creators = [
    {
      title: "IWD",
      desc: "International Women's Day creator with the current poster layout.",
      href: "/create/iwd",
      status: "Ready",
      accent: "from-fuchsia-500/20 to-purple-500/20",
    },
    {
      title: "White Coat Ceremony",
      desc: "A dedicated ceremony poster flow for medical and academic celebrations.",
      href: "/create/white-coat-ceremony",
      status: "Ready",
      accent: "from-emerald-500/20 to-cyan-500/20",
    },
    {
      title: "Birthday",
      desc: "The next template in the pipeline, ready to add later.",
      href: "/create/birthday",
      status: "Coming Soon",
      accent: "from-amber-500/20 to-orange-500/20",
    },
  ];

  const highlights = [
    {
      value: "3000×3500",
      label: "Print-ready export",
    },
    {
      value: "100%",
      label: "Client-side workflow",
    },
    {
      value: "3",
      label: "Portal templates",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <section className="relative px-4 sm:px-6 pt-28 pb-20 sm:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-purple-600/15 blur-[140px]" />
          <div className="absolute top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-[-6rem] w-[26rem] h-[26rem] rounded-full bg-cyan-500/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-200 text-xs tracking-wide">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Social Committee Poster Portal
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                One portal for every event poster you need.
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/45 leading-relaxed">
                Quickly launch the right creator for International Women&apos;s Day,
                White Coat Ceremony, or the Birthday template coming next.
                Everything stays local in your browser and exports at print-ready quality.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all"
                >
                  Open Portal
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/create/white-coat-ceremony"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white/80 border border-white/12 bg-white/3 hover:bg-white/6 hover:border-purple-500/30 transition-all"
                >
                  Jump to White Coat
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{item.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/35">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/15 to-cyan-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5 shadow-2xl shadow-black/30">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-zinc-900/80 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-purple-300/70">Featured creators</p>
                      <h2 className="mt-2 text-2xl font-semibold">Choose your poster flow</h2>
                    </div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
                      <Image
                        src="/logo-white.png"
                        alt="Social Committee Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {creators.map((creator) => (
                      <Link
                        key={creator.title}
                        href={creator.href}
                        className={`group block rounded-2xl border border-white/8 bg-gradient-to-r ${creator.accent} p-4 hover:border-purple-400/30 hover:bg-white/[0.06] transition-all`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold">{creator.title}</h3>
                              <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/60">
                                {creator.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-white/45 leading-relaxed">{creator.desc}</p>
                          </div>
                          <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 flex-col sm:flex-row mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300/70">Why it helps</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">Built to move fast for committee work</h2>
            </div>
            <Link href="/contact" className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
              Need a new template? Contact us →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Fast event selection",
                desc: "Go straight to the right creator instead of starting from scratch every time.",
              },
              {
                title: "Print-ready exports",
                desc: "Designed for high-resolution output so the final poster is ready to share or print.",
              },
              {
                title: "Local and private",
                desc: "Images stay in the browser, giving you a lightweight workflow with no upload step.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center text-purple-300">
                  ✦
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
