import React, { useState } from "react";
import { Package, MoreHorizontal, Check, Type, FolderTree } from "lucide-react";
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
      
      {parent && (
        <div className="ml-6 -mt-1">
          <div className="text-xs text-muted-foreground flex items-center">
            <span className="mr-1">Parent:</span>
            <span className="font-medium hover:text-foreground transition-colors cursor-pointer">
              {parent.title}
            </span>
          </div>
        </div>
      )}
      
      {children.length > 0 && (
        <div className="ml-6 -mt-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-muted-foreground flex items-center">
                  <span className="mr-1">Children ({children.length}):</span>
                  <span className="font-medium truncate hover:text-foreground transition-colors cursor-pointer">
                    {children.slice(0, 2).map((child, i) => (
                      <React.Fragment key={child.id}>
                        {child.title}{i < children.slice(0, 2).length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                    {children.length > 2 && ` +${children.length - 2} more`}
                  </span>
                </div>
              </TooltipTrigger>
              {children.length > 2 && (
                <TooltipContent>
                  <div className="space-y-1 py-1">
                    {children.map(child => (
                      <div key={child.id} className="text-sm">{child.title}</div>
                    ))}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
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
                data-state={someSelected ? "indeterminate" : undefined}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Collection Name</TableHead>
            <TableHead className="w-[150px]">
              <div className="flex items-center gap-1">
                <Type className="h-4 w-4 text-gray-400" />
                <span>Type</span>
              </div>
            </TableHead>
            <TableHead className="w-[150px]">
              <div className="flex items-center gap-1">
                <FolderTree className="h-4 w-4 text-gray-400" />
                <span>Relations</span>
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
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
                  {collection.type ? (
                    <Badge variant="outline" className="bg-primary/10">
                      {collection.type}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">Standard</span>
                  )}
                </TableCell>
                <TableCell>
                  {(() => {
                    const parentCount = collection.parentId ? 1 : 0;
                    const childrenCount = collections.filter(c => c.parentId === collection.id).length;
                    const total = parentCount + childrenCount;
                    
                    return total > 0 ? (
                      <Badge variant="outline" className="bg-secondary/20">
                        {total} {total === 1 ? 'relation' : 'relations'}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    );
                  })()}
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
