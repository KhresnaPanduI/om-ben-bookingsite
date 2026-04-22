"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ListingGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl h-[240px] sm:h-[420px]">
        <button
          onClick={() => openAt(0)}
          className="relative col-span-4 row-span-2 sm:col-span-2 cursor-zoom-in overflow-hidden"
        >
          <Image
            src={photos[0]}
            alt={title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform hover:scale-[1.02]"
          />
        </button>
        {photos.slice(1, 5).map((p, i) => (
          <button
            key={p + i}
            onClick={() => openAt(i + 1)}
            className="relative hidden sm:block overflow-hidden cursor-zoom-in"
          >
            <Image
              src={p}
              alt={`${title} — foto ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-2 sm:p-4">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={photos[idx]}
              alt={`${title} — foto ${idx + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs">
              {idx + 1} / {photos.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
