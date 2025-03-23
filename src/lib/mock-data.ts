// Mock data for the keyword workspace

// Mock keyword suggestions that would come from an API
export const mockKeywordSuggestions = [
  // Saint Bernard specific keywords
  {
    id: "sb1",
    keyword: "saint bernard",
    volume: 22000,
    difficulty: 65,
    cpc: 1.35,
    intent: "navigational"
  },
  {
    id: "sb2",
    keyword: "saintbernard shop",
    volume: 14500,
    difficulty: 58,
    cpc: 1.25,
    intent: "navigational"
  },
  {
    id: "sb3",
    keyword: "saint bernard coupon",
    volume: 3800,
    difficulty: 42,
    cpc: 0.95,
    intent: "transactional"
  },
  {
    id: "sb4",
    keyword: "winter jackets",
    volume: 18500,
    difficulty: 72,
    cpc: 2.45,
    intent: "commercial"
  },
  {
    id: "sb5",
    keyword: "north face",
    volume: 201000,
    difficulty: 85,
    cpc: 3.75,
    intent: "commercial"
  },
  {
    id: "sb6",
    keyword: "north face jackets",
    volume: 60500,
    difficulty: 76,
    cpc: 2.85,
    intent: "commercial"
  },
  {
    id: "sb7",
    keyword: "north face backpacks",
    volume: 33000,
    difficulty: 68,
    cpc: 2.15,
    intent: "commercial"
  },
  {
    id: "sb8",
    keyword: "patagonia jackets",
    volume: 49500,
    difficulty: 74,
    cpc: 2.65,
    intent: "commercial"
  },
  {
    id: "sb9",
    keyword: "snow shoes",
    volume: 27500,
    difficulty: 63,
    cpc: 1.95,
    intent: "commercial"
  },
  {
    id: "sb10",
    keyword: "discounted snow shoes",
    volume: 5400,
    difficulty: 51,
    cpc: 1.75,
    intent: "transactional"
  },
  {
    id: "sb11",
    keyword: "ski gear",
    volume: 40500,
    difficulty: 70,
    cpc: 2.55,
    intent: "commercial"
  },
  {
    id: "sb12",
    keyword: "snow boots",
    volume: 33700,
    difficulty: 67,
    cpc: 2.25,
    intent: "commercial"
  },
  {
    id: "sb13",
    keyword: "winter accessories",
    volume: 12300,
    difficulty: 55,
    cpc: 1.85,
    intent: "commercial"
  },
  {
    id: "sb14",
    keyword: "ski jackets on sale",
    volume: 8200,
    difficulty: 48,
    cpc: 1.95,
    intent: "transactional"
  },
  {
    id: "sb15",
    keyword: "best winter coats",
    volume: 15700,
    difficulty: 61,
    cpc: 2.35,
    intent: "informational"
  },
  {
    id: "sb16",
    keyword: "waterproof jackets",
    volume: 22400,
    difficulty: 64,
    cpc: 2.15,
    intent: "commercial"
  },
  {
    id: "sb17",
    keyword: "arcteryx jackets",
    volume: 30200,
    difficulty: 69,
    cpc: 2.75,
    intent: "commercial"
  },
  {
    id: "sb18",
    keyword: "columbia winter jackets",
    volume: 18900,
    difficulty: 62,
    cpc: 2.05,
    intent: "commercial"
  },
  // Original keywords
  {
    id: "kw1",
    keyword: "product customization",
    volume: 2400,
    difficulty: 37,
    cpc: 1.25,
    intent: "informational"
  },
  {
    id: "kw2",
    keyword: "custom design tool",
    volume: 1800,
    difficulty: 42,
    cpc: 1.50,
    intent: "commercial"
  },
  {
    id: "kw3",
    keyword: "personalized products",
    volume: 3100,
    difficulty: 58,
    cpc: 2.10,
    intent: "transactional"
  },
  {
    id: "kw4",
    keyword: "design templates",
    volume: 1600,
    difficulty: 33,
    cpc: 0.95,
    intent: "informational"
  },
  {
    id: "kw5",
    keyword: "product editor",
    volume: 890,
    difficulty: 29,
    cpc: 1.75,
    intent: "commercial"
  },
  {
    id: "kw6",
    keyword: "how to customize products",
    volume: 1200,
    difficulty: 25,
    cpc: 0.80,
    intent: "informational"
  },
  {
    id: "kw7",
    keyword: "best customizable products",
    volume: 1450,
    difficulty: 48,
    cpc: 1.95,
    intent: "commercial"
  },
  {
    id: "kw8",
    keyword: "custom product builder",
    volume: 720,
    difficulty: 35,
    cpc: 1.60,
    intent: "commercial"
  },
  {
    id: "kw9",
    keyword: "buy custom products",
    volume: 2200,
    difficulty: 67,
    cpc: 2.45,
    intent: "transactional"
  },
  {
    id: "kw10",
    keyword: "personalization options",
    volume: 980,
    difficulty: 31,
    cpc: 1.15,
    intent: "informational"
  },
  {
    id: "kw11",
    keyword: "product customization examples",
    volume: 750,
    difficulty: 27,
    cpc: 0.85,
    intent: "informational"
  },
  {
    id: "kw12",
    keyword: "custom design services",
    volume: 880,
    difficulty: 45,
    cpc: 2.20,
    intent: "commercial"
  },
  // Additional popular seed keyword examples
  {
    id: "kw13",
    keyword: "organic skincare",
    volume: 5400,
    difficulty: 65,
    cpc: 3.10,
    intent: "commercial"
  },
  {
    id: "kw14",
    keyword: "vegan skincare",
    volume: 2800,
    difficulty: 52,
    cpc: 2.50,
    intent: "commercial"
  },
  {
    id: "kw15",
    keyword: "custom t-shirts",
    volume: 12000,
    difficulty: 75,
    cpc: 1.85,
    intent: "transactional"
  },
  {
    id: "kw16",
    keyword: "smartphone accessories",
    volume: 8500,
    difficulty: 62,
    cpc: 1.70,
    intent: "transactional"
  },
  {
    id: "kw17",
    keyword: "organic face mask",
    volume: 5400,
    difficulty: 45,
    cpc: 2.10,
    intent: "commercial"
  },
  {
    id: "kw18",
    keyword: "best face serum",
    volume: 3200,
    difficulty: 38,
    cpc: 1.80,
    intent: "informational"
  }
];

