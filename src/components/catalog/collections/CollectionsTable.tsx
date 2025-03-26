import React, { useState } from "react";
import { Package, MoreHorizontal, FolderTree, ArrowUp, ArrowDown, TrendingUp, Lightbulb } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Collection {
  id: string;
  title: string;
  parentId?: string | null;
  type?: string;
  relationsCount?: number;
  popularity?: number;
  optimizationIdeas?: string[];
}

interface CollectionRelationshipProps {
  collection: Collection;
  collections: Collection[];
  onRename: (id: string, title: string) => void;
}

const CollectionRelationship: React.FC<CollectionRelationshipProps> = ({ 
  collection, 
  collections,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(collection.title);
  
  const findParent = (collection: Collection): Collection | undefined => {
    if (!collection.parentId) return undefined;
    return collections.find(c => c.id === collection.parentId);
  };
  
  const findChildren = (collection: Collection): Collection[] => {
    return collections.filter(c => c.parentId === collection.id);
  };
  
  const parent = findParent(collection);
  const children = findChildren(collection);
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      onRename(collection.id, editValue);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <Package className="h-4 w-4 text-gray-400 flex-shrink-0 mr-2" />
        
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border border-input px-2 py-0.5 text-sm rounded-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
              autoFocus
              onBlur={() => {
                if (editValue.trim()) {
                  onRename(collection.id, editValue);
                } else {
                  setEditValue(collection.title);
                }
                setIsEditing(false);
              }}
            />
          </form>
        ) : (
          <span 
            className="cursor-pointer hover:underline"
            onClick={() => {
              setIsEditing(true);
              setEditValue(collection.title);
            }}
          >
            {collection.title}
          </span>
        )}
      </div>
    </div>
  );
};

interface RelationshipsColumnProps {
  collection: Collection;
  collections: Collection[];
}

const RelationshipsColumn: React.FC<RelationshipsColumnProps> = ({ collection, collections }) => {
  const findParent = (collection: Collection): Collection | undefined => {
    if (!collection.parentId) return undefined;
    return collections.find(c => c.id === collection.parentId);
  };
  
  const findChildren = (collection: Collection): Collection[] => {
    return collections.filter(c => c.parentId === collection.id);
  };
  
  const parent = findParent(collection);
  const children = findChildren(collection);
  
  return (
    <div className="space-y-1 text-xs">
      {parent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowUp className="h-3.5 w-3.5 mr-1 text-primary/70" />
                <span className="truncate">{parent.title}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Parent collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {children.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowDown className="h-3.5 w-3.5 mr-1 text-primary/70" />
                <span className="truncate">
                  {children.slice(0, 2).map((child, i) => (
                    <React.Fragment key={child.id}>
                      {child.title}{i < children.slice(0, 2).length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                  {children.length > 2 && ` +${children.length - 2} more`}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="space-y-1 py-1">
                <p className="text-xs font-medium">Child collections ({children.length})</p>
                {children.map(child => (
                  <div key={child.id} className="text-xs">{child.title}</div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {!parent && children.length === 0 && (
        <span className="text-muted-foreground">No relationships</span>
      )}
    </div>
  );
};

interface PopularityColumnProps {
  popularity?: number;
}

const PopularityColumn: React.FC<PopularityColumnProps> = ({ popularity = 0 }) => {
  const trafficValue = popularity || Math.floor(Math.random() * 10000);
  
  let colorClass = "text-muted-foreground";
  if (trafficValue > 5000) colorClass = "text-green-600";
  else if (trafficValue > 2000) colorClass = "text-amber-600";
  
  return (
    <div className="flex items-center space-x-2">
      <TrendingUp className={`h-4 w-4 ${colorClass}`} />
      <span className={`font-medium ${colorClass}`}>
        {trafficValue.toLocaleString()}
      </span>
    </div>
  );
};

interface OptimizationIdeasColumnProps {
  ideas?: string[];
  collectionTitle: string;
}

const OptimizationIdeasColumn: React.FC<OptimizationIdeasColumnProps> = ({ 
  ideas = [], 
  collectionTitle 
}) => {
  const hasIdeas = ideas.length > 0 || Math.random() > 0.3;
  
  if (!hasIdeas) {
    return (
      <span className="text-muted-foreground text-xs">No suggestions</span>
    );
  }
  
  const displayIdeas = ideas.length > 0 ? ideas : [
    `Add more products to "${collectionTitle}"`,
    `Improve SEO for "${collectionTitle}"`,
    `Create content for "${collectionTitle}"`
  ];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center cursor-pointer text-amber-600 hover:text-amber-700">
            <Lightbulb className="h-4 w-4 mr-1.5" />
            <span className="text-xs font-medium">{displayIdeas.length} suggestions</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="w-80">
          <div className="space-y-2">
            <p className="text-xs font-semibold">Optimization Ideas:</p>
            <ul className="text-xs space-y-1.5">
              {displayIdeas.map((idea, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-medium text-amber-600 mr-1.5">•</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface CollectionsTableProps {
  collections: Collection[];
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onBulkSelect?: (selectedIds: string[]) => void;
}

const CollectionsTable: React.FC<CollectionsTableProps> = ({
  collections,
  onRename,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  onBulkSelect,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(collections.map(c => c.id));
    } else {
      setSelectedItems([]);
    }
    
    if (onBulkSelect) {
      onBulkSelect(checked ? collections.map(c => c.id) : []);
    }
  };
  
  const handleSelectItem = (id: string, checked: boolean) => {
    const updatedSelection = checked 
      ? [...selectedItems, id]
      : selectedItems.filter(itemId => itemId !== id);
    
    setSelectedItems(updatedSelection);
    
    if (onBulkSelect) {
      onBulkSelect(updatedSelection);
    }
  };
  
  const allSelected = collections.length > 0 && selectedItems.length === collections.length;
  
  const someSelected = selectedItems.length > 0 && selectedItems.length < collections.length;

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                indeterminate={someSelected}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Collection Name</TableHead>
            <TableHead className="w-[250px]">
              <div className="flex items-center gap-1">
                <FolderTree className="h-4 w-4 text-gray-400" />
                <span>Relationships</span>
              </div>
            </TableHead>
            <TableHead className="w-[150px]">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <span>Popularity</span>
              </div>
            </TableHead>
            <TableHead className="w-[180px]">
              <div className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4 text-gray-400" />
                <span>Optimization Ideas</span>
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No collections found
              </TableCell>
            </TableRow>
          ) : (
            collections.map((collection) => (
              <TableRow key={collection.id} className={selectedItems.includes(collection.id) ? "bg-muted/30" : ""}>
                <TableCell className="pr-0">
                  <Checkbox 
                    checked={selectedItems.includes(collection.id)}
                    onCheckedChange={(checked) => handleSelectItem(collection.id, !!checked)}
                    aria-label={`Select ${collection.title}`}
                  />
                </TableCell>
                <TableCell>
                  <CollectionRelationship 
                    collection={collection} 
                    collections={collections} 
                    onRename={onRename}
                  />
                </TableCell>
                <TableCell>
                  <RelationshipsColumn 
                    collection={collection}
                    collections={collections}
                  />
                </TableCell>
                <TableCell>
                  <PopularityColumn popularity={collection.popularity} />
                </TableCell>
                <TableCell>
                  <OptimizationIdeasColumn 
                    ideas={collection.optimizationIdeas} 
                    collectionTitle={collection.title}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onRename(collection.id, collection.title)}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(collection.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CollectionsTable;
