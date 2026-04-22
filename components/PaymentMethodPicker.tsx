"use client";

import {
  PAYMENT_METHOD_LABEL,
  type PaymentMethod,
} from "@/lib/types";
import { CreditCard, Landmark, QrCode, Smartphone } from "lucide-react";

const METHODS: { value: PaymentMethod; desc: string; icon: React.ReactNode }[] = [
  {
    value: "qris",
    desc: "Scan & bayar dengan aplikasi apapun",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    value: "gopay",
    desc: "Bayar pakai saldo GoPay",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    value: "ovo",
    desc: "Bayar pakai saldo OVO",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    value: "bank_transfer",
    desc: "BCA, Mandiri, BNI, BRI (VA otomatis)",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    value: "credit_card",
    desc: "Visa, Mastercard, JCB",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

export function PaymentMethodPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
}) {
  return (
    <div className="grid gap-2">
      {METHODS.map((m) => {
        const active = value === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
              active
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "hover:border-primary/30 hover:bg-muted/30"
            }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {m.icon}
            </span>
            <span className="flex-1">
              <span className="block font-semibold">
                {PAYMENT_METHOD_LABEL[m.value]}
              </span>
              <span className="block text-xs text-muted-foreground">
                {m.desc}
              </span>
            </span>
            <span
              className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                active
                  ? "border-primary bg-primary ring-4 ring-primary/20"
                  : "border-muted-foreground/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
