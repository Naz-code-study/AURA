# AURA — AI destekli e-ticaret paneli

Kadın girişimcilere yönelik, pembe–mor renk paleti ve AI yardımcılarıyla tasarlanmış Next.js 14 (App Router) yönetim arayüzü.

## Çalıştırma

```bash
cd aura
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın. Ana rota `/dashboard` sayfasına yönlendirilir.

Üretim derlemesi:

```bash
npm run build
npm start
```

## Backend bağlantısı (`lib/api.ts`)

Şu an tüm fonksiyonlar `lib/mock-data.ts` içindeki verileri döndürür. Gerçek API’ye geçerken:

1. Proje kökünde `.env.local` içinde `NEXT_PUBLIC_API_URL` tanımlayın (örnek aşağıda).
2. `lib/api.ts` içindeki her fonksiyonda `fetch` ile ilgili endpoint’e istek atın; dönüş tipleri `types/index.ts` ile uyumlu kalsın.
3. Yorum satırlarında belirtilen HTTP yöntemi ve yol:

| Fonksiyon | Endpoint (hedef) |
|-----------|------------------|
| `getOrders` | `GET /api/orders` |
| `getProducts` | `GET /api/products` |
| `createProduct` | `POST /api/products` |
| `getConversations` | `GET /api/chat/conversations` |
| `getAiDraft` | `POST /api/chat/ai-draft` |
| `getShipments` | `GET /api/shipping/shipments` |
| `getCampaignSuggestion` | `POST /api/ai/campaign-suggestion` |

## Ortam değişkenleri

`.env.local` örneği:

```bash
# REST API tabanı (isteğe bağlı önek)
NEXT_PUBLIC_API_URL=https://api.example.com

# Sunucu tarafında Anthropic (veya benzeri) çağrıları için — asla istemciye sızdırmayın
ANTHROPIC_API_KEY=sk-ant-api03-...
```

İstemci bileşenleri yalnızca `NEXT_PUBLIC_*` değişkenlerini görebilir; gizli anahtarları yalnızca Route Handler / Server Action içinde kullanın.

## Teknolojiler

Next.js 14, React 18, TypeScript, Tailwind CSS, Recharts, Lucide React.
# AURA AI — Akıllı İş Ortağı ve E-Ticaret Ekosistemi 🚀

Kadın girişimcileri güçlendirmek için tasarlanmış, Google Gemini tabanlı otonom yönetim paneli.

## 📊 Ekran Görüntüleri

### Genel Bakış ve Analitik Dashboard
İşletmenizin satış trendlerini ve stok durumunu tek bir ekranda proaktif olarak izleyin.

![Genel Bakış Dashboard](WhatsApp%20Image%202026-05-13%20at%2021.24.31.jpeg)

### Akıllı Envanter ve AI Analizi
Gemini AI, stok hızınızı analiz ederek kritik eşiklerde "Acil Sipariş Ver" gibi aksiyon önerileri sunar.

![Envanter Analizi](WhatsApp%20Image%202026-05-13%20at%2018.51.12.jpeg)

### Duygu Analizli Müşteri Sohbetleri
Müşteri mesajlarındaki tonu (Kızgın, Mutlu, Nötr) analiz eden ve kargo API verileriyle otomatik yanıt taslakları oluşturan AI asistanı.

![AI Sohbet Paneli](WhatsApp%20Image%202026-05-13%20at%2021.24.05.jpeg)

### Akıllı Kargo Takibi
Gecikme risklerini önceden tespit edin ve müşterileriniz şikayet etmeden onları bilgilendirin.

![Kargo Takip Sistemi](WhatsApp%20Image%202026-05-13%20at%2021.23.52.jpeg)
