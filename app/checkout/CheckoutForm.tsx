"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PaymentMethodPicker } from "@/components/PaymentMethodPicker";
import { createBooking } from "@/lib/api";
import { calcTotals, formatDateID, formatIDR, nightsBetween } from "@/lib/format";
import type { Listing, PaymentMethod } from "@/lib/types";
import { toast } from "sonner";

export function CheckoutForm({
  listing,
  checkIn,
  checkOut,
  guests,
}: {
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [submitting, setSubmitting] = useState(false);

  const nights = nightsBetween(checkIn, checkOut);
  const totals = calcTotals(listing.pricePerNight, nights);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      toast.error("Mohon lengkapi data tamu");
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      const booking = await createBooking({
        listingId: listing.id,
        checkIn,
        checkOut,
        guests,
        guestInfo: { fullName, email, phone, notes },
        paymentMethod,
        totals,
      });
      router.push(`/booking/${booking.id}`);
    } catch {
      toast.error("Terjadi kesalahan, coba lagi");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 lg:grid-cols-[1fr_380px]"
    >
      <div className="space-y-6">
        {/* Guest info */}
        <section className="rounded-2xl border bg-card p-5 sm:p-6">
          <h2 className="text-lg font-bold">Data tamu utama</h2>
          <p className="text-sm text-muted-foreground">
            Pastikan data sesuai KTP/paspor untuk keperluan check-in.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">Nama lengkap</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sesuai KTP"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">Nomor HP (WhatsApp)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 812 3456 7890"
                required
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="notes">Catatan untuk host (opsional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: perkiraan jam check-in, kebutuhan khusus"
                className="mt-1.5 min-h-[80px]"
              />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="rounded-2xl border bg-card p-5 sm:p-6">
          <h2 className="text-lg font-bold">Metode pembayaran</h2>
          <p className="text-sm text-muted-foreground">
            Pilih cara bayar yang paling nyaman untuk Anda.
          </p>
          <div className="mt-4">
            <PaymentMethodPicker
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary/5 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <span>
              Transaksi Anda dilindungi enkripsi SSL. Kami tidak menyimpan data
              kartu Anda.
            </span>
          </div>
        </section>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full text-base font-semibold lg:hidden"
          disabled={submitting}
        >
          {submitting ? "Memproses…" : `Bayar ${formatIDR(totals.total)}`}
        </Button>
      </div>

      {/* Summary */}
      <aside>
        <div className="lg:sticky lg:top-20 rounded-2xl border bg-card p-5 sm:p-6">
          <h3 className="text-base font-bold">Ringkasan pemesanan</h3>
          <div className="mt-4 flex gap-3">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={listing.photos[0]}
                alt={listing.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold line-clamp-2">
                {listing.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {listing.city}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="font-medium">
                  {formatDateID(checkIn, "d MMM")} –{" "}
                  {formatDateID(checkOut, "d MMM yyyy")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {nights} malam
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{guests} tamu</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                {formatIDR(listing.pricePerNight)} × {nights} malam
              </span>
              <span>{formatIDR(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya layanan</span>
              <span>{formatIDR(totals.serviceFee)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatIDR(totals.total)}</span>
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-5 hidden h-12 w-full text-base font-semibold lg:flex"
            disabled={submitting}
          >
            {submitting ? "Memproses…" : "Bayar sekarang"}
          </Button>
        </div>
      </aside>
    </form>
  );
}
