"use client";

import { useEffect, useState } from "react";
import { ProductForm } from "@/components/products/ProductForm";
import { AiCampaignCard } from "@/components/products/AiCampaignCard";
import { Product } from "@/types";

export default function ProductsPage() {
  const [aiResult, setAiResult] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsAndAnalyze = async () => {
      try {
        const productResponse = await fetch("/api/products");
        const productData: Product[] = await productResponse.json();
        setProducts(productData);

        const analysisResponse = await fetch("http://localhost:8001/satici-asistani", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        const analysisData = await analysisResponse.json();
        setAiResult(analysisData);
      } catch (err) {
        console.error("Analiz yüklenemedi", err);
      }
    };
    fetchProductsAndAnalyze();
  }, []);

  const featuredId = products[0]?.id ?? "PRD-1001";

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Akıllı AI Paneli */}
      {aiResult && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200 shadow-sm">
          <h2 className="text-xl font-bold text-purple-900 mb-2">✨ AI Asistan Analizi</h2>
          <p className="text-purple-800 font-medium italic mb-4">"{aiResult.analiz_notu}"</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 p-3 rounded-lg">
              <h3 className="font-bold text-red-700 underline">Kritik Stok Uyarıları:</h3>
              <ul className="list-disc ml-5 text-sm">{aiResult.kritik_stoklar.map((s:any) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="bg-white/50 p-3 rounded-lg">
              <h3 className="font-bold text-green-700 underline">Fırsat Kampanyası:</h3>
              <p className="text-sm">{aiResult.kampanya_fikri}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <ProductForm />
        <AiCampaignCard productId={featuredId} />
      </div>
    </div>
  );
}