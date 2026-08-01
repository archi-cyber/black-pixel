"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const CONTACTS = [
  {
    icon: Mail,
    label: "E-mail",
    value: "blackpixel237@gmail.com",
    href: "mailto:blackpixel237@gmail.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+237 683 346 425",
    href: "tel:+237683346425",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp / Orange",
    value: "+237 641 123 499",
    href: "https://wa.me/237641123499",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="exif mb-4 text-[11px] text-pixel-orange">Contact direct</p>
            <h2 className="max-w-md font-display text-4xl leading-tight text-cream md:text-5xl">
              Une question avant de{" "}
              <span className="italic text-pixel-gold">réserver ?</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-dim/80">
              Écrivez-nous directement ou appelez l’équipe Black Pixel — nous répondons
              rapidement, en semaine comme le week-end pendant la saison des événements.
            </p>
            <p className="exif mt-8 flex items-center gap-2 text-[11px] text-cream-dim/50">
              <MapPin size={14} className="text-pixel-orange" />
              Douala, Cameroun
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-md border border-line bg-surface p-5 transition-colors hover:border-pixel-orange/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-pixel-orange">
                    <c.icon size={18} />
                  </span>
                  <span>
                    <span className="exif block text-[10px] text-cream-dim/50">{c.label}</span>
                    <span className="text-sm font-medium text-cream">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
