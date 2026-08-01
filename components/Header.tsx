"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, CalendarCheck } from "lucide-react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#studio", label: "Le studio" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative h-9 w-[150px] overflow-hidden rounded-sm md:h-11 md:w-[180px]">
            <Image
              src="/logo.jpg"
              alt="Black Pixel"
              fill
              sizes="180px"
              className="object-cover"
              priority
            />
          </div>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="exif text-[11px] text-cream-dim transition-colors hover:text-pixel-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#reservation"
          className="hidden items-center gap-2 rounded-full border border-pixel-orange px-5 py-2 exif text-[11px] text-pixel-orange transition-colors hover:bg-pixel-orange hover:text-ink md:inline-flex"
        >
          <CalendarCheck size={14} />
          Réserver
        </a>

        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-cream md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink/97 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="exif text-sm text-cream-dim hover:text-pixel-orange"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-pixel-orange px-5 py-2 exif text-[11px] text-pixel-orange"
            >
              <CalendarCheck size={14} />
              Réserver
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
