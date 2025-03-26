
import { useState, useEffect } from "react";

interface ActionItem {
  title: string;
  description: string;
  impact: string;
}

interface RecentUpdate {
  title: string;
  description: string;
  date: string;
  type: 'important' | 'info';
}

interface TaxonomyStats {
  productsMapped: number;
  productsUnmapped: number;
  categoriesUsed: number;
  attributeCoverage: number;
}

interface AttributeCoverage {
  name: string;
  value: number;
}

export const useTaxonomyPage = () => {
  const [taxonomyHealth, setTaxonomyHealth] = useState(72);
  const [stats, setStats] = useState<TaxonomyStats>({
    productsMapped: 358,
    productsUnmapped: 42,
    categoriesUsed: 28,
    attributeCoverage: 65
  });

  const [attributeCoverage, setAttributeCoverage] = useState<AttributeCoverage[]>([
    { name: "Color", value: 98 },
    { name: "Size", value: 94 },
    { name: "Material", value: 76 },
    { name: "Brand", value: 100 },
    { name: "Weight", value: 45 },
    { name: "Dimensions", value: 32 },
    { name: "Country of Origin", value: 88 },
    { name: "Care Instructions", value: 53 }
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      title: "Map missing product categories",
      description: "42 products don't have category mapping. This affects search and browse.",
      impact: "High"
    },
    {
      title: "Add missing product dimensions",
      description: "68% of your products are missing dimension attributes.",
      impact: "Medium"
    },
    {
      title: "Review automatic category suggestions",
      description: "We've detected 17 products that may be miscategorized.",
      impact: "Medium"
    },
    {
      title: "Complete product material attributes",
      description: "24% of your apparel products are missing material information.",
      impact: "Low"
    }
  ]);

  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([
    {
      title: "New 'Sustainable Materials' attribute",
      description: "Shopify has added a new product attribute to highlight eco-friendly materials. Adding this may improve visibility in sustainability-focused searches.",
      date: "2 days ago",
      type: "important"
    },
    {
      title: "Apparel category restructuring",
      description: "Shopify has reorganized subcategories under 'Apparel' for better specificity. This may affect your current category mappings.",
      date: "5 days ago",
      type: "important"
    },
    {
      title: "Home Goods taxonomy expansion",
      description: "32 new subcategories have been added under 'Home & Kitchen' to better classify specific product types.",
      date: "2 weeks ago",
      type: "info"
    },
    {
      title: "Attribute requirements update",
      description: "New mandatory attributes for electronics products, including energy consumption ratings and compatibility details.",
      date: "3 weeks ago",
      type: "info"
    }
  ]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would be replaced with actual API calls in a real implementation
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    taxonomyHealth,
    stats,
    actionItems,
    recentUpdates,
    attributeCoverage
  };
};
