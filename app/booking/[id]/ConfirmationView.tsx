"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Calendar, Users, Copy } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBookingFromStorage } from "@/lib/api";
import { listings } from "@/lib/data/listings";
import {
  PAYMENT_METHOD_LABEL,
  type Booking,
  type Listing,
} from "@/lib/types";
import { formatDateID, formatIDR } from "@/lib/format";
import { toast } from "sonner";

export function ConfirmationView({ bookingId }: { bookingId: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const b = getBookingFromStorage(bookingId);
    if (b) {
      setBooking(b);
      setListing(listings.find((l) => l.id === b.listingId) ?? null);
    }
    setLoading(false);
  }, [bookingId]);

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-10">Memuat…</div>;
  }

  if (!booking || !listing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Pemesanan tidak ditemukan</h1>
        <p className="mt-2 text-muted-foreground">
          Link mungkin sudah kadaluarsa atau dibuka di perangkat lain.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-6 h-10 px-5" })}>
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
            Pemesanan berhasil! 🎉
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Kami sudah mengirim e-voucher ke {booking.guestInfo.email}. Tunjukkan
            kode booking ini saat check-in.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-mono text-sm font-semibold">
            <span>{booking.id}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(booking.id);
                toast.success("Kode booking disalin");
              }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Salin kode booking"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
            <Image
              src={listing.photos[0]}
              alt={listing.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{listing.title}</p>
            <p className="text-sm text-muted-foreground">{listing.city}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Host: {listing.host.name}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border bg-muted/30 p-4 text-sm sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Check-in
              </div>
              <div className="font-medium">
                {formatDateID(booking.checkIn, "EEEE, d MMM yyyy")}
              </div>
              <div className="text-xs text-muted-foreground">Dari 14:00</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Check-out
              </div>
              <div className="font-medium">
                {formatDateID(booking.checkOut, "EEEE, d MMM yyyy")}
              </div>
              <div className="text-xs text-muted-foreground">Sebelum 12:00</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {booking.guests} tamu · {booking.totals.nights} malam
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatIDR(booking.totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya layanan</span>
            <span>{formatIDR(booking.totals.serviceFee)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Total dibayar</span>
            <span>{formatIDR(booking.totals.total)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            via {PAYMENT_METHOD_LABEL[booking.paymentMethod]}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "h-11 flex-1 px-5",
            })}
          >
            Kembali ke beranda
          </Link>
          <Link
            href="/search"
            className={buttonVariants({ className: "h-11 flex-1 px-5" })}
          >
            Cari penginapan lain
          </Link>
        </div>
      </div>
    </div>
  );
}
