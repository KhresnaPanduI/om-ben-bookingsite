"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AMENITY_LABEL,
  DESTINATION_LABEL,
  PROPERTY_TYPE_LABEL,
  type Amenity,
  type Destination,
  type Listing,
  type PropertyType,
} from "@/lib/types";
import { toast } from "sonner";

type FormState = {
  title: string;
  description: string;
  destination: Destination;
  city: string;
  propertyType: PropertyType;
  pricePerNight: string;
  maxGuests: string;
  bedrooms: string;
  bathrooms: string;
  amenities: Amenity[];
  photos: string[];
};

const ALL_AMENITIES = Object.keys(AMENITY_LABEL) as Amenity[];

function toFormState(listing?: Listing): FormState {
  if (!listing) {
    return {
      title: "",
      description: "",
      destination: "bali",
      city: "",
      propertyType: "villa",
      pricePerNight: "",
      maxGuests: "2",
      bedrooms: "1",
      bathrooms: "1",
      amenities: [],
      photos: [""],
    };
  }
  return {
    title: listing.title,
    description: listing.description,
    destination: listing.destination,
    city: listing.city,
    propertyType: listing.propertyType,
    pricePerNight: String(listing.pricePerNight),
    maxGuests: String(listing.maxGuests),
    bedrooms: String(listing.bedrooms),
    bathrooms: String(listing.bathrooms),
    amenities: listing.amenities,
    photos: listing.photos,
  };
}

export function ListingForm({
  mode,
  listing,
}: {
  mode: "new" | "edit";
  listing?: Listing;
}) {
  const router = useRouter();
  const [state, setState] = useState<FormState>(toFormState(listing));
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  };

  const toggleAmenity = (a: Amenity) => {
    setState((s) => ({
      ...s,
      amenities: s.amenities.includes(a)
        ? s.amenities.filter((x) => x !== a)
        : [...s.amenities, a],
    }));
  };

  const setPhoto = (i: number, url: string) => {
    setState((s) => ({
      ...s,
      photos: s.photos.map((p, idx) => (idx === i ? url : p)),
    }));
  };

  const addPhoto = () => update("photos", [...state.photos, ""]);
  const removePhoto = (i: number) =>
    update(
      "photos",
      state.photos.filter((_, idx) => idx !== i)
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.title || !state.city || !state.pricePerNight) {
      toast.error("Mohon lengkapi judul, kota, dan harga");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success(
      mode === "new" ? "Listing berhasil ditambahkan" : "Perubahan tersimpan"
    );
    router.push("/admin/listings");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/listings"
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {mode === "new" ? "Tambah listing baru" : "Edit listing"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "new"
              ? "Isi detail properti Anda. Anda bisa mengubahnya kapan saja."
              : "Perbarui informasi properti Anda."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-bold">Informasi dasar</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="title">Nama properti</Label>
                <Input
                  id="title"
                  value={state.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Misal: Villa Atap Alang di Seminyak"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={state.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Ceritakan keistimewaan properti Anda"
                  className="mt-1.5 min-h-[120px]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Destinasi</Label>
                  <Select
                    value={state.destination}
                    onValueChange={(v) =>
                      update(
                        "destination",
                        (v ?? "bali") as Destination
                      )
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(DESTINATION_LABEL) as Destination[]).map(
                        (d) => (
                          <SelectItem key={d} value={d}>
                            {DESTINATION_LABEL[d]}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">Kota / area</Label>
                  <Input
                    id="city"
                    value={state.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="Misal: Seminyak, Bali"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label>Tipe properti</Label>
                <Select
                  value={state.propertyType}
                  onValueChange={(v) =>
                    update(
                      "propertyType",
                      (v ?? "villa") as PropertyType
                    )
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(PROPERTY_TYPE_LABEL) as PropertyType[]).map(
                      (pt) => (
                        <SelectItem key={pt} value={pt}>
                          {PROPERTY_TYPE_LABEL[pt]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-bold">Kapasitas & harga</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="price">Harga per malam (IDR)</Label>
                <Input
                  id="price"
                  type="number"
                  value={state.pricePerNight}
                  onChange={(e) => update("pricePerNight", e.target.value)}
                  placeholder="850000"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="maxGuests">Maksimum tamu</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  min={1}
                  value={state.maxGuests}
                  onChange={(e) => update("maxGuests", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="bedrooms">Kamar tidur</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min={0}
                  value={state.bedrooms}
                  onChange={(e) => update("bedrooms", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Kamar mandi</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min={0}
                  value={state.bathrooms}
                  onChange={(e) => update("bathrooms", e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-bold">Fasilitas</h2>
            <p className="text-sm text-muted-foreground">
              Centang semua yang tersedia di properti ini.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ALL_AMENITIES.map((a) => (
                <label
                  key={a}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <Checkbox
                    checked={state.amenities.includes(a)}
                    onCheckedChange={() => toggleAmenity(a)}
                  />
                  <span className="text-sm">{AMENITY_LABEL[a]}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">Foto</h2>
                <p className="text-sm text-muted-foreground">
                  Tempel URL gambar. Versi final akan support upload langsung.
                </p>
              </div>
              <Button type="button" variant="outline" onClick={addPhoto}>
                <ImagePlus className="mr-1.5 h-4 w-4" />
                Tambah
              </Button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {state.photos.map((url, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-muted/20 p-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    {url ? (
                      <Image
                        src={url}
                        alt={`Foto ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Belum ada foto
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={url}
                      onChange={(e) => setPhoto(i, e.target.value)}
                      placeholder="https://…"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePhoto(i)}
                      disabled={state.photos.length <= 1}
                      aria-label="Hapus foto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky action card */}
        <aside>
          <div className="lg:sticky lg:top-6 space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
            <div>
              <h3 className="font-bold">Siap dipublikasikan?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Listing akan langsung tayang di halaman pencarian setelah
                disimpan.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Button
                type="submit"
                className="h-11 w-full font-semibold"
                disabled={submitting}
              >
                {submitting
                  ? "Menyimpan…"
                  : mode === "new"
                    ? "Simpan & publikasikan"
                    : "Simpan perubahan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full"
                onClick={() => router.push("/admin/listings")}
              >
                Batal
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
