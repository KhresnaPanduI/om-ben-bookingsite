import Image from "next/image";
import Link from "next/link";
import { Star, Users, Bed } from "lucide-react";
import type { Listing } from "@/lib/types";
import { PROPERTY_TYPE_LABEL } from "@/lib/types";
import { formatIDR } from "@/lib/format";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg hover:border-primary/30"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={listing.photos[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-xs font-semibold">
          {PROPERTY_TYPE_LABEL[listing.propertyType]}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-2 leading-snug">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 text-sm font-medium shrink-0">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{listing.city}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {listing.maxGuests} tamu
          </span>
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" />
            {listing.bedrooms} kamar
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            {formatIDR(listing.pricePerNight)}
          </span>
          <span className="text-xs text-muted-foreground">/malam</span>
        </div>
      </div>
    </Link>
  );
}
