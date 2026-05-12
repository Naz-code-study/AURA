import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mock-data";

export async function GET() {
  const sortedProducts = [...mockProducts].sort((a, b) => {
    const aRisk = a.stock / (a.daily_avg_sales ?? 1);
    const bRisk = b.stock / (b.daily_avg_sales ?? 1);
    return aRisk - bRisk;
  });
  return NextResponse.json(sortedProducts);
}
