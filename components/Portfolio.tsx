"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const WORKS = [
  {
    names: "Nicole & Romuald",
    type: "Mariage — couverture complète",
    exif: "DOUALA · f/2.0 · 1/250s · ISO 200",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
  {
    names: "Delfina & Yannick",
    type: "Mariage — film & reportage photo",
    exif: "DOUALA · f/1.8 · 1/320s · ISO 160",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Portfolio() {
  return (
    <section id="realisations" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="exif mb-4 text-[11px] text-pixel-orange">Nos réalisations</p>
            <h2 className="max-w-xl font-display text-4xl leading-tight text-cream md:text-5xl">
              Des histoires <span className="italic text-pixel-gold">déjà racontées.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream-dim/80">
            Un aperçu des célébrations que nous avons eu la confiance de capturer, du premier
            regard à la dernière danse.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {WORKS.map((work, i) => (
            <motion.div
              key={work.names}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="corner-frame group relative overflow-hidden rounded-md border border-line"
            >
              <div className="relative h-[420px] w-full overflow-hidden">
                <Image
                  src={work.image}
                  alt={`${work.names} — ${work.type}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="exif mb-2 text-[10px] text-pixel-orange">{work.exif}</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-cream">{work.names}</h3>
                    <p className="mt-1 text-sm text-cream-dim/80">{work.type}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-dim/30 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="exif mt-8 text-center text-[11px] text-cream-dim/50">
          D’autres reportages — anniversaires, baptêmes, séminaires et concerts — sur demande.
        </p>
      </div>
    </section>
  );
}
