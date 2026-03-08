"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create Poster" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-zinc-950">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer grid */}
        <div className="py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo-white.png"
                  alt="IWD Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white">
                  IWD <span className="text-purple-400">{currentYear}</span>
                </span>
                <p className="text-[9px] text-white/25 -mt-0.5 tracking-[0.2em] uppercase">
                  International Women&apos;s Day
                </p>
              </div>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs">
              Create stunning custom collage posters to celebrate the incredible
              women in your life. Everything runs locally in your browser.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-200 ${
                      pathname === link.href
                        ? "text-purple-400"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          {/*<div>*/}
          {/*  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">*/}
          {/*    Features*/}
          {/*  </h4>*/}
          {/*  <ul className="space-y-2.5">*/}
          {/*    {[*/}
          {/*      "Upload & Crop",*/}
          {/*      "Auto Grayscale",*/}
          {/*      "Custom Backgrounds",*/}
          {/*      "Live Preview",*/}
          {/*      "High-Res Export",*/}
          {/*    ].map((f) => (*/}
          {/*      <li key={f} className="text-sm text-white/30">*/}
          {/*        {f}*/}
          {/*      </li>*/}
          {/*    ))}*/}
          {/*  </ul>*/}
          {/*</div>*/}

          {/* Contact / CTA */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
              Get Started
            </h4>
            <p className="text-xs text-white/30 leading-relaxed mb-4">
              Design a print-ready 3000×3500px poster in minutes. No sign-up
              required.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/15 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
            >
              Create Poster
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20">
            © {currentYear} IWD Poster Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/15">
              100% client-side · No data uploaded
            </span>
            <span className="hidden sm:inline text-white/10">·</span>
            <span className="hidden sm:inline text-[11px] text-white/15">
              Built with ♡ for IWD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

