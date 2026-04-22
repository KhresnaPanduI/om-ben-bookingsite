import { listings } from "@/lib/data/listings";
import { getReviewsForListing } from "@/lib/data/reviews";
import type { Booking, Listing, Review, SearchFilters } from "@/lib/types";

// Thin async wrappers over static data. Swap internals for fetch() later
// without touching call sites.

export async function getListings(): Promise<Listing[]> {
  return listings;
}

export async function getListing(id: string): Promise<Listing | null> {
  return listings.find((l) => l.id === id) ?? null;
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return listings.find((l) => l.slug === slug) ?? null;
}

export async function searchListings(
  filters: SearchFilters
): Promise<Listing[]> {
  let results = [...listings];

  if (filters.destination && filters.destination !== "all") {
    results = results.filter((l) => l.destination === filters.destination);
  }
  if (filters.guests) {
    results = results.filter((l) => l.maxGuests >= (filters.guests ?? 1));
  }
  if (filters.minPrice != null) {
    results = results.filter((l) => l.pricePerNight >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    results = results.filter((l) => l.pricePerNight <= filters.maxPrice!);
  }
  if (filters.propertyTypes && filters.propertyTypes.length) {
    results = results.filter((l) =>
      filters.propertyTypes!.includes(l.propertyType)
    );
  }
  if (filters.amenities && filters.amenities.length) {
    results = results.filter((l) =>
      filters.amenities!.every((a) => l.amenities.includes(a))
    );
  }
  if (filters.minRating) {
    results = results.filter((l) => l.rating >= filters.minRating!);
  }

  return results;
}

export async function getReviews(listingId: string): Promise<Review[]> {
  return getReviewsForListing(listingId);
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  return [...listings]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit);
}

// Mock booking: saved to sessionStorage on the client. Not actually async
// on the network, but typed the same way a real createBooking() would be.
export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "status">
): Promise<Booking> {
  const id = `BK-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
  const booking: Booking = {
    ...input,
    id,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    sessionStorage.setItem(`booking:${id}`, JSON.stringify(booking));
  }
  return booking;
}

export function getBookingFromStorage(id: string): Booking | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(`booking:${id}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Booking;
  } catch {
    return null;
  }
}
