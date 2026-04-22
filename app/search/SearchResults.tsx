"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ListingCard } from "@/components/ListingCard";
import {
  DEFAULT_FILTERS,
  FilterSidebar,
  type FiltersState,
} from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listings as ALL } from "@/lib/data/listings";
import { DESTINATION_LABEL, type Destination } from "@/lib/types";

type SortKey = "recommended" | "price_asc" | "price_desc" | "rating";

export function SearchResults({
  destination,
  guests,
}: {
  destination: string;
  guests: number;
}) {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>("recommended");

  const results = useMemo(() => {
    let r = [...ALL];
    if (destination && destination !== "all") {
      r = r.filter((l) => l.destination === destination);
    }
    if (guests) r = r.filter((l) => l.maxGuests >= guests);
    r = r.filter(
      (l) =>
        l.pricePerNight >= filters.priceRange[0] &&
        l.pricePerNight <= filters.priceRange[1]
    );
    if (filters.propertyTypes.length) {
      r = r.filter((l) => filters.propertyTypes.includes(l.propertyType));
    }
    if (filters.amenities.length) {
      r = r.filter((l) =>
        filters.amenities.every((a) => l.amenities.includes(a))
      );
    }
    if (filters.minRating > 0) {
      r = r.filter((l) => l.rating >= filters.minRating);
    }
    switch (sort) {
      case "price_asc":
        r.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price_desc":
        r.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        r.sort((a, b) => b.rating - a.rating);
        break;
      default:
        r.sort(
          (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount
        );
    }
    return r;
  }, [destination, guests, filters, sort]);

  const destLabel =
    destination && destination !== "all"
      ? DESTINATION_LABEL[destination as Destination]
      : "seluruh Indonesia";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Penginapan di {destLabel}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length} properti ditemukan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              className="inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium hover:bg-muted lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[380px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <FilterSidebar filters={filters} onChange={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
          <Select
            value={sort}
            onValueChange={(v) => setSort((v ?? "recommended") as SortKey)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Rekomendasi</SelectItem>
              <SelectItem value="price_asc">Harga: termurah</SelectItem>
              <SelectItem value="price_desc">Harga: termahal</SelectItem>
              <SelectItem value="rating">Rating tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-20 rounded-2xl border bg-card p-5">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
        </div>
        <div>
          {results.length === 0 ? (
            <div className="rounded-2xl border bg-card p-10 text-center">
              <p className="font-semibold">Tidak ada hasil</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Coba longgarkan filter atau ubah destinasi.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => setFilters(DEFAULT_FILTERS)}
              >
                Reset filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
