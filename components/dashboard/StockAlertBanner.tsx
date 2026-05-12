"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { analyzeStockAlerts } from "@/lib/stock-analysis";
import type { Order, Product } from "@/types";

const SESSION_KEY = "aura-dashboard-stock-banner-dismissed";

export function StockAlertBanner({
  orders,
  products,
}: {
  orders: Order[];
  products: Product[];
}) {
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(SESSION_KEY) === "1");
    setHydrated(true);
  }, []);

  const highAlerts = useMemo(() => {
    return analyzeStockAlerts(products, orders).filter(
      (a) => a.urgency === "high",
    );
  }, [products, orders]);

  useEffect(() => {
    setIndex(0);
  }, [highAlerts.length]);

  if (!hydrated || dismissed || highAlerts.length === 0) return null;

  const current = highAlerts[index]!;
  const count = highAlerts.length;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setDismissed(true);
  };

  return (
    <div
      className="relative overflow-hidden rounded-card border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 p-4 shadow-aura"
      role="status"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-red-900">
              {count === 1 ? "Stok Uyarısı" : `${count} Kritik Stok Uyarısı`}
            </h3>
            <div className="flex items-center gap-1">
              {count > 1 && (
                <>
                  <span className="mr-1 text-xs font-medium text-red-800/80">
                    {index + 1}/{count}
                  </span>
                  <button
                    type="button"
                    aria-label="Önceki uyarı"
                    className="rounded-lg p-1 text-red-800 transition hover:bg-red-100/80"
                    onClick={() =>
                      setIndex((i) => (i - 1 + count) % count)
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Sonraki uyarı"
                    className="rounded-lg p-1 text-red-800 transition hover:bg-red-100/80"
                    onClick={() => setIndex((i) => (i + 1) % count)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                aria-label="Kapat"
                className="ml-1 rounded-lg p-1 text-red-800 transition hover:bg-red-100/80"
                onClick={dismiss}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-red-950/90">
            {current.message}
          </p>
          {current.alertType === "critical_low" &&
            current.salesVelocity > 0 && (
              <p className="mt-1 text-xs text-red-900/80">
                Son 3 ayda aylık ortalama{" "}
                {Math.round(current.salesVelocity)} satış yapılıyor.
              </p>
            )}
          <div className="mt-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
            >
              Stok Güncelle →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
