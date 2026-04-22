import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "./CheckoutForm";
import { getListing } from "@/lib/api";

type SP = {
  listingId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  if (!sp.listingId || !sp.checkIn || !sp.checkOut) {
    redirect("/");
  }
  const listing = await getListing(sp.listingId);
  if (!listing) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Selesaikan pemesanan</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Periksa kembali detail pemesanan Anda sebelum membayar.
          </p>
          <div className="mt-6">
            <CheckoutForm
              listing={listing}
              checkIn={sp.checkIn}
              checkOut={sp.checkOut}
              guests={Number(sp.guests ?? 2)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
