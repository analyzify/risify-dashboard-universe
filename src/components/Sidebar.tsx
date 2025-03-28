import React, { useState, useEffect } from "react";
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
import NavItem from "./NavItem";

interface SidebarProps {
  className?: string;
}

interface NavItemWithSubmenuProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isCollapsed?: boolean;
  submenuItems?: Array<{
    label: string;
    href: string;
  }>;
  showOnlyInPath?: string; // New prop to control where submenu items are shown
}

const NavItemWithSubmenu: React.FC<NavItemWithSubmenuProps> = ({
  icon,
  label,
  href,
  isCollapsed = false,
  submenuItems = [],
  showOnlyInPath
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = href ? location.pathname === href : false;
  const isChildActive = submenuItems.some(item => location.pathname === item.href);
  const isAnyActive = isActive || isChildActive;
  
  const basePath = href ? href : submenuItems.length > 0 ? submenuItems[0].href.split('/')[1] : '';
  const baseHref = href ? href : `/${basePath}`;

  // Check if we should show submenu based on current path
  const shouldShowSubmenu = !showOnlyInPath || location.pathname.includes(showOnlyInPath);

  useEffect(() => {
    if (isChildActive || isActive) {
      setIsOpen(true);
    }
  }, [location.pathname, isChildActive, isActive]);

  if (isCollapsed) {
    return (
      <Link
        to={baseHref}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 justify-center",
          isAnyActive 
            ? "bg-primary/10 text-primary" 
            : "text-foreground/70 hover:bg-accent hover:text-foreground"
        )}
      >
        <div className={cn(
          "flex items-center justify-center",
          isAnyActive ? "text-primary" : "text-foreground/70",
        )}>
          {icon}
        </div>
        {isAnyActive && (
          <div className="absolute left-0 h-8 w-1 rounded-r-lg bg-primary" />
        )}
      </Link>
    );
  }

  return (
    <div className="relative">
      <Collapsible open={isOpen && shouldShowSubmenu} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="w-full">
            {href ? (
              <div className="flex w-full">
                <Link
                  to={href}
                  className={cn(
                    "flex flex-grow items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    isAnyActive
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/70 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 flex items-center justify-center mr-3",
                    isAnyActive ? "text-primary" : "text-foreground/70",
                  )}>
                    {icon}
                  </div>
                  <span className="truncate">{label}</span>
                </Link>
                {shouldShowSubmenu && submenuItems.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(!isOpen);
                    }}
                    className={cn(
                      "flex items-center justify-center p-2 rounded-md transition-all duration-200",
                      isAnyActive || isOpen
                        ? "text-primary" 
                        : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                        isOpen ? "rotate-180" : ""
                      )}
                    />
                  </button>
                )}
              </div>
            ) : (
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isAnyActive || isOpen
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/70 hover:bg-accent hover:text-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                <div className="flex items-center min-w-0">
                  <div className={cn(
                    "flex-shrink-0 flex items-center justify-center mr-3",
                    isAnyActive || isOpen ? "text-primary" : "text-foreground/70",
                  )}>
                    {icon}
                  </div>
                  <span className="truncate">{label}</span>
                </div>
                {shouldShowSubmenu && submenuItems.length > 0 && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 flex-shrink-0 ml-2 transition-transform duration-200",
                      isOpen ? "rotate-180" : ""
                    )}
                  />
                )}
              </button>
            )}
          </div>
        </CollapsibleTrigger>
        {shouldShowSubmenu && (
          <CollapsibleContent className="pl-10 pr-2 pt-1 pb-1">
            <div className="flex flex-col space-y-1 border-l border-muted pl-2">
              {submenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
        )}
      </Collapsible>
      {isAnyActive && !isOpen && (
        <div className="absolute left-0 h-8 w-1 rounded-r-lg bg-primary" />
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const searchSubmenu = [
    { label: "Position Tracking", href: "/search/position-tracking" },
    { label: "Keywords", href: "/search/keywords" },
    { label: "Discovery", href: "/search/discovery" },
    { label: "Pages", href: "/search/pages" },
    { label: "Market Intelligence", href: "/search/market-intelligence" },
    { label: "Search Console", href: "/search/search-console" },
  ];

  const catalogSubmenu = [
    { label: "Products", href: "/catalog/products" },
    { label: "Mappings", href: "/catalog/mappings" },
    { label: "Collections", href: "/catalog/collections" },
    { label: "Taxonomies", href: "/catalog/taxonomies" },
  ];
  
  const componentsSubmenu = [
    { label: "Component Gallery", href: "/components/gallery" },
    { label: "Store Audit", href: "/components/store-audit" },
    { label: "Implementation", href: "/components/implementation" },
  ];

  const contentSubmenu = [
    { label: "AI Knowledge Base", href: "/content/knowledge-base" },
    { label: "Create Content", href: "/content/generator" },
    { label: "CMS", href: "/content/management" },
    { label: "Content Analytics", href: "/content/analytics" },
  ];

  const tasksSubmenu = [
    { label: "Tasks", href: "/tasks/tasks" },
    { label: "Task Discovery", href: "/tasks/discovery" },
    { label: "Growth Agents", href: "/tasks/growth-agents" },
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
          <NavItem
            href="/"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />

          <NavItemWithSubmenu
            icon={<Search className="h-5 w-5" />}
            label="Search & Visibility"
            href="/search"
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
            href="/tasks/tasks"
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
