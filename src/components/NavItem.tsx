
import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  icon, 
  label, 
  isCollapsed = false 
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        isCollapsed ? "justify-center" : "justify-start",
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
      {!isCollapsed && (
        <span className={cn(
          "ml-3 transition-all duration-200",
        )}>
          {label}
        </span>
      )}
      {isActive && (
        <div className="absolute left-0 h-8 w-1 rounded-r-lg bg-primary" />
      )}
    </Link>
  );
};

export default NavItem;
