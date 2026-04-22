import { notFound } from "next/navigation";
import { ListingForm } from "@/components/ListingForm";
import { getListing } from "@/lib/api";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();
  return <ListingForm mode="edit" listing={listing} />;
}
