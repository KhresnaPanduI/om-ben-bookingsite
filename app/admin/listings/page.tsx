import Link from "next/link";
import Image from "next/image";
import { Plus, Star, Pencil, Eye } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listings } from "@/lib/data/listings";
import {
  DESTINATION_LABEL,
  PROPERTY_TYPE_LABEL,
} from "@/lib/types";
import { formatIDR } from "@/lib/format";
import { DeleteListingButton } from "./DeleteListingButton";

export default function AdminListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Listing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola semua properti yang Anda sewakan.
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

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Properti</th>
                <th className="px-4 py-3">Destinasi</th>
                <th className="px-4 py-3">Tipe</th>
                <th className="px-4 py-3">Harga/malam</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {listings.map((l) => (
                <tr key={l.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={l.photos[0]}
                          alt={l.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{l.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {l.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {DESTINATION_LABEL[l.destination]}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant="secondary">
                      {PROPERTY_TYPE_LABEL[l.propertyType]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold">
                    {formatIDR(l.pricePerNight)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {l.rating.toFixed(2)}
                      <span className="text-xs text-muted-foreground">
                        ({l.reviewCount})
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Aktif
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/listing/${l.id}`}
                        target="_blank"
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
                        title="Lihat di situs"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/listings/${l.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteListingButton title={l.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
