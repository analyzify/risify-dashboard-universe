
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ComponentCard from "@/components/component-gallery/ComponentCard";
import ComponentCategories from "@/components/component-gallery/ComponentCategories";
import ComponentSection from "@/components/component-gallery/ComponentSection";
import ComponentActivation from "@/components/component-gallery/ComponentActivation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [activationDialog, setActivationDialog] = useState<{ isOpen: boolean, componentName: string }>({
    isOpen: false,
    componentName: ""
  });

  // Sample component data
  const products = [
    { id: 1, name: "Product Grid", description: "Display products in a responsive grid layout", isActive: true, category: "products" },
    { id: 2, name: "Product Carousel", description: "Showcase products in a swipeable carousel", isActive: false, category: "products" },
    { id: 3, name: "Featured Product", description: "Highlight specific products with enhanced styling", isActive: true, category: "products" },
  ];

  const content = [
    { id: 4, name: "FAQ Accordion", description: "Collapsible question and answer sections", isActive: false, category: "content" },
    { id: 5, name: "Content Tabs", description: "Organize content into tabbed interfaces", isActive: true, category: "content" },
    { id: 6, name: "Testimonials", description: "Display customer reviews and testimonials", isActive: false, category: "content" },
  ];

  const navigation = [
    { id: 7, name: "Mega Menu", description: "Advanced dropdown navigation with categories", isActive: true, category: "navigation" },
    { id: 8, name: "Sidebar Navigation", description: "Collapsible sidebar menu for mobile", isActive: false, category: "navigation" },
  ];

  const checkout = [
    { id: 9, name: "Express Checkout", description: "Streamlined one-page checkout experience", isActive: false, category: "checkout" },
    { id: 10, name: "Order Summary", description: "Detailed summary of items in the cart", isActive: true, category: "checkout" },
  ];

  const allComponents = [...products, ...content, ...navigation, ...checkout];

  const filteredComponents = allComponents.filter(component => {
    const categoryMatch = activeCategory === "all" || component.category === activeCategory;
    const activeMatch = 
      activeFilter === "all" || 
      (activeFilter === "active" && component.isActive) || 
      (activeFilter === "inactive" && !component.isActive);
    
    return categoryMatch && activeMatch;
  });

  const handleActivateComponent = (componentName: string) => {
    setActivationDialog({ isOpen: true, componentName });
  };

  const getVisibleProducts = () => activeCategory === "all" || activeCategory === "products" 
    ? products.filter(p => 
        activeFilter === "all" || 
        (activeFilter === "active" && p.isActive) || 
        (activeFilter === "inactive" && !p.isActive)
      ) 
    : [];

  const getVisibleContent = () => activeCategory === "all" || activeCategory === "content" 
    ? content.filter(c => 
        activeFilter === "all" || 
        (activeFilter === "active" && c.isActive) || 
        (activeFilter === "inactive" && !c.isActive)
      ) 
    : [];

  const getVisibleNavigation = () => activeCategory === "all" || activeCategory === "navigation" 
    ? navigation.filter(n => 
        activeFilter === "all" || 
        (activeFilter === "active" && n.isActive) || 
        (activeFilter === "inactive" && !n.isActive)
      ) 
    : [];

  const getVisibleCheckout = () => activeCategory === "all" || activeCategory === "checkout" 
    ? checkout.filter(c => 
        activeFilter === "all" || 
        (activeFilter === "active" && c.isActive) || 
        (activeFilter === "inactive" && !c.isActive)
      ) 
    : [];

  return (
    <Layout title="Component Gallery">
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Storefront Components</h1>
          <p className="text-muted-foreground">Browse and manage components for your Shopify store</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("active")}
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            Active
          </Button>
          <Button
            variant={activeFilter === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("inactive")}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Inactive
          </Button>
        </div>
      </div>

      <ComponentCategories 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {getVisibleProducts().length > 0 && (
        <ComponentSection title="Product Components">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getVisibleProducts().map(component => (
              <ComponentCard 
                key={component.id}
                title={component.name}
                description={component.description}
                isActive={component.isActive}
                onUse={() => handleActivateComponent(component.name)}
              />
            ))}
          </div>
        </ComponentSection>
      )}

      {getVisibleContent().length > 0 && (
        <ComponentSection title="Content Components">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getVisibleContent().map(component => (
              <ComponentCard 
                key={component.id}
                title={component.name}
                description={component.description}
                isActive={component.isActive}
                onUse={() => handleActivateComponent(component.name)}
              />
            ))}
          </div>
        </ComponentSection>
      )}

      {getVisibleNavigation().length > 0 && (
        <ComponentSection title="Navigation Components">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getVisibleNavigation().map(component => (
              <ComponentCard 
                key={component.id}
                title={component.name}
                description={component.description}
                isActive={component.isActive}
                onUse={() => handleActivateComponent(component.name)}
              />
            ))}
          </div>
        </ComponentSection>
      )}

      {getVisibleCheckout().length > 0 && (
        <ComponentSection title="Checkout Components">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getVisibleCheckout().map(component => (
              <ComponentCard 
                key={component.id}
                title={component.name}
                description={component.description}
                isActive={component.isActive}
                onUse={() => handleActivateComponent(component.name)}
              />
            ))}
          </div>
        </ComponentSection>
      )}

      <ComponentActivation 
        isOpen={activationDialog.isOpen}
        onClose={() => setActivationDialog({ ...activationDialog, isOpen: false })}
        componentName={activationDialog.componentName}
      />
    </Layout>
  );
};

export default GalleryPage;
