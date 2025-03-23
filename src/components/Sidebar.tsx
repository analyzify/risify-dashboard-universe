
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import NavItem from "./NavItem";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Search, 
  ShoppingCart, 
  LayoutGrid, 
  FileText, 
  CheckSquare, 
  Settings,
  LogOut
} from "lucide-react";
import Button from "./Button";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          <NavItem
            href="/search"
            icon={<Search className="h-5 w-5" />}
            label="Search & Visibility"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/catalog"
            icon={<ShoppingCart className="h-5 w-5" />}
            label="Catalog Management"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/components"
            icon={<LayoutGrid className="h-5 w-5" />}
            label="Storefront Components"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/content"
            icon={<FileText className="h-5 w-5" />}
            label="Content & Knowledge"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/tasks"
            icon={<CheckSquare className="h-5 w-5" />}
            label="Growth Tasks"
            isCollapsed={isCollapsed}
          />
        </div>
      </div>

      <div className="border-t p-3">
        <NavItem
          href="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          isCollapsed={isCollapsed}
        />
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-start text-risify-text"
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
