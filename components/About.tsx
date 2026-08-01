"use client";

import { motion } from "framer-motion";

const CAPACITIES = [
  { label: "Prise de vue", value: "Vidéo & photo, studio et extérieur" },
  { label: "Aérien", value: "Pilotage de drone" },
  { label: "Post-production", value: "Montage, étalonnage, sound design" },
  { label: "Événementiel", value: "Équipe et matériel déployables sur site" },
  { label: "Graphisme", value: "Infographie et supports de communication" },
  { label: "Transmission", value: "Formations professionnelles sur mesure" },
];

export default function About() {
  return (
    <section id="studio" className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="exif mb-4 text-[11px] text-pixel-orange">Le studio</p>
          <h2 className="font-display text-4xl leading-tight text-cream md:text-5xl">
            Un regard technique,{" "}
            <span className="italic text-pixel-gold">une signature créative.</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-cream-dim/85">
            Black Pixel est un studio de production audiovisuelle basé à Douala. Nous pensons
            chaque projet comme un réglage d’appareil : cadrage, lumière et rythme ajustés au
            millimètre pour que l’émotion passe sans perte de qualité.
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream-dim/85">
            Mariages, événements d’entreprise, contenus de marque ou formations — nous
            accompagnons nos clients avec la même exigence, du premier échange jusqu’à la
            livraison finale.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#reservation"
              className="rounded-full bg-pixel-orange px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Réserver une prestation
            </a>
            <a
              href="#services"
              className="rounded-full border border-cream-dim/30 px-6 py-3 text-sm text-cream-dim transition-colors hover:border-pixel-orange hover:text-cream"
            >
              Voir nos services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-md border border-line bg-surface p-8 md:p-10"
        >
          <div className="mb-6 flex items-center justify-between border-b border-line pb-5">
            <span className="exif text-[11px] text-cream-dim/60">Fiche technique</span>
            <span className="exif text-[11px] text-pixel-orange">Black Pixel</span>
          </div>
          <dl className="divide-y divide-line">
            {CAPACITIES.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="exif text-[11px] text-cream-dim/50">{item.label}</dt>
                <dd className="text-sm text-cream sm:text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
