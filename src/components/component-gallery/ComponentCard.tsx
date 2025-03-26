
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  title: string;
  image: string;
  price: string;
  featured?: boolean;
  version?: string;
  added?: string;
  isPrivate?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ 
  title, 
  image, 
  price,
  featured = false,
  version,
  added,
  isPrivate = false
}) => {
  return (
    <div className={cn(
      "flex justify-between items-center border-b py-6 px-4 group hover:bg-muted/30",
      featured && "bg-muted/10"
    )}>
      <div className="flex gap-4">
        <div className="w-28 h-20 overflow-hidden rounded-md bg-muted flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          {added && <p className="text-xs text-muted-foreground mt-1">{added}</p>}
          {version && (
            <div className="mt-1 flex items-center">
              <span className="text-xs text-muted-foreground inline-flex items-center">
                {title.split(" ")[0]} version {version}
                <svg className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          )}
          {isPrivate && (
            <div className="flex items-center gap-1 mt-1">
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M13.45 11.55L15.5 9.5l-1.05-1.05a4 4 0 00-5.66 0L7.5 9.5l2.05 2.05a2 2 0 013.9 0z" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-muted-foreground">Private</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {price !== "Free" && (
          <span className="text-sm font-bold text-primary mr-2">{price}</span>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Preview</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="sm" className="h-8">
          Customize
        </Button>
        
        <Button size="sm" className="h-8">
          {price === "Free" ? "Use" : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default ComponentCard;
