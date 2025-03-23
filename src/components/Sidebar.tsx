
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  LayoutDashboard, 
  Search, 
  Package, 
  Layers, 
  FileText, 
  CheckSquare, 
  Settings,
  LogOut
} from "lucide-react";
import Button from "./Button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  className?: string;
}

interface NavItemWithSubmenuProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  submenuItems?: Array<{
    label: string;
    href: string;
  }>;
}

const NavItemWithSubmenu: React.FC<NavItemWithSubmenuProps> = ({
  icon,
  label,
  isCollapsed = false,
  submenuItems = []
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = submenuItems.some(item => location.pathname === item.href);
  const basePath = submenuItems.length > 0 ? submenuItems[0].href.split('/')[1] : '';
  const baseHref = `/${basePath}`;

  if (isCollapsed) {
    return (
      <Link
        to={baseHref}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 justify-center",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-foreground/70 hover:bg-accent hover:text-foreground"
        )}
      >
        <div className={cn(
          "flex items-center justify-center",
          isActive ? "text-primary" : "text-foreground/70",
        )}>
          {icon}
        </div>
        {isActive && (
          <div className="absolute left-0 h-8 w-1 rounded-r-lg bg-primary" />
        )}
      </Link>
    );
  }

  return (
    <div className="relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive || isOpen
                ? "bg-primary/10 text-primary" 
                : "text-foreground/70 hover:bg-accent hover:text-foreground"
            )}
          >
            <div className="flex items-center min-w-0">
              <div className={cn(
                "flex-shrink-0 flex items-center justify-center mr-3",
                isActive || isOpen ? "text-primary" : "text-foreground/70",
              )}>
                {icon}
              </div>
              <span className="truncate">{label}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 flex-shrink-0 ml-2 transition-transform duration-200",
                isOpen ? "rotate-180" : ""
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-10 pr-2 pt-1 pb-1">
          <div className="flex flex-col space-y-1 border-l border-muted pl-2">
            {submenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm transition-all duration-200 truncate",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-foreground/70 hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      {isActive && !isOpen && (
        <div className="absolute left-0 h-8 w-1 rounded-r-lg bg-primary" />
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const searchSubmenu = [
    { label: "Position Tracking", href: "/search/position-tracking" },
    { label: "Keyword Workspace", href: "/search/keyword-workspace" },
    { label: "Market Intelligence", href: "/search/market-intelligence" },
    { label: "FAQ Explorer", href: "/search/faq-explorer" },
    { label: "Search Console", href: "/search/search-console" },
  ];

  const catalogSubmenu = [
    { label: "Product Data Workspace", href: "/catalog/product-data" },
    { label: "Relationship Builder", href: "/catalog/relationship-builder" },
    { label: "Collection Structure", href: "/catalog/collection-structure" },
    { label: "Bulk Editor", href: "/catalog/bulk-editor" },
    { label: "Templates", href: "/catalog/templates" },
  ];

  const componentsSubmenu = [
    { label: "Component Gallery", href: "/components/gallery" },
    { label: "My Components", href: "/components/my-components" },
    { label: "Store Audit", href: "/components/store-audit" },
    { label: "Implementation", href: "/components/implementation" },
    { label: "Component Settings", href: "/components/settings" },
  ];

  const contentSubmenu = [
    { label: "AI Knowledge Base", href: "/content/knowledge-base" },
    { label: "Content Generator", href: "/content/generator" },
    { label: "Content Management", href: "/content/management" },
    { label: "Growth Agents", href: "/content/growth-agents" },
    { label: "Content Analytics", href: "/content/analytics" },
  ];

  const tasksSubmenu = [
    { label: "Task Discovery", href: "/tasks/discovery" },
    { label: "Active Tasks", href: "/tasks/active" },
    { label: "Completed Tasks", href: "/tasks/completed" },
    { label: "Task Templates", href: "/tasks/templates" },
    { label: "Results & Impact", href: "/tasks/results" },
  ];

  const settingsSubmenu = [
    { label: "Account", href: "/settings/account" },
    { label: "Team Members", href: "/settings/team" },
    { label: "Integrations", href: "/settings/integrations" },
    { label: "Notifications", href: "/settings/notifications" },
    { label: "Billing", href: "/settings/billing" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-sidebar transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="font-semibold text-lg text-foreground">Risify</div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="rounded-full w-8 h-8 p-0 flex items-center justify-center"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <div className="space-y-1">
          <Link
            to="/"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              isCollapsed ? "justify-center" : "justify-start",
              location.pathname === "/" 
                ? "bg-primary/10 text-primary" 
                : "text-foreground/70 hover:bg-accent hover:text-foreground"
            )}
          >
            <div className={cn(
              "flex items-center justify-center",
              location.pathname === "/" ? "text-primary" : "text-foreground/70",
            )}>
              <LayoutDashboard className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <span className="ml-3 truncate">Dashboard</span>
            )}
            {location.pathname === "/" && (
              <div className="absolute left-0 h-8 w-1 rounded-r-lg bg-primary" />
            )}
          </Link>

          <NavItemWithSubmenu
            icon={<Search className="h-5 w-5" />}
            label="Search & Visibility"
            isCollapsed={isCollapsed}
            submenuItems={searchSubmenu}
          />

          <NavItemWithSubmenu
            icon={<Package className="h-5 w-5" />}
            label="Catalog Management"
            isCollapsed={isCollapsed}
            submenuItems={catalogSubmenu}
          />

          <NavItemWithSubmenu
            icon={<Layers className="h-5 w-5" />}
            label="Storefront Components"
            isCollapsed={isCollapsed}
            submenuItems={componentsSubmenu}
          />

          <NavItemWithSubmenu
            icon={<FileText className="h-5 w-5" />}
            label="Content & Knowledge"
            isCollapsed={isCollapsed}
            submenuItems={contentSubmenu}
          />

          <NavItemWithSubmenu
            icon={<CheckSquare className="h-5 w-5" />}
            label="Growth Tasks"
            isCollapsed={isCollapsed}
            submenuItems={tasksSubmenu}
          />
        </div>
      </div>

      <div className="border-t p-3">
        <NavItemWithSubmenu
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          isCollapsed={isCollapsed}
          submenuItems={settingsSubmenu}
        />
        
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-start text-foreground/70"
            leftIcon={<LogOut className="h-4 w-4" />}
          >
            Logout
          </Button>
        )}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-center"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
