import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[128px]" />
        <div className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-medium text-purple-300 tracking-wide">
              Let&apos;s Connect
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Get In </span>
            <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-white/40 max-w-md mx-auto">
            Have a question, want to collaborate, or just want to say hi?
            Reach out through any of my socials below.
          </p>
        </div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/Akin125"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-purple-500/10 flex items-center justify-center transition-colors duration-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/60 group-hover:text-purple-400 transition-colors duration-500"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                GitHub
              </h3>
              <p className="text-xs text-white/30 truncate">@Akin125</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/15 group-hover:text-purple-400/60 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/2347016896419"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 flex items-center justify-center transition-colors duration-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/60 group-hover:text-emerald-400 transition-colors duration-500"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                WhatsApp
              </h3>
              <p className="text-xs text-white/30 truncate">+234-701-689-6419</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/15 group-hover:text-emerald-400/60 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/SeyiFusion"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-sky-500/5 hover:border-sky-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-sky-500/10 flex items-center justify-center transition-colors duration-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/60 group-hover:text-sky-400 transition-colors duration-500"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                X (Twitter)
              </h3>
              <p className="text-xs text-white/30 truncate">@SeyiFusion</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/15 group-hover:text-sky-400/60 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/philip-odediran-777914246/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-blue-500/5 hover:border-blue-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-blue-500/10 flex items-center justify-center transition-colors duration-500">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/60 group-hover:text-blue-400 transition-colors duration-500"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                LinkedIn
              </h3>
              <p className="text-xs text-white/30 truncate">Philip (Oluseyi) Odediran</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/15 group-hover:text-blue-400/60 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/oluseyiodediran"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-pink-500/5 hover:border-pink-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-pink-500/10 flex items-center justify-center transition-colors duration-500">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60 group-hover:text-pink-400 transition-colors duration-500"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                Instagram
              </h3>
              <p className="text-xs text-white/30 truncate">@oluseyiodediran</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/15 group-hover:text-pink-400/60 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:philipoluseyi@gmail.com"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-purple-500/10 flex items-center justify-center transition-colors duration-500">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60 group-hover:text-purple-400 transition-colors duration-500"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                Email
              </h3>
              <p className="text-xs text-white/30 truncate">philipoluseyi@gmail.com</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/15 group-hover:text-purple-400/60 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>

        {/* Back link */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-purple-400 transition-colors duration-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
