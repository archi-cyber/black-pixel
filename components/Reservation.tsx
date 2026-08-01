"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CalendarCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { bookingSchema, SERVICE_TYPES, type BookingInput } from "@/lib/booking-schema";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Reservation() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { serviceType: "Mariage" },
  });

  const onSubmit = async (data: BookingInput) => {
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Une erreur est survenue. Merci de réessayer.");
        setState("error");
        return;
      }

      setBookingRef(json.id?.slice(-6).toUpperCase() ?? "");
      setState("success");
      reset();
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Vérifiez votre connexion.");
      setState("error");
    }
  };

  const todayISO = new Date().toISOString().split("T")[0];

  return (
    <section id="reservation" className="bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="text-center">
          <p className="exif mb-4 text-[11px] text-pixel-orange-deep">Réservation en ligne</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            Réservez votre <span className="italic text-pixel-orange-deep">prestation.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/65">
            Remplissez le formulaire ci-dessous avec la date et le type d’événement : votre
            demande est enregistrée immédiatement et notre équipe revient vers vous pour
            confirmer la disponibilité.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-md border border-ink/10 bg-white/70 p-8 md:p-10"
        >
          {state === "success" ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-pixel-orange">
                <CheckCircle2 size={26} />
              </span>
              <h3 className="font-display text-2xl">Demande envoyée !</h3>
              <p className="max-w-sm text-sm text-ink/65">
                Merci, votre demande de réservation a bien été enregistrée
                {bookingRef && (
                  <>
                    {" "}
                    (référence <span className="exif text-pixel-orange-deep">#{bookingRef}</span>)
                  </>
                )}
                . Nous vous contactons très vite par téléphone ou e-mail pour confirmer.
              </p>
              <button
                onClick={() => setState("idle")}
                className="mt-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink/70 transition-colors hover:border-pixel-orange hover:text-ink"
              >
                Faire une nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="exif mb-2 block text-[11px] text-ink/50">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                    placeholder="Votre nom"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="exif mb-2 block text-[11px] text-ink/50">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                    placeholder="6XX XXX XXX"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="exif mb-2 block text-[11px] text-ink/50">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                    placeholder="vous@exemple.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="serviceType" className="exif mb-2 block text-[11px] text-ink/50">
                    Type de prestation
                  </label>
                  <select
                    id="serviceType"
                    {...register("serviceType")}
                    className="w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                  >
                    {SERVICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="eventDate" className="exif mb-2 block text-[11px] text-ink/50">
                    Date de l’événement
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    min={todayISO}
                    {...register("eventDate")}
                    className="w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                  />
                  {errors.eventDate && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.eventDate.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="exif mb-2 block text-[11px] text-ink/50">
                    Lieu (optionnel)
                  </label>
                  <input
                    id="location"
                    type="text"
                    {...register("location")}
                    className="w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                    placeholder="Douala, Bonapriso…"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="exif mb-2 block text-[11px] text-ink/50">
                  Détails de votre projet (optionnel)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="w-full resize-none rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-pixel-orange"
                  placeholder="Nombre d’invités, style recherché, horaires…"
                />
              </div>

              {state === "error" && (
                <div className="flex items-center gap-2 rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-pixel-orange hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Confirmer la demande
                    <CalendarCheck size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
