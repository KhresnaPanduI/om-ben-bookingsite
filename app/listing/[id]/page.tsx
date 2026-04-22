import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Users, Bed, Bath, MapPin, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingGallery } from "@/components/ListingGallery";
import { PriceCard } from "@/components/PriceCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getListing, getReviews } from "@/lib/api";
import { AMENITY_LABEL, PROPERTY_TYPE_LABEL } from "@/lib/types";
import { formatDateID } from "@/lib/format";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();
  const reviews = await getReviews(id);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="mb-2">
            <Badge variant="secondary">
              {PROPERTY_TYPE_LABEL[listing.propertyType]}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            {listing.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{listing.rating.toFixed(2)}</span>
              <span className="text-muted-foreground">
                ({listing.reviewCount} ulasan)
              </span>
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {listing.city}
            </span>
          </div>

          <div className="mt-6">
            <ListingGallery photos={listing.photos} title={listing.title} />
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Left column */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">
                    {PROPERTY_TYPE_LABEL[listing.propertyType]} oleh{" "}
                    {listing.host.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {listing.maxGuests} tamu
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {listing.bedrooms} kamar tidur
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {listing.bathrooms} kamar mandi
                    </span>
                  </div>
                </div>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="mb-3 text-lg font-semibold">Tentang tempat ini</h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {listing.description}
                </p>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  Fasilitas yang tersedia
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  {listing.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2"
                    >
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {AMENITY_LABEL[a]}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="mb-4 text-lg font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {listing.rating.toFixed(2)} · {listing.reviewCount} ulasan
                  </span>
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-xl border bg-card p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={r.avatar}
                            alt={r.author}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{r.author}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDateID(r.date, "MMMM yyyy")}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky price card */}
            <div className="lg:block">
              <div className="lg:sticky lg:top-20">
                <PriceCard
                  listingId={listing.id}
                  pricePerNight={listing.pricePerNight}
                  maxGuests={listing.maxGuests}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
