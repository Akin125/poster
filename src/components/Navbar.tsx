"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
	{
		href: "/",
		label: "Home",
		icon: (
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
				<polyline points="9 22 9 12 15 12 15 22" />
			</svg>
		),
	},
	{
		href: "/create",
		label: "Poster Portal",
		icon: (
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				<circle cx="9" cy="9" r="2" />
				<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
			</svg>
		),
	},
	{
		href: "/contact",
		label: "Contact",
		icon: (
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</svg>
		),
	},
];

export default function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
					scrolled || mobileOpen
						? "bg-zinc-950/90 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-500/5"
						: "bg-transparent"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex items-center justify-between h-16 sm:h-20">
						{/* Logo — always visible */}
						<Link href="/" className="flex items-center gap-2.5 group">
							<div className="relative w-9 h-9 sm:w-11 sm:h-11">
								<Image
									src="/logo-white.png"
									alt="Social Committee Logo"
									fill
									className="object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-500"
								/>
							</div>
							<div>
								<span className="text-base sm:text-lg font-bold tracking-tight text-white">
									Social <span className="text-purple-400">Committee</span>
								</span>
								<p className="hidden sm:block text-[9px] text-white/30 -mt-0.5 tracking-[0.25em] uppercase">
									Poster Creator Portal
								</p>
							</div>
						</Link>

						{/* Desktop Nav */}
						<nav className="hidden md:flex items-center gap-1">
							{links.map((link) => {
											const isActive =
												link.href === "/create"
													? pathname.startsWith("/create")
													: pathname === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
											isActive
												? "text-white bg-purple-500/15 shadow-[inset_0_0_12px_rgba(168,85,247,0.15)]"
												: "text-white/50 hover:text-white hover:bg-white/5"
										}`}
									>
										{isActive && (
											<span className="absolute inset-0 rounded-full border border-purple-500/30" />
										)}
										{link.label}
									</Link>
								);
							})}
						</nav>

						{/* Desktop CTA */}
						<div className="hidden md:block">
							<Link
								href="/create"
								className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
							>
								Open Portal →
							</Link>
						</div>

						{/* Mobile toggle */}
						<button
							onClick={() => setMobileOpen(!mobileOpen)}
							className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
							aria-label="Toggle menu"
						>
							<div className="w-5 h-4 relative flex flex-col justify-between">
								<span
									className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
										mobileOpen ? "rotate-45 translate-y-[7px]" : ""
									}`}
								/>
								<span
									className={`block h-0.5 bg-current rounded-full transition-all duration-200 ${
										mobileOpen ? "opacity-0 scale-x-0" : ""
									}`}
								/>
								<span
									className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
										mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
									}`}
								/>
							</div>
						</button>
					</div>
				</div>
			</header>

			{/* Mobile menu overlay */}
			<div
				className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
					mobileOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={() => setMobileOpen(false)}
			/>

			{/* Mobile menu panel */}
			<div
				className={`fixed top-16 left-0 right-0 bottom-0 z-40 bg-zinc-950/98 backdrop-blur-2xl transition-all duration-400 md:hidden flex flex-col ${
					mobileOpen
						? "opacity-100 translate-y-0 pointer-events-auto"
						: "opacity-0 -translate-y-4 pointer-events-none"
				}`}
			>
				{/* Nav links */}
				<nav className="flex-1 px-5 pt-6 pb-4 space-y-1.5 overflow-y-auto">
					{links.map((link, i) => {
						const isActive =
							link.href === "/create"
								? pathname.startsWith("/create")
								: pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 ${
									isActive
										? "text-white bg-purple-500/10 border border-purple-500/20 shadow-[inset_0_0_20px_rgba(168,85,247,0.08)]"
										: "text-white/45 hover:text-white hover:bg-white/5"
								}`}
								style={{
									transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
								}}
							>
								<span
									className={
										isActive ? "text-purple-400" : "text-white/30"
									}
								>
									{link.icon}
								</span>
								{link.label}
								{isActive && (
									<span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
								)}
							</Link>
						);
					})}
				</nav>

				{/* Mobile bottom section */}
				<div className="px-5 pb-8 space-y-4 border-t border-white/5 pt-5">
					<Link
						href="/create"
						className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/20"
					>
						Open Portal
						<svg
							width="16"
							height="16"
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
					<div className="flex items-center justify-center gap-2 text-[11px] text-white/20">
						<span className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
						IWD · White Coat · Birthday
					</div>
				</div>
			</div>
		</>
	);
}

