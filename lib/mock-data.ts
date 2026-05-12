import type {
  CampaignSuggestion,
  Conversation,
  MonthlySalesPoint,
  Order,
  OrderStatus,
  Product,
  Shipment,
} from "@/types";

const pic = (seed: string, w = 200, h = 200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const mockProducts: Product[] = [
  {
    id: "PRD-1001",
    name: "Akdeniz Termal Çorap",
    category: "Çorap",
    price: 189,
    stock: 156,
    daily_avg_sales: 1.5,
    description: "Yumuşak pamuk karışımı, kış ayları için ideal termal çorap.",
    imageUrl: pic("aura-c1"),
    active: true,
  },
  {
    id: "PRD-1002",
    name: "İpek Dokulu Şal — Gece Laciverti",
    category: "Şal",
    price: 349,
    stock: 8,
    daily_avg_sales: 4.2,
    description: "Hafif ipek hissi, günlük ve davet kombinlerine uygun.",
    imageUrl: pic("aura-s1"),
    active: true,
  },
  {
    id: "PRD-1003",
    name: "Minimal Altın Küpe Seti",
    category: "Takı",
    price: 425,
    stock: 42,
    daily_avg_sales: 0.5,
    description: "Hipoalerjenik kaplama, 3'lü set.",
    imageUrl: pic("aura-j1"),
    active: true,
  },
  {
    id: "PRD-1004",
    name: "El Örgüsü Yün Çorap",
    category: "Çorap",
    price: 129,
    stock: 5,
    daily_avg_sales: 0.3,
    description: "El emeği, sıcak tutan kalın örgü.",
    imageUrl: pic("aura-c2"),
    active: true,
  },
  {
    id: "PRD-1005",
    name: "Keten Omuz Çantası",
    category: "Çanta",
    price: 599,
    stock: 22,
    daily_avg_sales: 2.2,
    description: "Sürdürülebilir keten, laptop bölmesi.",
    imageUrl: pic("aura-b1"),
    active: true,
  },
  {
    id: "PRD-1006",
    name: "Bohem Püsküllü Şal",
    category: "Şal",
    price: 279,
    stock: 33,
    daily_avg_sales: 1.0,
    description: "Renkli desen, festival ve tatil kombinleri.",
    imageUrl: pic("aura-s2"),
    active: false,
  },
  {
    id: "PRD-1007",
    name: "Gümüş Yıldız Kolye",
    category: "Takı",
    price: 199,
    stock: 67,
    daily_avg_sales: 0.7,
    description: "925 ayar gümüş, ince zincir.",
    imageUrl: pic("aura-j2"),
    active: true,
  },
  {
    id: "PRD-1008",
    name: "Pamuklu Sneaker Çorabı (3'lü)",
    category: "Çorap",
    price: 149,
    stock: 120,
    daily_avg_sales: 1.8,
    description: "Nefes alan pamuk, pastel tonlar.",
    imageUrl: pic("aura-c3"),
    active: true,
  },
];

function mkOrder(
  id: string,
  orderNumber: string,
  customerName: string,
  custSeed: string,
  product: Product,
  quantity: number,
  date: string,
  status: OrderStatus,
): Order {
  return {
    id,
    orderNumber,
    customer: { name: customerName, avatarUrl: pic(custSeed, 40, 40) },
    items: [
      {
        id: "L1",
        name: product.name,
        imageUrl: product.imageUrl,
        category: product.category,
        quantity,
      },
    ],
    category: product.category,
    totalQuantity: quantity,
    productId: product.id,
    quantity,
    date,
    status,
  };
}

const ORDER_CUSTOMERS = [
  ["Elif Yılmaz", "cust-elif"],
  ["Ayşe Kaya", "cust-ayse"],
  ["Zeynep Demir", "cust-zey"],
  ["Merve Arslan", "cust-mer"],
  ["Selin Öztürk", "cust-sel"],
  ["Burcu Şahin", "cust-bur"],
  ["Deniz Aydın", "cust-den"],
  ["Ceren Polat", "cust-cer"],
  ["Gizem Koç", "cust-giz"],
  ["İrem Çelik", "cust-ire"],
] as const;

function pickCust(i: number) {
  const [name, seed] = ORDER_CUSTOMERS[i % ORDER_CUSTOMERS.length]!;
  return { name, seed };
}

/**
 * Son 3 ay satış hacimleri (stok analizi):
 * PRD-1001 termal çorap → 45 adet | PRD-1002 şal → 30 | PRD-1006 bohem şal → 5 | PRD-1003 küpe → 9 | PRD-1004 → 0
 */
function buildAnalyticsOrders(): Order[] {
  const out: Order[] = [];
  let n = 0;
  const thermalDates = [
    "2026-05-09",
    "2026-05-07",
    "2026-05-05",
    "2026-04-28",
    "2026-04-15",
    "2026-04-02",
    "2026-03-18",
    "2026-03-05",
    "2026-02-08",
  ];
  for (let i = 0; i < 9; i++) {
    const { name, seed } = pickCust(n++);
    out.push(
      mkOrder(
        `ORD-A1-${i}`,
        `A-26A${String(100 + i)}`,
        name,
        seed,
        mockProducts[0]!,
        5,
        thermalDates[i]!,
        "delivered",
      ),
    );
  }
  const scarfDates = [
    "2026-05-08",
    "2026-05-04",
    "2026-04-20",
    "2026-04-10",
    "2026-03-22",
    "2026-02-12",
  ];
  for (let i = 0; i < 6; i++) {
    const { name, seed } = pickCust(n++);
    out.push(
      mkOrder(
        `ORD-A2-${i}`,
        `A-26B${String(100 + i)}`,
        name,
        seed,
        mockProducts[1]!,
        5,
        scarfDates[i]!,
        "delivered",
      ),
    );
  }
  const bohemDates = [
    "2026-05-06",
    "2026-04-25",
    "2026-04-08",
    "2026-03-12",
    "2026-02-20",
  ];
  for (let i = 0; i < 5; i++) {
    const { name, seed } = pickCust(n++);
    out.push(
      mkOrder(
        `ORD-A6-${i}`,
        `A-26F${String(100 + i)}`,
        name,
        seed,
        mockProducts[5]!,
        1,
        bohemDates[i]!,
        "delivered",
      ),
    );
  }
  const jewelDates = ["2026-05-03", "2026-04-05", "2026-02-18"];
  for (let i = 0; i < 3; i++) {
    const { name, seed } = pickCust(n++);
    out.push(
      mkOrder(
        `ORD-A3-${i}`,
        `A-26C${String(100 + i)}`,
        name,
        seed,
        mockProducts[2]!,
        3,
        jewelDates[i]!,
        "delivered",
      ),
    );
  }
  return out;
}

const showcaseOrders: Order[] = [
  mkOrder(
    "ORD-501",
    "A-240501",
    "Elif Yılmaz",
    "cust-elif",
    mockProducts[7]!,
    2,
    "2026-05-10",
    "shipping",
  ),
  mkOrder(
    "ORD-502",
    "A-240502",
    "Ayşe Kaya",
    "cust-ayse",
    mockProducts[4]!,
    1,
    "2026-05-09",
    "received",
  ),
  mkOrder(
    "ORD-504",
    "A-240504",
    "Merve Arslan",
    "cust-mer",
    mockProducts[7]!,
    4,
    "2026-05-07",
    "shipping",
  ),
  mkOrder(
    "ORD-505",
    "A-240505",
    "Selin Öztürk",
    "cust-sel",
    mockProducts[4]!,
    1,
    "2026-05-06",
    "received",
  ),
  mkOrder(
    "ORD-507",
    "A-240507",
    "Deniz Aydın",
    "cust-den",
    mockProducts[6]!,
    1,
    "2026-05-04",
    "shipping",
  ),
  mkOrder(
    "ORD-508",
    "A-240508",
    "Ceren Polat",
    "cust-cer",
    mockProducts[7]!,
    3,
    "2026-05-03",
    "received",
  ),
  mkOrder(
    "ORD-509",
    "A-240509",
    "Gizem Koç",
    "cust-giz",
    mockProducts[4]!,
    2,
    "2026-05-02",
    "delivered",
  ),
  mkOrder(
    "ORD-510",
    "A-240510",
    "İrem Çelik",
    "cust-ire",
    mockProducts[6]!,
    1,
    "2026-05-01",
    "shipping",
  ),
];

export const mockOrders: Order[] = [
  ...buildAnalyticsOrders(),
  ...showcaseOrders,
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const mockMonthlySales: MonthlySalesPoint[] = [
  { month: "Ara", Çorap: 210, Şal: 88, Takı: 54, Diğer: 32 },
  { month: "Oca", Çorap: 198, Şal: 92, Takı: 61, Diğer: 28 },
  { month: "Şub", Çorap: 225, Şal: 101, Takı: 58, Diğer: 35 },
  { month: "Mar", Çorap: 240, Şal: 110, Takı: 72, Diğer: 40 },
  { month: "Nis", Çorap: 268, Şal: 125, Takı: 80, Diğer: 44 },
  { month: "May", Çorap: 295, Şal: 138, Takı: 86, Diğer: 48 },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    customerName: "Elif Yılmaz",
    avatarUrl: pic("cust-elif", 48, 48),
    lastPreview: "Kargo ne zaman çıkar?",
    lastTime: "14:02",
    unreadCount: 2,
    orderCount: 4,
    lastOrderDate: "10 Mayıs 2026",
    messages: [
      {
        id: "m1",
        role: "customer",
        text: "Merhaba, siparişim hâlâ hazırlanıyor görünüyor. Yarın doğum günü için lazım.",
        time: "13:55",
        aiDraft:
          "Merhaba Elif Hanım, siparişinizi önceliklendirdik. Bugün kargoya verilecek ve yarın İstanbul içi teslimat için yurtiçi hızlı seçeneğini işaretledik. Takip numarasını birazdan paylaşacağım.",
      },
      {
        id: "m2",
        role: "owner",
        text: "Merhaba! Kontrol edip size dönüş yapıyorum.",
        time: "13:58",
      },
      {
        id: "m3",
        role: "customer",
        text: "Kargo ne zaman çıkar?",
        time: "14:02",
        aiDraft:
          "Kargonuz bugün 17:00’ye kadar teslim edilecek şekilde hazırlanıyor; çıkış olduğunda size SMS ile bilgi verilecek.",
      },
    ],
  },
  {
    id: "c2",
    customerName: "Ayşe Kaya",
    avatarUrl: pic("cust-ayse", 48, 48),
    lastPreview: "Renk seçeneği var mı?",
    lastTime: "Dün",
    unreadCount: 0,
    orderCount: 2,
    lastOrderDate: "9 Mayıs 2026",
    messages: [
      {
        id: "m1",
        role: "customer",
        text: "Gece laciverti şalın açık mavi tonu da var mı?",
        time: "Dün 10:12",
        aiDraft:
          "Şu an stokta gece laciverti ve füme tonlarımız var; açık mavi tonu önümüzdeki hafta gelecek. İsterseniz gelince haber verelim.",
      },
    ],
  },
  {
    id: "c3",
    customerName: "Zeynep Demir",
    avatarUrl: pic("cust-zey", 48, 48),
    lastPreview: "Kutu ezilmiş geldi...",
    lastTime: "11:40",
    unreadCount: 1,
    orderCount: 6,
    lastOrderDate: "8 Mayıs 2026",
    messages: [
      {
        id: "m1",
        role: "customer",
        text: "Ürünüm kutusu tamamen ezilmiş geldi, içindeki küpenin taşı da kırılmış. Çok hayal kırıklığına uğradım, bu kabul edilemez.",
        time: "11:38",
        aiDraft:
          "Zeynep Hanım, yaşattığımız hayal kırıklığı için içtenlikle özür dilerim. Hemen ücretsiz değişim göndereceğim ve kargo hasarını firmamıza yansıtacağız. İsterseniz ücret iadesi de yapabiliriz; hangisini tercih ettiğinizi yazmanız yeterli.",
      },
    ],
  },
  {
    id: "c4",
    customerName: "Merve Arslan",
    avatarUrl: pic("cust-mer", 48, 48),
    lastPreview: "Teşekkürler, harika paketleme 💜",
    lastTime: "Pzt",
    unreadCount: 0,
    orderCount: 1,
    lastOrderDate: "7 Mayıs 2026",
    messages: [
      {
        id: "m1",
        role: "customer",
        text: "Teşekkürler, harika paketleme 💜",
        time: "Pzt 18:22",
      },
      {
        id: "m2",
        role: "owner",
        text: "Biz teşekkür ederiz, iyi günlerde kullanın!",
        time: "Pzt 18:30",
      },
    ],
  },
  {
    id: "c5",
    customerName: "Selin Öztürk",
    avatarUrl: pic("cust-sel", 48, 48),
    lastPreview: "İade süreci nasıl işliyor?",
    lastTime: "09:05",
    unreadCount: 1,
    orderCount: 3,
    lastOrderDate: "6 Mayıs 2026",
    messages: [
      {
        id: "m1",
        role: "customer",
        text: "Çanta biraz büyük geldi, iade süreci nasıl işliyor?",
        time: "09:05",
        aiDraft:
          "14 gün içinde etiketli ve kullanılmamış ürünü ücretsiz iade kargo koduyla gönderebilirsiniz. Size özel iade linkini şimdi iletiyorum.",
      },
    ],
  },
];

export const mockShipments: Shipment[] = [
  {
    id: "SH-01",
    customerName: "Elif Yılmaz",
    orderNumber: "A-240501",
    productName: "Akdeniz Termal Çorap",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123690",
    currentStep: "out_for_delivery",
    delayed: false,
  },
  {
    id: "SH-02",
    customerName: "Ayşe Kaya",
    orderNumber: "A-240502",
    productName: "İpek Dokulu Şal — Gece Laciverti",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123691",
    currentStep: "preparing",
    delayed: false,
  },
  {
    id: "SH-03",
    customerName: "Zeynep Demir",
    orderNumber: "A-240503",
    productName: "Minimal Altın Küpe Seti",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123692",
    currentStep: "delivered",
    delayed: false,
  },
  {
    id: "SH-04",
    customerName: "Merve Arslan",
    orderNumber: "A-240504",
    productName: "El Örgüsü Yün Çorap",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123693",
    currentStep: "shipped",
    delayed: true,
  },
  {
    id: "SH-05",
    customerName: "Selin Öztürk",
    orderNumber: "A-240505",
    productName: "Keten Omuz Çantası",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123694",
    currentStep: "preparing",
    delayed: true,
  },
  {
    id: "SH-06",
    customerName: "Burcu Şahin",
    orderNumber: "A-240506",
    productName: "Bohem Püsküllü Şal",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123695",
    currentStep: "delivered",
    delayed: false,
  },
  {
    id: "SH-07",
    customerName: "Deniz Aydın",
    orderNumber: "A-240507",
    productName: "Gümüş Yıldız Kolye",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123696",
    currentStep: "out_for_delivery",
    delayed: false,
  },
  {
    id: "SH-08",
    customerName: "Ceren Polat",
    orderNumber: "A-240508",
    productName: "Pamuklu Sneaker Çorabı (3'lü)",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123697",
    currentStep: "shipped",
    delayed: false,
  },
  {
    id: "SH-09",
    customerName: "Gizem Koç",
    orderNumber: "A-240509",
    productName: "Akdeniz Termal Çorap",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123698",
    currentStep: "delivered",
    delayed: false,
  },
  {
    id: "SH-10",
    customerName: "İrem Çelik",
    orderNumber: "A-240510",
    productName: "Keten Omuz Çantası",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123699",
    currentStep: "shipped",
    delayed: false,
  },
  {
    id: "SH-11",
    customerName: "Aslı Yurt",
    orderNumber: "A-240511",
    productName: "Minimal Altın Küpe Seti",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123700",
    currentStep: "preparing",
    delayed: false,
  },
  {
    id: "SH-12",
    customerName: "Pınar Ergin",
    orderNumber: "A-240512",
    productName: "İpek Dokulu Şal — Gece Laciverti",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123701",
    currentStep: "out_for_delivery",
    delayed: true,
  },
  {
    id: "SH-13",
    customerName: "Ece Tan",
    orderNumber: "A-240513",
    productName: "Bohem Püsküllü Şal",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123702",
    currentStep: "delivered",
    delayed: false,
  },
  {
    id: "SH-14",
    customerName: "Defne Işık",
    orderNumber: "A-240514",
    productName: "Pamuklu Sneaker Çorabı (3'lü)",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123703",
    currentStep: "shipped",
    delayed: false,
  },
  {
    id: "SH-15",
    customerName: "Melis Kara",
    orderNumber: "A-240515",
    productName: "El Örgüsü Yün Çorap",
    carrier: "Yurtiçi Kargo",
    trackingNumber: "YT7845123704",
    currentStep: "delivered",
    delayed: false,
  },
];

export const mockDonutSegments = [
  { name: "Satılanlar", value: 62, color: "#D4537E" },
  { name: "Kargodakiler", value: 23, color: "#7C3AED" },
  { name: "Stokta", value: 15, color: "#D1D5DB" },
];

export const mockTotalOrdersCenter = 428;

export function getDefaultCampaignSuggestion(
  productId: string,
): CampaignSuggestion {
  return {
    headline: "✦ AI Kampanya Önerisi",
    body: `Bu ay çorap satışların %34 arttı! Şallarınla birlikte 'Kış Kombin Seti' paketi oluşturmayı düşün. Birlikte satışta ortalama %28 gelir artışı görülüyor. [Ürün ref: ${productId}]`,
    tags: ["Çapraz satış", "Sezonsal", "Yüksek potansiyel"],
    secondary: [
      {
        title: "Hafta sonu flaş indirim",
        body: "Cumartesi 12:00–18:00 arası %15 ek indirim banner’ı dönüşümü artırabilir.",
      },
      {
        title: "Sadakat mesajı",
        body: "Son 30 günde alışveriş yapanlara kişisel teşekkür + küçük hediye kodu gönder.",
      },
    ],
  };
}
