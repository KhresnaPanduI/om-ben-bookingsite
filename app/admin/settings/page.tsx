import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Pengaturan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola profil host dan preferensi akun Anda.
        </p>
      </div>

      <section className="rounded-2xl border bg-card p-5 sm:p-6">
        <h2 className="font-bold">Profil host</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="host-name">Nama</Label>
            <Input id="host-name" defaultValue="Om Ben" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="host-email">Email</Label>
            <Input
              id="host-email"
              type="email"
              defaultValue="ombentrader@email.com"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="host-phone">Nomor HP</Label>
            <Input
              id="host-phone"
              type="tel"
              defaultValue="+62 812 0000 0000"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="host-whatsapp">WhatsApp Business</Label>
            <Input
              id="host-whatsapp"
              type="tel"
              defaultValue="+62 812 0000 0000"
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="host-bio">Bio singkat</Label>
            <Textarea
              id="host-bio"
              defaultValue="Saya pemilik beberapa villa dan homestay di Bali & Jogja. Welcome!"
              className="mt-1.5 min-h-[80px]"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-5 sm:p-6">
        <h2 className="font-bold">Informasi pembayaran</h2>
        <p className="text-sm text-muted-foreground">
          Rekening untuk menerima pembayaran dari tamu.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="bank">Bank</Label>
            <Input id="bank" defaultValue="BCA" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="acc-number">Nomor rekening</Label>
            <Input
              id="acc-number"
              defaultValue="1234567890"
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="acc-name">Nama pemilik</Label>
            <Input id="acc-name" defaultValue="Om Ben" className="mt-1.5" />
          </div>
        </div>
      </section>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="outline">Batal</Button>
        <Button>Simpan perubahan</Button>
      </div>
    </div>
  );
}
