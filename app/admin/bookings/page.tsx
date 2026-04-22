import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { listings } from "@/lib/data/listings";
import { formatDateID, formatIDR } from "@/lib/format";

type MockBooking = {
  id: string;
  guestName: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
};

const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: "BK-8X2K-A9F3",
    guestName: "Rizky Pratama",
    listingId: "1",
    checkIn: "2026-05-12",
    checkOut: "2026-05-15",
    guests: 4,
    total: 8820000,
    status: "confirmed",
  },
  {
    id: "BK-7P1M-B2C8",
    guestName: "Maya Sari",
    listingId: "2",
    checkIn: "2026-05-08",
    checkOut: "2026-05-10",
    guests: 2,
    total: 1365000,
    status: "pending",
  },
  {
    id: "BK-9R4N-C7D1",
    guestName: "Adit Kurnia",
    listingId: "11",
    checkIn: "2026-04-28",
    checkOut: "2026-05-02",
    guests: 4,
    total: 2856000,
    status: "completed",
  },
  {
    id: "BK-5T3H-D8E2",
    guestName: "Dinda Rahmawati",
    listingId: "7",
    checkIn: "2026-06-01",
    checkOut: "2026-06-05",
    guests: 6,
    total: 5040000,
    status: "confirmed",
  },
  {
    id: "BK-3Y9L-E4F6",
    guestName: "Farhan Hakim",
    listingId: "13",
    checkIn: "2026-05-20",
    checkOut: "2026-05-23",
    guests: 4,
    total: 6615000,
    status: "cancelled",
  },
];

const STATUS_STYLES: Record<MockBooking["status"], { label: string; cls: string }> =
  {
    confirmed: {
      label: "Terkonfirmasi",
      cls: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    pending: {
      label: "Menunggu",
      cls: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    },
    completed: {
      label: "Selesai",
      cls: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    },
    cancelled: {
      label: "Dibatalkan",
      cls: "bg-red-100 text-red-700 hover:bg-red-100",
    },
  };

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Pemesanan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola semua reservasi yang masuk untuk properti Anda.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Kode</th>
                <th className="px-4 py-3">Tamu</th>
                <th className="px-4 py-3">Properti</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_BOOKINGS.map((b) => {
                const listing = listings.find((l) => l.id === b.listingId);
                const s = STATUS_STYLES[b.status];
                return (
                  <tr key={b.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-mono text-xs">{b.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold">{b.guestName}</p>
                          <p className="text-xs text-muted-foreground">
                            {b.guests} tamu
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="max-w-[200px] truncate font-medium">
                        {listing?.title ?? "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {listing?.city}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {formatDateID(b.checkIn, "d MMM")} –{" "}
                        {formatDateID(b.checkOut, "d MMM yyyy")}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold">
                      {formatIDR(b.total)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={s.cls}>{s.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
