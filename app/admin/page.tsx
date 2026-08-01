"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Lock, RefreshCw, Search } from "lucide-react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate: string;
  location?: string;
  message?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchBookings = async (t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        headers: { "x-admin-token": t },
      });
      if (!res.ok) {
        setError("Jeton invalide ou non autorisé.");
        setUnlocked(false);
        return;
      }
      const json = await res.json();
      setBookings(json.bookings);
      setUnlocked(true);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = bookings.filter((b) =>
    `${b.name} ${b.email} ${b.phone} ${b.serviceType}`.toLowerCase().includes(query.toLowerCase())
  );

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchBookings(token);
          }}
          className="w-full max-w-sm rounded-md border border-line bg-surface p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-pixel-orange">
              <Lock size={18} />
            </span>
            <h1 className="font-display text-xl text-cream">Accès réservations</h1>
          </div>
          <label htmlFor="token" className="exif mb-2 block text-[11px] text-cream-dim/60">
            Jeton d’accès
          </label>
          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-sm border border-line bg-transparent px-4 py-3 text-sm text-cream outline-none focus:border-pixel-orange"
            placeholder="••••••••••••"
          />
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pixel-orange px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Vérification…" : "Accéder"}
          </button>
          <p className="exif mt-6 text-center text-[10px] text-cream-dim/40">
            Jeton défini par la variable d’environnement ADMIN_TOKEN
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="exif mb-2 text-[11px] text-pixel-orange">Espace réservations</p>
            <h1 className="font-display text-3xl text-cream">
              {bookings.length} demande{bookings.length > 1 ? "s" : ""}
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-dim/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="rounded-full border border-line bg-surface py-2 pl-9 pr-4 text-sm text-cream outline-none focus:border-pixel-orange"
              />
            </div>
            <button
              onClick={() => fetchBookings(token)}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream-dim transition-colors hover:border-pixel-orange hover:text-cream"
            >
              <RefreshCw size={14} />
              Actualiser
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="exif border-b border-line text-[10px] text-cream-dim/50">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Prestation</th>
                <th className="px-5 py-3">Date événement</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3">Reçu le</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-line/60 text-cream-dim">
                  <td className="px-5 py-4 font-medium text-cream">{b.name}</td>
                  <td className="px-5 py-4">
                    <div>{b.email}</div>
                    <div className="text-cream-dim/60">{b.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    {b.serviceType}
                    {b.location && <div className="text-cream-dim/60">{b.location}</div>}
                  </td>
                  <td className="px-5 py-4">
                    {format(new Date(b.eventDate), "d MMM yyyy", { locale: fr })}
                  </td>
                  <td className="px-5 py-4">
                    <span className="exif rounded-full border border-pixel-orange/40 px-2.5 py-1 text-[10px] text-pixel-orange">
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-cream-dim/60">
                    {format(new Date(b.createdAt), "d MMM yyyy HH:mm", { locale: fr })}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-cream-dim/50">
                    Aucune réservation pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
