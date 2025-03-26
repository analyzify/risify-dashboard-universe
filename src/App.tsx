
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Content from "./pages/Content";
import Search from "./pages/Search";
import PositionTracking from "./pages/PositionTracking";
import Keywords from "./pages/Keywords"; // Renamed from KeywordWorkspace
import SearchDiscovery from "./pages/SearchDiscovery";
import Pages from "./pages/Pages"; // New Pages page
import Catalog from "./pages/Catalog";
import Components from "./pages/Components";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import MarketIntelligence from "./pages/MarketIntelligence"; // Import the new page
import SearchConsole from "./pages/SearchConsole"; // Add the SearchConsole import
import ProductsPage from "./pages/catalog/ProductsPage"; // Import the new ProductsPage component
import CollectionsPage from "./pages/catalog/CollectionsPage"; // Import the new Collections component
import TaxonomyPage from "./pages/catalog/TaxonomyPage"; // Import the new TaxonomyPage
import MappingsPage from "./pages/catalog/MappingsPage"; // Import the new MappingsPage
import GalleryPage from "./pages/components/GalleryPage"; // Import the new GalleryPage component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Index />} />
          
          {/* Search & Visibility */}
          <Route path="/search" element={<Search />} />
          <Route path="/search/position-tracking" element={<PositionTracking />} />
          <Route path="/search/keywords" element={<Keywords />} /> {/* Updated route */}
          <Route path="/search/keyword-workspace" element={<Navigate to="/search/keywords" replace />} /> {/* Redirect */}
          <Route path="/search/discovery" element={<SearchDiscovery />} />
          <Route path="/search/pages" element={<Pages />} /> {/* New route */}
          <Route path="/search/market-intelligence" element={<MarketIntelligence />} /> {/* Use real component instead of placeholder */}
          <Route path="/search/search-console" element={<SearchConsole />} /> {/* Changed from placeholder to real component */}
          
          {/* Catalog Management */}
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/products" element={<ProductsPage />} />
          <Route path="/catalog/mappings" element={<MappingsPage />} />
          <Route path="/catalog/relations" element={<Navigate to="/catalog/mappings" replace />} />
          <Route path="/catalog/collections" element={<CollectionsPage />} />
          <Route path="/catalog/hierarchy" element={<Navigate to="/catalog/collections" replace />} />
          <Route path="/catalog/taxonomies" element={<TaxonomyPage />} /> {/* Updated to use TaxonomyPage */}
          <Route path="/catalog/product-data" element={<Navigate to="/catalog/products" replace />} />
          
          {/* Mapping subcategories */}
          <Route path="/catalog/mappings/collection-taxonomy" element={<PlaceholderPage title="Collection to Shopify Taxonomy" />} />
          <Route path="/catalog/mappings/vendor-collection" element={<PlaceholderPage title="Vendor to Collection" />} />
          <Route path="/catalog/mappings/product-blog" element={<PlaceholderPage title="Product to Blog Post" />} />
          <Route path="/catalog/mappings/custom-groups" element={<PlaceholderPage title="Custom Groups" />} />
          
          {/* Storefront Components */}
          <Route path="/components" element={<Components />} />
          <Route path="/components/gallery" element={<GalleryPage />} /> {/* Updated to use real GalleryPage */}
          <Route path="/components/my-components" element={<PlaceholderPage title="My Components" />} />
          <Route path="/components/store-audit" element={<PlaceholderPage title="Store Audit" />} />
          <Route path="/components/implementation" element={<PlaceholderPage title="Implementation" />} />
          <Route path="/components/settings" element={<PlaceholderPage title="Component Settings" />} />
          
          {/* Content & Knowledge */}
          <Route path="/content" element={<Content />} />
          <Route path="/content/knowledge-base" element={<PlaceholderPage title="AI Knowledge Base" />} />
          <Route path="/content/generator" element={<PlaceholderPage title="Content Generator" />} />
          <Route path="/content/management" element={<PlaceholderPage title="Content Management" />} />
          <Route path="/content/growth-agents" element={<PlaceholderPage title="Growth Agents" />} />
          <Route path="/content/analytics" element={<PlaceholderPage title="Content Analytics" />} />
          
          {/* Growth Tasks */}
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/discovery" element={<PlaceholderPage title="Task Discovery" />} />
          <Route path="/tasks/active" element={<PlaceholderPage title="Active Tasks" />} />
          <Route path="/tasks/completed" element={<PlaceholderPage title="Completed Tasks" />} />
          <Route path="/tasks/templates" element={<PlaceholderPage title="Task Templates" />} />
          <Route path="/tasks/results" element={<PlaceholderPage title="Results & Impact" />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/account" element={<PlaceholderPage title="Account" />} />
          <Route path="/settings/team" element={<PlaceholderPage title="Team Members" />} />
          <Route path="/settings/integrations" element={<PlaceholderPage title="Integrations" />} />
          <Route path="/settings/notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="/settings/billing" element={<PlaceholderPage title="Billing" />} />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
