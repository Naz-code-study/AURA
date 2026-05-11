import type { Order, Product } from "@/types";

export interface StockAlert {
  product: Product;
  alertType: "critical_low" | "trending_high" | "no_movement";
  message: string;
  urgency: "high" | "medium" | "low";
  salesVelocity: number;
  daysUntilStockout: number | null;
}

export function analyzeStockAlerts(
  products: Product[],
  orders: Order[],
): StockAlert[] {
  const alerts: StockAlert[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

  for (const product of products) {
    const recentOrders = orders.filter((o) => {
      const orderDate = new Date(o.date);
      return o.productId === product.id && orderDate >= threeMonthsAgo;
    });

    const totalSold = recentOrders.reduce((sum, o) => sum + o.quantity, 0);
    const monthlyVelocity = totalSold / 3;
    const daysUntilStockout =
      monthlyVelocity > 0
        ? Math.floor((product.stock / monthlyVelocity) * 30)
        : null;

    if (
      monthlyVelocity >= 10 &&
      daysUntilStockout !== null &&
      daysUntilStockout <= 30
    ) {
      alerts.push({
        product,
        alertType: "trending_high",
        urgency: daysUntilStockout <= 10 ? "high" : "medium",
        message: `"${product.name}" son 3 ayda aylık ortalama ${Math.round(monthlyVelocity)} adet satıyor. Mevcut stok yaklaşık ${daysUntilStockout} gün içinde tükenecek!`,
        salesVelocity: monthlyVelocity,
        daysUntilStockout,
      });
      continue;
    }

    if (product.stock <= 5 && monthlyVelocity > 0) {
      alerts.push({
        product,
        alertType: "critical_low",
        urgency: "high",
        message: `"${product.name}" stoku kritik seviyede: sadece ${product.stock} adet kaldı.`,
        salesVelocity: monthlyVelocity,
        daysUntilStockout,
      });
      continue;
    }

    if (totalSold === 0 && product.stock > 20) {
      alerts.push({
        product,
        alertType: "no_movement",
        urgency: "low",
        message: `"${product.name}" son 3 ayda hiç satılmadı. Kampanya oluşturmayı düşünebilirsiniz.`,
        salesVelocity: 0,
        daysUntilStockout: null,
      });
    }
  }

  return alerts.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.urgency] - order[b.urgency];
  });
}
