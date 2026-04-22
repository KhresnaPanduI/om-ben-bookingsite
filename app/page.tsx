import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, BadgePercent } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { ListingCard } from "@/components/ListingCard";
import { getFeaturedListings } from "@/lib/api";
import { DESTINATION_LABEL, type Destination } from "@/lib/types";

const DESTINATION_IMAGES: Record<Destination, string> = {
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  yogyakarta:
    "https://images.unsplash.com/photo-1584810359583-96fc9a6f1d06?auto=format&fit=crop&w=800&q=80",
  bandung:
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
  lombok:
    "https://images.unsplash.com/photo-1559628233-eb1b1b6f4bae?auto=format&fit=crop&w=800&q=80",
};

export default async function HomePage() {
  const featured = await getFeaturedListings(6);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80"
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 sm:px-6">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                Temukan tempat menginap yang pas.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90">
                Villa, homestay, dan guesthouse pilihan di Bali, Yogyakarta,
                Bandung, dan Lombok — harga transparan, booking instan.
              </p>
            </div>
            <div className="mt-8">
              <SearchBar variant="hero" />
            </div>
          </div>
        </section>

        {/* Destination chips */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">
            Jelajahi destinasi populer
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {(Object.keys(DESTINATION_LABEL) as Destination[]).map((dest) => (
              <Link
                key={dest}
                href={`/search?destination=${dest}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={DESTINATION_IMAGES[dest]}
                  alt={DESTINATION_LABEL[dest]}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-lg font-bold">
                    {DESTINATION_LABEL[dest]}
                  </div>
                  <div className="text-xs opacity-90">Lihat penginapan →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured listings */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Penginapan pilihan
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tempat favorit para tamu kami
              </p>
            </div>
            <Link
              href="/search"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>

        {/* Trust section */}
        <section className="bg-muted/30 border-y">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="mb-8 text-center text-xl font-bold sm:text-2xl">
              Kenapa booking di Staycation.id?
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Booking aman</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pembayaran terenkripsi dan garansi refund bila listing tidak
                  sesuai.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BadgePercent className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Harga transparan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tidak ada biaya tersembunyi. Harga yang Anda lihat = harga
                  yang Anda bayar.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Properti terkurasi</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Setiap listing diverifikasi tim kami sebelum tayang.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
