import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="relative h-10 w-[160px] overflow-hidden rounded-sm">
            <Image src="/logo.jpg" alt="Black Pixel" fill sizes="160px" className="object-cover" />
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="#services" className="exif text-[11px] text-cream-dim/70 hover:text-pixel-orange">
              Services
            </a>
            <a href="#realisations" className="exif text-[11px] text-cream-dim/70 hover:text-pixel-orange">
              Réalisations
            </a>
            <a href="#reservation" className="exif text-[11px] text-cream-dim/70 hover:text-pixel-orange">
              Réserver
            </a>
            <a href="#studio" className="exif text-[11px] text-cream-dim/70 hover:text-pixel-orange">
              Le studio
            </a>
            <a href="#contact" className="exif text-[11px] text-cream-dim/70 hover:text-pixel-orange">
              Contact
            </a>
          </nav>

          <div className="flex gap-3">
            <a
              href="mailto:blackpixel237@gmail.com"
              aria-label="E-mail"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-dim/20 text-cream-dim transition-colors hover:border-pixel-orange hover:text-pixel-orange"
            >
              <Mail size={16} />
            </a>
            <a
              href="tel:+237683346425"
              aria-label="Téléphone"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-dim/20 text-cream-dim transition-colors hover:border-pixel-orange hover:text-pixel-orange"
            >
              <Phone size={16} />
            </a>
            <a
              href="https://wa.me/237641123499"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-dim/20 text-cream-dim transition-colors hover:border-pixel-orange hover:text-pixel-orange"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="exif text-[10px] text-cream-dim/40">
            © {YEAR} Black Pixel — La précision au service de la créativité.
          </p>
          <p className="exif text-[10px] text-cream-dim/40">Douala, Cameroun</p>
        </div>
      </div>
    </footer>
  );
}
