"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AMENITY_LABEL,
  PROPERTY_TYPE_LABEL,
  type Amenity,
  type PropertyType,
} from "@/lib/types";
import { formatIDRShort } from "@/lib/format";

export type FiltersState = {
  priceRange: [number, number];
  propertyTypes: PropertyType[];
  amenities: Amenity[];
  minRating: number;
};

export const DEFAULT_FILTERS: FiltersState = {
  priceRange: [200000, 6000000],
  propertyTypes: [],
  amenities: [],
  minRating: 0,
};

const AMENITIES_TO_SHOW: Amenity[] = [
  "wifi",
  "ac",
  "pool",
  "kitchen",
  "parking",
  "breakfast",
  "beachfront",
  "mountain_view",
];

export function FilterSidebar({
  filters,
  onChange,
}: {
  filters: FiltersState;
  onChange: (f: FiltersState) => void;
}) {
  const togglePropertyType = (pt: PropertyType) => {
    onChange({
      ...filters,
      propertyTypes: filters.propertyTypes.includes(pt)
        ? filters.propertyTypes.filter((x) => x !== pt)
        : [...filters.propertyTypes, pt],
    });
  };

  const toggleAmenity = (a: Amenity) => {
    onChange({
      ...filters,
      amenities: filters.amenities.includes(a)
        ? filters.amenities.filter((x) => x !== a)
        : [...filters.amenities, a],
    });
  };

  return (
    <aside className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Rentang harga</h3>
          <button
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-xs text-primary hover:underline"
          >
            Reset
          </button>
        </div>
        <div className="mt-4 px-1">
          <Slider
            value={filters.priceRange}
            min={200000}
            max={6000000}
            step={50000}
            onValueChange={(v) => {
              const arr = Array.isArray(v) ? v : [v, v];
              onChange({
                ...filters,
                priceRange: [arr[0], arr[1]] as [number, number],
              });
            }}
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{formatIDRShort(filters.priceRange[0])}</span>
            <span>{formatIDRShort(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Tipe properti</h3>
        <div className="space-y-2.5">
          {(Object.keys(PROPERTY_TYPE_LABEL) as PropertyType[]).map((pt) => (
            <div key={pt} className="flex items-center gap-2">
              <Checkbox
                id={`pt-${pt}`}
                checked={filters.propertyTypes.includes(pt)}
                onCheckedChange={() => togglePropertyType(pt)}
              />
              <Label htmlFor={`pt-${pt}`} className="font-normal cursor-pointer">
                {PROPERTY_TYPE_LABEL[pt]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Fasilitas</h3>
        <div className="space-y-2.5">
          {AMENITIES_TO_SHOW.map((a) => (
            <div key={a} className="flex items-center gap-2">
              <Checkbox
                id={`a-${a}`}
                checked={filters.amenities.includes(a)}
                onCheckedChange={() => toggleAmenity(a)}
              />
              <Label htmlFor={`a-${a}`} className="font-normal cursor-pointer">
                {AMENITY_LABEL[a]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Rating minimum</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: r })}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                filters.minRating === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:border-primary/40"
              }`}
            >
              {r === 0 ? "Semua" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
