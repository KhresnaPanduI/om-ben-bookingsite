"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatDateID, formatIDR, nightsBetween, calcTotals } from "@/lib/format";
import { toast } from "sonner";

type Props = {
  listingId: string;
  pricePerNight: number;
  maxGuests: number;
};

export function PriceCard({ listingId, pricePerNight, maxGuests }: Props) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    const a = new Date(today);
    a.setDate(today.getDate() + 3);
    const b = new Date(today);
    b.setDate(today.getDate() + 5);
    return { from: a, to: b };
  });
  const [guests, setGuests] = useState(2);

  const checkIn = range?.from?.toISOString().slice(0, 10);
  const checkOut = range?.to?.toISOString().slice(0, 10);
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const totals = calcTotals(pricePerNight, nights);

  const book = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      toast.error("Pilih tanggal check-in dan check-out dulu");
      return;
    }
    const params = new URLSearchParams({
      listingId,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-primary">
          {formatIDR(pricePerNight)}
        </span>
        <span className="text-sm text-muted-foreground">/malam</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl border overflow-hidden">
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 px-3 py-3 text-left hover:bg-muted/30 border-b transition-colors">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <div className="text-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Check-in – Check-out
              </div>
              <div className="font-medium">
                {range?.from && range?.to
                  ? `${formatDateID(range.from, "d MMM")} – ${formatDateID(
                      range.to,
                      "d MMM yyyy"
                    )}`
                  : "Pilih tanggal"}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Select value={String(guests)} onValueChange={(v) => setGuests(Number(v ?? 1))}>
          <SelectTrigger className="h-auto border-0 rounded-none px-3 py-3 justify-start gap-2 hover:bg-muted/30 [&>svg:last-child]:ml-auto">
            <Users className="h-4 w-4 text-primary" />
            <div className="text-sm text-left">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Tamu
              </div>
              <div className="font-medium">
                <SelectValue />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} tamu
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={book}
        size="lg"
        className="mt-4 w-full h-12 text-base font-semibold"
      >
        Pesan sekarang
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Belum dikenakan biaya
      </p>

      {nights > 0 && (
        <>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="underline decoration-dotted">
                {formatIDR(pricePerNight)} × {nights} malam
              </span>
              <span>{formatIDR(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline decoration-dotted">Biaya layanan</span>
              <span>{formatIDR(totals.serviceFee)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>{formatIDR(totals.total)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
