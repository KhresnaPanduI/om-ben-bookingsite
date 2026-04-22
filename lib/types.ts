export type Destination = "bali" | "yogyakarta" | "bandung" | "lombok";

export type PropertyType = "villa" | "homestay" | "guesthouse" | "bungalow";

export type Amenity =
  | "wifi"
  | "ac"
  | "pool"
  | "kitchen"
  | "parking"
  | "breakfast"
  | "washing_machine"
  | "tv"
  | "workspace"
  | "pet_friendly"
  | "beachfront"
  | "mountain_view";

export const AMENITY_LABEL: Record<Amenity, string> = {
  wifi: "WiFi",
  ac: "AC",
  pool: "Kolam renang",
  kitchen: "Dapur",
  parking: "Parkir gratis",
  breakfast: "Sarapan",
  washing_machine: "Mesin cuci",
  tv: "TV",
  workspace: "Ruang kerja",
  pet_friendly: "Boleh bawa hewan",
  beachfront: "Tepi pantai",
  mountain_view: "View gunung",
};

export const DESTINATION_LABEL: Record<Destination, string> = {
  bali: "Bali",
  yogyakarta: "Yogyakarta",
  bandung: "Bandung",
  lombok: "Lombok",
};

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  villa: "Villa",
  homestay: "Homestay",
  guesthouse: "Guesthouse",
  bungalow: "Bungalow",
};

export type Host = {
  name: string;
  avatar: string;
  joinedYear: number;
};

export type Review = {
  id: string;
  listingId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export type Listing = {
  id: string;
  slug: string;
  title: string;
  description: string;
  destination: Destination;
  city: string;
  propertyType: PropertyType;
  pricePerNight: number;
  currency: "IDR";
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: Amenity[];
  photos: string[];
  rating: number;
  reviewCount: number;
  host: Host;
  coords: { lat: number; lng: number };
};

export type PaymentMethod =
  | "qris"
  | "gopay"
  | "ovo"
  | "bank_transfer"
  | "credit_card";

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  qris: "QRIS",
  gopay: "GoPay",
  ovo: "OVO",
  bank_transfer: "Transfer Bank",
  credit_card: "Kartu Kredit",
};

export type SearchFilters = {
  destination?: Destination | "all";
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyTypes?: PropertyType[];
  amenities?: Amenity[];
  minRating?: number;
};

export type Booking = {
  id: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  paymentMethod: PaymentMethod;
  totals: {
    nights: number;
    subtotal: number;
    serviceFee: number;
    total: number;
  };
  status: "confirmed";
  createdAt: string;
};
