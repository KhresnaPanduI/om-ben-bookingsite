import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Staycation.id</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/search"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Jelajahi
          </Link>
          <Link
            href="/admin"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:inline"
          >
            Admin
          </Link>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Jadi Host
          </Button>
          <Button size="sm">Masuk</Button>
        </nav>
      </div>
    </header>
  );
}
