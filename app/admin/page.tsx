import Link from "next/link";
import Image from "next/image";
import {
  Home,
  CalendarCheck,
  TrendingUp,
  Star,
  ArrowRight,
  Plus,
} from "lucide-react";
import { listings } from "@/lib/data/listings";
import { formatIDR } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const totalListings = listings.length;
  const avgRating =
    listings.reduce((s, l) => s + l.rating, 0) / listings.length;
  const totalReviews = listings.reduce((s, l) => s + l.reviewCount, 0);
  // Mocked revenue figure (placeholder)
  const mockedRevenue = listings.reduce(
    (s, l) => s + l.pricePerNight * 12,
    0
  );

  const stats = [
    {
      label: "Total listing",
      value: totalListings,
      icon: Home,
      hint: "Semua properti aktif",
    },
    {
      label: "Pemesanan bulan ini",
      value: 42,
      icon: CalendarCheck,
      hint: "+12% vs bulan lalu",
    },
    {
      label: "Pendapatan (30 hari)",
      value: formatIDR(mockedRevenue),
      icon: TrendingUp,
      hint: "Estimasi berbasis booking",
    },
    {
      label: "Rating rata-rata",
      value: avgRating.toFixed(2),
      icon: Star,
      hint: `${totalReviews} ulasan`,
    },
  ];

  const topListings = [...listings]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ringkasan kinerja properti Anda.
          </p>
        </div>
        <Link
          href="/admin/listings/new"
          className={buttonVariants({ className: "h-10 px-4" })}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah listing
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.hint}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="font-bold">Listing teratas</h2>
            <Link
              href="/admin/listings"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Lihat semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y">
            {topListings.map((l) => (
              <li
                key={l.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={l.photos[0]}
                    alt={l.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-sm">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.city}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-semibold">
                    {formatIDR(l.pricePerNight)}
                  </div>
                  <div className="text-xs text-muted-foreground">/malam</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {l.rating.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="font-bold">Aksi cepat</h2>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/listings/new"
              className="flex items-center justify-between rounded-lg border p-3 text-sm font-medium hover:border-primary/40 hover:bg-muted/30 transition-colors"
            >
              <span>Tambah listing baru</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/listings"
              className="flex items-center justify-between rounded-lg border p-3 text-sm font-medium hover:border-primary/40 hover:bg-muted/30 transition-colors"
            >
              <span>Kelola listing</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center justify-between rounded-lg border p-3 text-sm font-medium hover:border-primary/40 hover:bg-muted/30 transition-colors"
            >
              <span>Lihat pemesanan masuk</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center justify-between rounded-lg border p-3 text-sm font-medium hover:border-primary/40 hover:bg-muted/30 transition-colors"
            >
              <span>Pengaturan akun</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
