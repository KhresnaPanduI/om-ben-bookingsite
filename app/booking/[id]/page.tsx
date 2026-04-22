import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConfirmationView } from "./ConfirmationView";

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/20">
        <ConfirmationView bookingId={id} />
      </main>
      <Footer />
    </>
  );
}
