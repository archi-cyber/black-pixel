"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, Play } from "lucide-react";

const BLADES = Array.from({ length: 8 });

function ApertureLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative h-64 w-64">
        {BLADES.map((_, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 origin-top-left bg-pixel-orange"
            style={{
              width: "50%",
              height: "10px",
              rotate: `${(360 / BLADES.length) * i}deg`,
            }}
            initial={{ scaleX: 1, opacity: 1 }}
            animate={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.15 + i * 0.03, ease: [0.7, 0, 0.3, 1] }}
          />
        ))}
        <motion.span
          className="exif absolute inset-0 flex items-center justify-center text-[11px] text-cream-dim"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          MISE AU POINT…
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [loading, setLoading] = useState(true);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <AnimatePresence>{loading && <ApertureLoader onDone={() => setLoading(false)} />}</AnimatePresence>

      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-6 hidden border border-pixel-orange/25 md:block md:inset-10" />
      <span className="pointer-events-none absolute left-6 top-6 hidden h-6 w-6 border-l-2 border-t-2 border-pixel-orange md:block md:left-10 md:top-10" />
      <span className="pointer-events-none absolute right-6 top-6 hidden h-6 w-6 border-r-2 border-t-2 border-pixel-orange md:block md:right-10 md:top-10" />
      <span className="pointer-events-none absolute bottom-6 left-6 hidden h-6 w-6 border-b-2 border-l-2 border-pixel-orange md:block md:bottom-10 md:left-10" />
      <span className="pointer-events-none absolute bottom-6 right-6 hidden h-6 w-6 border-b-2 border-r-2 border-pixel-orange md:block md:bottom-10 md:right-10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="exif mb-6 text-[11px] text-pixel-orange"
        >
          Studio de production audiovisuelle — Douala, Cameroun
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7 }}
          className="max-w-4xl font-display text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl"
        >
          <span className="italic text-pixel-gold">La précision</span>
          <br />
          au service de la créativité.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.6 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-cream-dim md:text-lg"
        >
          Vidéo, photo et réalisation audiovisuelle pensées comme un métier d’exactitude.
          Réservez votre prestation en ligne : nous confirmons la disponibilité et revenons
          vers vous rapidement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#reservation"
            className="group inline-flex items-center gap-2 rounded-full bg-pixel-orange px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Réserver une prestation
            <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#realisations"
            className="group inline-flex items-center gap-3 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-dim/40 transition-colors group-hover:border-pixel-orange">
              <Play size={14} className="text-pixel-orange" fill="currentColor" />
            </span>
            Voir nos réalisations
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="exif text-[10px] text-cream-dim/70">défiler</span>
        <span className="h-10 w-px bg-gradient-to-b from-pixel-orange to-transparent" />
      </motion.div>
    </section>
  );
}
