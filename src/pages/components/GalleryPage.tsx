
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ComponentCard from "@/components/component-gallery/ComponentCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FILTER_CATEGORIES = [
  "All", "Featured", "Newest", "Hero", "Product", "Navigation", 
  "Footer", "Forms", "Cards", "Gallery", "Testimonials"
];

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

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
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Search components..." className="pl-8" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add component
            </Button>
          </div>
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
          <ComponentCard
            title="Product Detail Section #1"
            image="/lovable-uploads/8f2500f5-5f94-4b6e-b10d-9506861407c0.png"
            added="Added: Mar 14 at 4:47 pm GMT+1"
            version="1.0.0"
          />
          <ComponentCard
            title="Product Image Gallery"
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format"
            added="Added: Mar 14 at 4:42 pm GMT+1"
            version="2.1.0"
          />
          <ComponentCard
            title="Advanced Reviews Component"
            image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format"
            added="Added: Mar 14 at 4:41 pm GMT+1"
            version="1.3.0"
          />
          <ComponentCard
            title="Hero Section with Animation"
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format"
            added="Added: Mar 7 at 3:29 pm GMT+1"
            version="1.1.0"
          />
          <ComponentCard
            title="Product Comparison Table"
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format"
            added="Added: Mar 5 at 2:14 pm GMT+1"
            version="1.0.2"
          />
          <ComponentCard
            title="Newsletter Subscription Form"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
            added="Added: Mar 2 at 10:47 am GMT+1"
            version="2.0.0"
          />
          <ComponentCard
            title="Basic Product Card"
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format"
            added="Added: Feb 28 at 3:21 pm GMT+1"
            version="1.0.0"
          />
          <ComponentCard
            title="Simple Footer"
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format"
            added="Added: Feb 25 at 11:18 am GMT+1"
            version="1.0.0"
          />
          <ComponentCard
            title="Social Media Icons"
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format"
            added="Added: Feb 20 at 9:45 am GMT+1"
            version="1.0.0"
            isPrivate={true}
          />
          <ComponentCard
            title="Custom Product Filter"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
            added="Last saved: Feb 15 at 4:32 pm GMT+1"
            version="0.9.0"
            isPrivate={true}
          />
          <ComponentCard
            title="Cart Drawer with Upsells"
            image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format"
            added="Last saved: Feb 10 at 2:17 pm GMT+1"
            version="0.8.5"
            isPrivate={true}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
