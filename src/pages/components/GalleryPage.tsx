
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ComponentCard from "@/components/component-gallery/ComponentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Component categories from the provided test data
const FILTER_CATEGORIES = [
  "All", 
  "Navigation", 
  "Content", 
  "Showcase", 
  "Rich Media"
];

// Test data provided by the user
const COMPONENT_DATA = [
  { title: "FAQ Accordion", category: "Content", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format" },
  { title: "Breadcrumbs", category: "Navigation", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format" },
  { title: "You Are Here Indicator", category: "Navigation", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format" },
  { title: "Collection Navigation", category: "Navigation", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format" },
  { title: "Related Searches", category: "Navigation", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format" },
  { title: "Blog Post Series", category: "Navigation", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format" },
  { title: "Found in Collections", category: "Navigation", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format" },
  { title: "Footer", category: "Navigation", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format" },
  { title: "Mega Menu", category: "Navigation", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format" },
  { title: "Expert Tips Cards", category: "Content", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format" },
  { title: "Testimonials & Reviews", category: "Content,Showcase", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format" },
  { title: "Hero", category: "Showcase,Content", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format" },
  { title: "Comparison Table", category: "Showcase", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format" },
  { title: "Feature/USP Gallery", category: "Showcase", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format" },
  { title: "Trust Badges", category: "Showcase", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format" },
  { title: "About us - Our Story", category: "Showcase,Content", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format" },
  { title: "Product Videos Gallery (UGC)", category: "Rich Media", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format" },
  { title: "Shoppable Video & Photo", category: "Rich Media", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format" },
  { title: "Social Media Feed", category: "Rich Media", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format" },
  { title: "Image Gallery", category: "Rich Media", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format" },
  { title: "Table of contents", category: "Content", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format" },
  { title: "Product documents", category: "Content", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format" },
  { title: "Product Specification Table", category: "Content", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format" },
  { title: "Size Guide", category: "Content", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format" },
  { title: "Color Variants Display", category: "Content", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format" }
];

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter components based on active category
  const filteredComponents = activeFilter === "All" 
    ? COMPONENT_DATA 
    : COMPONENT_DATA.filter(component => 
        component.category.split(",").some(cat => cat.trim() === activeFilter)
      );

  return (
    <Layout title="Component Gallery">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Component Library</h1>
            <p className="text-muted-foreground mt-1">
              These components are only visible to you. You can publish them to your store.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add component
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Component List */}
        <div className="border rounded-lg overflow-hidden">
          {filteredComponents.map((component, index) => (
            <ComponentCard
              key={`${component.title}-${index}`}
              title={component.title}
              image={component.image}
              category={component.category}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