// Popular seed keyword suggestions by industry
export const popularSeedKeywords = {
  winter_apparel: ["winter jackets", "snow boots", "ski gear", "north face", "patagonia"],
  outdoor_brands: ["north face", "patagonia", "arcteryx", "columbia", "marmot"],
  seasonal: ["ski jackets", "summer outdoor gear", "hiking clothes", "winter accessories"],
  brands: ["saint bernard", "saintbernard shop", "saint bernard coupon", "saint bernard reviews"],
  ecommerce: ["product reviews", "buy online", "best prices", "free shipping"],
  skincare: ["organic skincare", "vegan beauty", "natural ingredients", "face masks"],
  tech: ["smartphone accessories", "wireless chargers", "phone cases", "screen protectors"],
  fashion: ["custom t-shirts", "personalized gifts", "sustainable clothing", "eco-friendly apparel"]
};

// Mock keyword trend data (monthly volume data)
export const keywordTrendData = {
  // Simulate monthly data for each keyword
  generateMonthlyData: (keyword: string, baseSeed = 1000) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let seed = baseSeed;
    
    // Convert the keyword string to a number to use as a randomization seed
    const keywordSeed = keyword.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100;
    
    // Create a somewhat realistic seasonal pattern with the keyword as a seed
    return months.map((month, index) => {
      // Add seasonality based on keyword and month
      // Different keywords will have different seasonal patterns
      const seasonality = Math.sin((index + keywordSeed * 0.1) * 0.5) * 0.3 + 0.1;
      
      // Create a trend factor to simulate year-over-year growth
      const trendFactor = 1 + (keywordSeed % 30) / 100; // 0-30% growth year over year
      
      // Calculate the volume with seasonality and trend
      let volume = seed * (1 + seasonality) * trendFactor;
      
      // Add randomness
      volume = Math.max(100, Math.round(volume * (0.9 + Math.random() * 0.2)));
      
      return {
        month,
        [keyword]: volume,
        previousYear: Math.round(volume / trendFactor)
      };
    });
  }
};

