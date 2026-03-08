import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px] animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-800/10 blur-[150px]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating particles */}
          <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-purple-400/60 animate-ping [animation-duration:3s]" />
          <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-purple-300/40 animate-ping [animation-duration:4s] [animation-delay:1s]" />
          <div className="absolute top-[40%] left-[70%] w-1 h-1 rounded-full bg-purple-500/50 animate-ping [animation-duration:5s] [animation-delay:2s]" />
          <div className="absolute bottom-[30%] left-[30%] w-1 h-1 rounded-full bg-purple-400/40 animate-ping [animation-duration:3.5s] [animation-delay:0.5s]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-medium text-purple-300 tracking-wide">
              March 8, 2026 — International Women&apos;s Day
            </span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <Image
                src="/logo-white.png"
                alt="IWD 2026 Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                priority
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
            <span className="block text-white">Celebrate</span>
            <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent mt-2">
              Women Who Lead
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/40 leading-relaxed mb-10">
            Create stunning custom posters for International Women&apos;s Day.
            Upload your photos, design your collage, and share the celebration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="group relative px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create Your Poster
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl text-base font-medium text-white/60 border border-white/10 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
            {[
              { value: "3000×3500", label: "High-Res Output" },
              { value: "4", label: "Image Slots" },
              { value: "∞", label: "Possibilities" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-white/30 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery / Features ── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6">
        {/* Section glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Empowering Through{" "}
              <span className="text-purple-400">Design</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Our poster generator lets you create professional collage posters
              that honour and celebrate the incredible women in your life.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 bg-zinc-900">
              <Image
                src="/IWD1B.png"
                alt="IWD Celebration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
                  IWD 2026
                </span>
                <p className="text-white font-semibold mt-1">
                  Celebrate. Create. Inspire.
                </p>
              </div>
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-3xl border border-purple-500/0 group-hover:border-purple-500/20 transition-all duration-500" />
            </div>

            <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 bg-zinc-900">
              <Image
                src="/IWD2B.png"
                alt="IWD Poster Example"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
                  Poster Studio
                </span>
                <p className="text-white font-semibold mt-1">
                  Your story, beautifully framed.
                </p>
              </div>
              <div className="absolute inset-0 rounded-3xl border border-purple-500/0 group-hover:border-purple-500/20 transition-all duration-500" />
            </div>
          </div>

          {/* Features */}
          {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">*/}
          {/*  {[*/}
          {/*    {*/}
          {/*      icon: "📸",*/}
          {/*      title: "Upload & Crop",*/}
          {/*      desc: "Upload 4 images with precise in-app cropping tools for perfect framing.",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      icon: "🎨",*/}
          {/*      title: "Auto Styling",*/}
          {/*      desc: "Floating images auto-convert to grayscale. Toggle B&W on any image.",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      icon: "✨",*/}
          {/*      title: "Overlay Design",*/}
          {/*      desc: "Beautiful IWD-themed overlay frame automatically applied to your poster.",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      icon: "🖼",*/}
          {/*      title: "Custom Backgrounds",*/}
          {/*      desc: "Choose black, white, or upload your own custom background image.",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      icon: "👁",*/}
          {/*      title: "Live Preview",*/}
          {/*      desc: "See real-time poster preview as you upload, crop, and customize.",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      icon: "⬇",*/}
          {/*      title: "High-Res Export",*/}
          {/*      desc: "Download print-ready 3000×3500px PNG posters instantly.",*/}
          {/*    },*/}
          {/*  ].map((f) => (*/}
          {/*    <div*/}
          {/*      key={f.title}*/}
          {/*      className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-purple-500/5 hover:border-purple-500/15 transition-all duration-500"*/}
          {/*    >*/}
          {/*      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">*/}
          {/*        {f.icon}*/}
          {/*      </div>*/}
          {/*      <h3 className="text-sm font-semibold text-white mb-1.5">*/}
          {/*        {f.title}*/}
          {/*      </h3>*/}
          {/*      <p className="text-xs text-white/35 leading-relaxed">*/}
          {/*        {f.desc}*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="relative rounded-3xl border border-purple-500/15 bg-gradient-to-br from-purple-500/5 via-zinc-950 to-purple-600/5 p-10 sm:p-16 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/20 blur-[80px]" />

            <h2 className="relative text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Create?
            </h2>
            <p className="relative text-white/40 max-w-md mx-auto mb-8">
              Design your own IWD 2026 poster in minutes. No sign-up required —
              everything runs in your browser.
            </p>
            <Link
              href="/create"
              className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105"
            >
              Start Designing
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
