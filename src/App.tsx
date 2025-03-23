
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Content from "./pages/Content";
import Search from "./pages/Search";
import Catalog from "./pages/Catalog";
import Components from "./pages/Components";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

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
          <Route path="/search/position-tracking" element={<PlaceholderPage title="Position Tracking" />} />
          <Route path="/search/keyword-workspace" element={<PlaceholderPage title="Keyword Workspace" />} />
          <Route path="/search/market-intelligence" element={<PlaceholderPage title="Market Intelligence" />} />
          <Route path="/search/faq-explorer" element={<PlaceholderPage title="FAQ Explorer" />} />
          <Route path="/search/search-console" element={<PlaceholderPage title="Search Console" />} />
          
          {/* Catalog Management */}
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/product-data" element={<PlaceholderPage title="Product Data Workspace" />} />
          <Route path="/catalog/relationship-builder" element={<PlaceholderPage title="Relationship Builder" />} />
          <Route path="/catalog/collection-structure" element={<PlaceholderPage title="Collection Structure" />} />
          <Route path="/catalog/bulk-editor" element={<PlaceholderPage title="Bulk Editor" />} />
          <Route path="/catalog/templates" element={<PlaceholderPage title="Templates" />} />
          
          {/* Storefront Components */}
          <Route path="/components" element={<Components />} />
          <Route path="/components/gallery" element={<PlaceholderPage title="Component Gallery" />} />
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
