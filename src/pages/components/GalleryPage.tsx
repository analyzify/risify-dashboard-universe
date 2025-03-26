
import React from "react";
import Layout from "@/components/Layout";
import ComponentCategories from "@/components/component-gallery/ComponentCategories";
import ComponentSection from "@/components/component-gallery/ComponentSection";
import ComponentCard from "@/components/component-gallery/ComponentCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const GalleryPage = () => {
  return (
    <Layout title="Component Gallery">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Component Gallery</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search components..." className="pl-8" />
          </div>
        </div>

        <ComponentCategories />

        <ComponentSection title="Trending Now" showViewAll>
          <ComponentCard
            title="Testimonial #8"
            image="/lovable-uploads/8f2500f5-5f94-4b6e-b10d-9506861407c0.png"
            price="$9"
          />
          <ComponentCard
            title="Product tabs"
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format"
            price="$9"
          />
          <ComponentCard
            title="Payment icons"
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format"
            price="$7"
          />
          <ComponentCard
            title="Scrolling logo cloud"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
            price="$9"
          />
        </ComponentSection>

        <ComponentSection title="Newest Releases" showViewAll>
          <ComponentCard
            title="Header #13"
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format"
            price="$9"
          />
          <ComponentCard
            title="Testimonials #34"
            image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format"
            price="$9"
          />
          <ComponentCard
            title="Comparison table #20"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
            price="$9"
          />
          <ComponentCard
            title="Hotspots #9"
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format"
            price="$9"
          />
        </ComponentSection>

        <ComponentSection title="Free" showViewAll>
          <ComponentCard
            title="Feature #1"
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format"
            price="Free"
          />
          <ComponentCard
            title="FAQ #1"
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format"
            price="Free"
          />
          <ComponentCard
            title="Image gallery #1"
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format"
            price="Free"
          />
          <ComponentCard
            title="Counter"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
            price="Free"
          />
        </ComponentSection>

        <ComponentSection title="Most Popular">
          <ComponentCard
            title="Hero Section #5"
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format"
            price="$12"
            featured
          />
          <ComponentCard
            title="Testimonial Grid #3"
            image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format"
            price="$9"
          />
          <ComponentCard
            title="Feature Showcase"
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format"
            price="$15"
          />
          <ComponentCard
            title="Product Display"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format"
            price="$9"
          />
        </ComponentSection>
      </div>
    </Layout>
  );
};

export default GalleryPage;
