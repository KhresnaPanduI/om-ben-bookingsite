import type { Review } from "@/lib/types";

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`;

const AVATARS = [
  avatar("1507003211169-0a1dd7228f2d"),
  avatar("1494790108377-be9c29b29330"),
  avatar("1599566150163-29194dcaad36"),
  avatar("1438761681033-6461ffad8d80"),
  avatar("1500648767791-00dcc994a43e"),
  avatar("1534528741775-53994a69daeb"),
];

const SAMPLE_COMMENTS = [
  "Tempatnya bersih banget, host-nya ramah. Recommended buat keluarga!",
  "Lokasi strategis, dekat kemana-mana. Kamarnya nyaman dan bed-nya enak.",
  "View-nya cakep parah, pas buat foto-foto. Bakalan balik lagi!",
  "Pelayanan ramah, sarapan enak. Anak-anak juga betah di sini.",
  "Bersih, rapi, dan sesuai foto. Check-in smooth. Nilai 5/5 lah.",
  "Villanya lebih bagus dari ekspektasi. Pool-nya bersih, AC dingin.",
  "Tenang banget, pas buat healing dari kota. Staff helpful.",
  "Harga worth it untuk fasilitas segini. Bakalan rekomen ke temen.",
];

const AUTHORS = [
  "Rizky P.",
  "Maya S.",
  "Adit K.",
  "Dinda R.",
  "Farhan H.",
  "Sari L.",
  "Bintang W.",
  "Nadia P.",
  "Andre M.",
  "Kirana D.",
  "Fajar A.",
  "Lia H.",
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function getReviewsForListing(listingId: string): Review[] {
  const seed = parseInt(listingId, 10) || 1;
  const count = 4 + (seed % 3); // 4-6 reviews
  return Array.from({ length: count }).map((_, i) => {
    const idx = (seed * 3 + i * 7) % SAMPLE_COMMENTS.length;
    const authorIdx = (seed + i * 2) % AUTHORS.length;
    const avatarIdx = (seed + i) % AVATARS.length;
    const month = ((seed + i) % 12) + 1;
    const year = 2025 - (i % 2);
    return {
      id: `${listingId}-r${i}`,
      listingId,
      author: AUTHORS[authorIdx],
      avatar: AVATARS[avatarIdx],
      rating: [5, 5, 4, 5, 5, 4][i % 6],
      date: `${year}-${pad(month)}-${pad(((seed + i * 3) % 28) + 1)}`,
      comment: SAMPLE_COMMENTS[idx],
    };
  });
}