// Mock website pages for keyword mapping
export const mockWebPages = [
  {
    id: "page1",
    title: "Winter Jackets Collection",
    url: "/winter-jackets",
    primaryKeyword: "winter jackets",
    secondaryKeywords: ["north face jackets", "patagonia jackets", "ski jackets"]
  },
  {
    id: "page2",
    title: "Snow Shoes & Winter Boots",
    url: "/snow-shoes-boots",
    primaryKeyword: "snow shoes",
    secondaryKeywords: ["discounted snow shoes", "snow boots", "winter footwear"]
  },
  {
    id: "page3",
    title: "North Face Collection",
    url: "/brands/north-face",
    primaryKeyword: "north face",
    secondaryKeywords: ["north face jackets", "north face backpacks", "north face winter gear"]
  },
  {
    id: "page1",
    title: "Product Customization Guide",
    url: "/product-customization-guide",
    primaryKeyword: "product customization",
    secondaryKeywords: ["custom design tool", "product editor"]
  },
  {
    id: "page2",
    title: "How to Use the Design Templates",
    url: "/how-to-use-design-templates",
    primaryKeyword: "design templates",
    secondaryKeywords: ["template library", "design presets"]
  },
  {
    id: "page3",
    title: "Personalized Products Ideas",
    url: "/personalized-product-ideas",
    primaryKeyword: "personalized products",
    secondaryKeywords: ["custom gift ideas", "unique personalization"]
  }
];

// Predefined keywords already added to the workspace
export const preselectedKeywords = [
  {
    id: "sb1",
    keyword: "saint bernard",
    volume: 22000,
    difficulty: 65,
    cpc: 1.35,
    intent: "navigational"
  },
  {
    id: "sb2",
    keyword: "saintbernard shop",
    volume: 14500,
    difficulty: 58,
    cpc: 1.25,
    intent: "navigational"
  },
  {
    id: "sb4",
    keyword: "winter jackets",
    volume: 18500,
    difficulty: 72,
    cpc: 2.45,
    intent: "commercial"
  },
  {
    id: "sb5",
    keyword: "north face",
    volume: 201000,
    difficulty: 85,
    cpc: 3.75,
    intent: "commercial"
  },
  {
    id: "sb6",
    keyword: "north face jackets",
    volume: 60500,
    difficulty: 76,
    cpc: 2.85,
    intent: "commercial"
  },
  {
    id: "sb9",
    keyword: "snow shoes",
    volume: 27500,
    difficulty: 63,
    cpc: 1.95,
    intent: "commercial"
  },
  {
    id: "sb10",
    keyword: "discounted snow shoes",
    volume: 5400,
    difficulty: 51,
    cpc: 1.75,
    intent: "transactional"
  },
  {
    id: "sb13",
    keyword: "winter accessories",
    volume: 12300,
    difficulty: 55,
    cpc: 1.85,
    intent: "commercial"
  },
  {
    id: "sb17",
    keyword: "arcteryx jackets",
    volume: 30200,
    difficulty: 69,
    cpc: 2.75,
    intent: "commercial"
  },
  {
    id: "sb18",
    keyword: "columbia winter jackets",
    volume: 18900,
    difficulty: 62,
    cpc: 2.05,
    intent: "commercial"
  }
];

// Predefined keyword groups
export const preselectedGroups = [
  { id: "all", name: "All Keywords", count: 10, isDefault: true },
  { id: "brand", name: "Brand Terms", count: 2, color: "#E5DEFF" },
  { id: "jackets", name: "Winter Jackets", count: 5, color: "#D3E4FD" },
  { id: "footwear", name: "Footwear", count: 2, color: "#FFDEE2" },
  { id: "accessories", name: "Accessories", count: 1, color: "#F2FCE2" }
];
