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
import StoreAuditPage from "./pages/components/StoreAuditPage"; // Import the new StoreAuditPage component
import ImplementationPage from "./pages/components/ImplementationPage"; // Import the new ImplementationPage component

// Import Knowledge Base pages
import KnowledgeBasePage from "./pages/knowledge-base";
import CategoryPage from "./pages/knowledge-base/[category]";
import EditorPage from "./pages/knowledge-base/editor";
import SetupPage from "./pages/knowledge-base/setup";

// Import Content Generator page
import ContentGeneratorPage from "./pages/content/generator";
import ContentManagementPage from "./pages/content/management"; // Import the content management page
import ContentAnalyticsPage from "./pages/content/analytics"; // Import the content analytics page

// Import Task pages
import TaskDiscovery from "./pages/tasks/discovery";
import TasksTablePage from "./pages/tasks/tasks"; // Import the new Tasks table page
import GrowthAgents from "./pages/tasks/growth-agents";

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
          <Route path="/catalog/mappings/collection-category" element={<PlaceholderPage title="Collection to Shopify/Google Taxonomy - Category" />} /> {/* New route */}
          <Route path="/catalog/mappings/vendor-collection" element={<PlaceholderPage title="Vendor to Collection" />} />
          <Route path="/catalog/mappings/product-blog" element={<PlaceholderPage title="Product to Blog Post" />} />
          <Route path="/catalog/mappings/custom-groups" element={<PlaceholderPage title="Custom Groups" />} />
          
          {/* Storefront Components */}
          <Route path="/components" element={<Components />} />
          <Route path="/components/gallery" element={<GalleryPage />} />
          <Route path="/components/my-components" element={<Navigate to="/components/gallery" replace />} /> {/* Add redirect */}
          <Route path="/components/store-audit" element={<StoreAuditPage />} /> {/* New route for Store Audit */}
          <Route path="/components/implementation" element={<ImplementationPage />} /> {/* Updated route for Implementation */}
          
          {/* Content & Knowledge */}
          <Route path="/content" element={<Content />} />
          <Route path="/content/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/content/knowledge-base/:categoryId" element={<CategoryPage />} />
          <Route path="/content/knowledge-base/editor" element={<EditorPage />} />
          <Route path="/content/knowledge-base/setup" element={<SetupPage />} />
          <Route path="/content/generator" element={<ContentGeneratorPage />} /> {/* Updated to use the real component */}
          <Route path="/content/management" element={<ContentManagementPage />} /> {/* Updated to use our ContentManagementPage component */}
          <Route path="/content/analytics" element={<ContentAnalyticsPage />} /> {/* Updated to use our ContentAnalyticsPage component */}
          
          {/* Growth Tasks */}
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/discovery" element={<TaskDiscovery />} />
          <Route path="/tasks/tasks" element={<TasksTablePage />} />
          <Route path="/tasks/growth-agents" element={<GrowthAgents />} />
          
          {/* Redirect old routes to new consolidated pages */}
          <Route path="/tasks/active" element={<Navigate to="/tasks/tasks" replace />} />
          <Route path="/tasks/completed" element={<Navigate to="/tasks/tasks" replace />} />
          <Route path="/tasks/templates" element={<Navigate to="/tasks/discovery?view=templates" replace />} />
          <Route path="/tasks/results" element={<Navigate to="/tasks/tasks" replace />} />
          
          {/* Redirect for the old growth-agents path */}
          <Route path="/content/growth-agents" element={<Navigate to="/tasks/growth-agents" replace />} />
          
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
