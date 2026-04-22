"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPin, Search, Users } from "lucide-react";
import type { DateRange } from "react-day-picker";
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
import { DESTINATION_LABEL } from "@/lib/types";
import { formatDateID } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "hero" | "compact";
  initialDestination?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
};

export function SearchBar({
  variant = "hero",
  initialDestination = "all",
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}: Props) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialDestination);
  const [range, setRange] = useState<DateRange | undefined>(() => {
    if (initialCheckIn && initialCheckOut) {
      return { from: new Date(initialCheckIn), to: new Date(initialCheckOut) };
    }
    const today = new Date();
    const in3 = new Date(today);
    in3.setDate(today.getDate() + 3);
    const in5 = new Date(today);
    in5.setDate(today.getDate() + 5);
    return { from: in3, to: in5 };
  });
  const [guests, setGuests] = useState<number>(initialGuests);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination && destination !== "all") {
      params.set("destination", destination);
    }
    if (range?.from) params.set("checkIn", range.from.toISOString().slice(0, 10));
    if (range?.to) params.set("checkOut", range.to.toISOString().slice(0, 10));
    params.set("guests", String(guests));
    router.push(`/search?${params.toString()}`);
  };

  const rangeLabel =
    range?.from && range?.to
      ? `${formatDateID(range.from, "d MMM")} – ${formatDateID(range.to, "d MMM")}`
      : "Pilih tanggal";

  return (
    <div
      className={cn(
        "w-full rounded-2xl border bg-card shadow-lg",
        variant === "hero" ? "p-3 sm:p-4" : "p-2"
      )}
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.2fr_1.5fr_1fr_auto]">
        <Select value={destination} onValueChange={(v) => setDestination(v ?? "all")}>
          <SelectTrigger className="h-14 rounded-xl border-muted bg-muted/30 px-4 text-left [&>span]:line-clamp-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Destinasi
                </span>
                <SelectValue placeholder="Semua destinasi" />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua destinasi</SelectItem>
            {Object.entries(DESTINATION_LABEL).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger
            className="flex h-14 w-full items-center gap-2 rounded-xl border bg-muted/30 px-4 text-left hover:bg-muted/50 transition-colors"
          >
            <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Check-in – Check-out
              </span>
              <span className="text-sm font-medium">{rangeLabel}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={typeof window !== "undefined" && window.innerWidth >= 640 ? 2 : 1}
              disabled={{ before: new Date() }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={String(guests)} onValueChange={(v) => setGuests(Number(v ?? 1))}>
          <SelectTrigger className="h-14 rounded-xl border-muted bg-muted/30 px-4 text-left">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary shrink-0" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Tamu
                </span>
                <SelectValue />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} tamu
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="lg"
          onClick={handleSearch}
          className="h-14 rounded-xl px-6 text-base font-semibold"
        >
          <Search className="mr-2 h-4 w-4" />
          Cari
        </Button>
      </div>
    </div>
  );
}
