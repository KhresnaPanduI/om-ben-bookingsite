import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Home className="h-3.5 w-3.5" />
              </span>
              Staycation.id
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Booking villa, homestay & guesthouse terbaik di Indonesia.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Dukungan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Pusat Bantuan</li>
              <li>Kebijakan Pembatalan</li>
              <li>Keamanan Tamu</li>
              <li>Kontak Kami</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Komunitas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Blog</li>
              <li>Tips Traveling</li>
              <li>Program Referral</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Staycation.id · Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
