"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Camera,
  Clapperboard,
  Disc3,
  PartyPopper,
  Megaphone,
  Building2,
  PackageOpen,
  PenTool,
  Aperture,
  Frame,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  category: string;
};

const CATEGORIES = ["Tout", "Vidéo & réalisation", "Photographie", "Événementiel", "Créatif & formation"] as const;

const SERVICES: Service[] = [
  {
    icon: Film,
    tag: "VID · 01",
    title: "Montage vidéo professionnel",
    description: "Post-production soignée : rythme, étalonnage, sound design et export multi-formats.",
    category: "Vidéo & réalisation",
  },
  {
    icon: Clapperboard,
    tag: "VID · 02",
    title: "Réalisation et production audiovisuelle",
    description: "De l’écriture au tournage, un pilotage complet de vos projets vidéo, du concept à la livraison.",
    category: "Vidéo & réalisation",
  },
  {
    icon: Disc3,
    tag: "VID · 03",
    title: "Réalisation de clips vidéo",
    description: "Mise en scène et direction artistique pour des clips musicaux au rendu cinématographique.",
    category: "Vidéo & réalisation",
  },
  {
    icon: Megaphone,
    tag: "VID · 04",
    title: "Publicités et contenus promotionnels",
    description: "Spots et formats courts pensés pour convertir, calibrés pour le web et les réseaux sociaux.",
    category: "Vidéo & réalisation",
  },
  {
    icon: Building2,
    tag: "VID · 05",
    title: "Vidéos corporate & institutionnelles",
    description: "Films d’entreprise, portraits de marque et supports internes à l’image de votre structure.",
    category: "Vidéo & réalisation",
  },
  {
    icon: Camera,
    tag: "PHO · 01",
    title: "Photographie professionnelle",
    description: "Un œil précis pour chaque contexte : portrait, corporate, produit ou reportage.",
    category: "Photographie",
  },
  {
    icon: Aperture,
    tag: "PHO · 02",
    title: "Shooting photo (studio & extérieur)",
    description: "Séances en studio ou en décor naturel, lumière maîtrisée et direction artistique sur mesure.",
    category: "Photographie",
  },
  {
    icon: Frame,
    tag: "PHO · 03",
    title: "Tableaux photo & portraits décoratifs",
    description: "Conception et impression de tableaux et portraits sur différents supports, prêts à accrocher.",
    category: "Photographie",
  },
  {
    icon: PartyPopper,
    tag: "EVT · 01",
    title: "Couverture événementielle",
    description: "Mariages, anniversaires, baptêmes, conférences, séminaires, concerts et autres célébrations.",
    category: "Événementiel",
  },
  {
    icon: PackageOpen,
    tag: "EVT · 02",
    title: "Location de matériel & accessoires",
    description: "Équipements d’animation et accessoires événementiels pour sublimer vos réceptions.",
    category: "Événementiel",
  },
  {
    icon: PenTool,
    tag: "CRE · 01",
    title: "Infographie & supports de communication",
    description: "Identité visuelle, affiches, flyers et supports graphiques cohérents avec votre image de marque.",
    category: "Créatif & formation",
  },
  {
    icon: GraduationCap,
    tag: "CRE · 02",
    title: "Formations professionnelles",
    description: "Montage vidéo, photographie, réalisation audiovisuelle, pilotage de drone et métiers créatifs.",
    category: "Créatif & formation",
  },
];

export default function Services() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("Tout");

  const filtered =
    active === "Tout" ? SERVICES : SERVICES.filter((s) => s.category === active);

  return (
    <section id="services" className="bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="exif mb-4 text-[11px] text-pixel-orange-deep">Ce que nous faisons</p>
            <h2 className="max-w-xl font-display text-4xl leading-tight md:text-5xl">
              Un catalogue de services{" "}
              <span className="italic text-pixel-orange-deep">bâti pour la précision.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/70">
            Chaque prestation Black Pixel repose sur le même principe : cadrer juste, éclairer
            juste, monter juste — pour que votre message reste net du premier plan au dernier.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`exif rounded-full border px-4 py-2 text-[11px] transition-colors ${
                active === cat
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="group flex flex-col gap-4 rounded-md border border-ink/10 bg-white/60 p-6 transition-colors hover:border-pixel-orange/60 hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-pixel-orange">
                      <Icon size={19} />
                    </span>
                    <span className="exif text-[10px] text-ink/40">{service.tag}</span>
                  </div>
                  <h3 className="font-display text-xl leading-snug">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/65">{service.description}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
