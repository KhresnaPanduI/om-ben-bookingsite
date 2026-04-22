import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "./SearchResults";

type SP = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <SearchBar
              variant="compact"
              initialDestination={sp.destination ?? "all"}
              initialCheckIn={sp.checkIn}
              initialCheckOut={sp.checkOut}
              initialGuests={sp.guests ? Number(sp.guests) : 2}
            />
          </div>
        </div>
        <Suspense fallback={<div className="p-8">Memuat hasil…</div>}>
          <SearchResults
            destination={sp.destination ?? "all"}
            guests={sp.guests ? Number(sp.guests) : 1}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
