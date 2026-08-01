import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/booking-schema";

// POST /api/bookings — créer une demande de réservation (public)
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        serviceType: parsed.data.serviceType,
        eventDate: new Date(parsed.data.eventDate),
        location: parsed.data.location || undefined,
        message: parsed.data.message || undefined,
      },
    });

    return NextResponse.json(
      { id: booking.id, message: "Réservation enregistrée." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erreur création réservation:", err);
    return NextResponse.json(
      { error: "Impossible d'enregistrer la réservation pour le moment." },
      { status: 500 }
    );
  }
}

// GET /api/bookings — lister les réservations (protégé par un jeton simple)
// Utilisé par la page /admin. À remplacer par une vraie authentification
// avant la mise en production.
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const expected = process.env.ADMIN_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ bookings });
}
