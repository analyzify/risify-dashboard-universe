
import React from "react";
import { cn } from "@/lib/utils";
import { Bell, Search } from "lucide-react";
import Button from "./Button";

interface HeaderProps {
  className?: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ className, title }) => {
  return (
    <header className={cn(
      "flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-6",
      className
    )}>
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="rounded-full bg-secondary px-9 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 w-[180px] focus:w-[240px]"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="relative rounded-full w-9 h-9 p-0"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-risify-red"></span>
        </Button>
        
        <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/10">
          <span className="font-medium text-sm text-primary">JD</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
