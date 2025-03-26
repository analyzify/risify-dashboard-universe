
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ComponentCard from "@/components/component-gallery/ComponentCard";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Component categories from the provided test data
const FILTER_CATEGORIES = [
  "All", 
  "Navigation", 
  "Content", 
  "Showcase", 
  "Rich Media"
];

// Enhanced test data with additional properties
const COMPONENT_DATA = [
  { title: "FAQ Accordion", category: "Content", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format", isActive: true, isConnected: true, entries: 12, engagements: 245 },
  { title: "Breadcrumbs", category: "Navigation", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format", isActive: true, isConnected: true, entries: 8, engagements: 120 },
  { title: "You Are Here Indicator", category: "Navigation", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format", isActive: false, isConnected: false, entries: 4, engagements: 30 },
  { title: "Collection Navigation", category: "Navigation", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format", isActive: true, isConnected: true, entries: 24, engagements: 560 },
  { title: "Related Searches", category: "Navigation", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format", isActive: false, isConnected: true, entries: 18, engagements: 89 },
  { title: "Blog Post Series", category: "Navigation", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format", isActive: true, isConnected: true, entries: 32, engagements: 420 },
  { title: "Found in Collections", category: "Navigation", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format", isActive: true, isConnected: false, entries: 7, engagements: 65 },
  { title: "Footer", category: "Navigation", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format", isActive: true, isConnected: true, entries: 1, engagements: 980 },
  { title: "Mega Menu", category: "Navigation", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format", isActive: true, isConnected: true, entries: 6, engagements: 750 },
  { title: "Expert Tips Cards", category: "Content", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format", isActive: false, isConnected: false, entries: 0, engagements: 0 },
  { title: "Testimonials & Reviews", category: "Content,Showcase", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format", isActive: true, isConnected: true, entries: 45, engagements: 876 },
  { title: "Hero", category: "Showcase,Content", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format", isActive: true, isConnected: true, entries: 3, engagements: 1250 },
  { title: "Comparison Table", category: "Showcase", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format", isActive: true, isConnected: true, entries: 8, engagements: 340 },
  { title: "Feature/USP Gallery", category: "Showcase", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format", isActive: false, isConnected: true, entries: 12, engagements: 180 },
  { title: "Trust Badges", category: "Showcase", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format", isActive: true, isConnected: true, entries: 8, engagements: 420 },
  { title: "About us - Our Story", category: "Showcase,Content", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format", isActive: true, isConnected: true, entries: 1, engagements: 890 },
  { title: "Product Videos Gallery (UGC)", category: "Rich Media", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format", isActive: false, isConnected: false, entries: 0, engagements: 0 },
  { title: "Shoppable Video & Photo", category: "Rich Media", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format", isActive: true, isConnected: true, entries: 14, engagements: 650 },
  { title: "Social Media Feed", category: "Rich Media", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format", isActive: true, isConnected: true, entries: 80, engagements: 1430 },
  { title: "Image Gallery", category: "Rich Media", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format", isActive: true, isConnected: true, entries: 56, engagements: 980 },
  { title: "Table of contents", category: "Content", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format", isActive: false, isConnected: false, entries: 3, engagements: 45 },
  { title: "Product documents", category: "Content", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format", isActive: true, isConnected: true, entries: 24, engagements: 320 },
  { title: "Product Specification Table", category: "Content", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format", isActive: true, isConnected: true, entries: 18, engagements: 540 },
  { title: "Size Guide", category: "Content", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format", isActive: false, isConnected: true, entries: 5, engagements: 210 },
  { title: "Color Variants Display", category: "Content", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format", isActive: true, isConnected: true, entries: 34, engagements: 680 }
];

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  // Filter components based on active category and status
  const filteredComponents = COMPONENT_DATA.filter(component => {
    // Filter by category
    const categoryMatch = activeFilter === "All" 
      ? true 
      : component.category.split(",").some(cat => cat.trim() === activeFilter);
    
    // Filter by status (active/passive)
    const statusMatch = statusFilter === undefined 
      ? true 
      : (statusFilter === "active" ? component.isActive : !component.isActive);
    
    return categoryMatch && statusMatch;
  });

  return (
    <Layout title="Component Gallery">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Component Library</h1>
          <p className="text-muted-foreground mt-1">
            These components are only visible to you. You can publish them to your store.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((filter) => (
              <Badge 
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"} 
                className="cursor-pointer px-3 py-1 text-sm"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>

          {/* Status Toggle */}
          <div className="flex items-center">
            <span className="text-sm font-medium mr-3">Status:</span>
            <ToggleGroup type="single" value={statusFilter} onValueChange={setStatusFilter}>
              <ToggleGroupItem value="active" aria-label="Show active components" className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                <span>Active</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="passive" aria-label="Show passive components" className="flex items-center gap-1">
                <X className="h-3.5 w-3.5" />
                <span>Passive</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Component List */}
        <div className="border rounded-lg overflow-hidden">
          {filteredComponents.map((component, index) => (
            <ComponentCard
              key={`${component.title}-${index}`}
              title={component.title}
              image={component.image}
              category={component.category}
              isActive={component.isActive}
              dataSource="CMS"
              isConnected={component.isConnected}
              entries={component.entries}
              engagements={component.engagements}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
