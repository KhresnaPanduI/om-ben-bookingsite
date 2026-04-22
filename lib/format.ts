import { format as fmtDate } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatIDR(amount: number): string {
  return IDR.format(amount);
}

export function formatIDRShort(amount: number): string {
  if (amount >= 1_000_000) {
    const value = amount / 1_000_000;
    return `Rp ${value.toFixed(value >= 10 ? 0 : 1)}jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${Math.round(amount / 1_000)}rb`;
  }
  return `Rp ${amount}`;
}

export function formatDateID(date: Date | string, pattern = "d MMM yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return fmtDate(d, pattern, { locale: idLocale });
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function calcTotals(pricePerNight: number, nights: number) {
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;
  return { nights, subtotal, serviceFee, total };
}
