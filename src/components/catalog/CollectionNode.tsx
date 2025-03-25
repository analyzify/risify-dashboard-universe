
import React from "react";
import { TreeItem } from "react-sortable-tree";
import { Package, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface CollectionNodeProps {
  node: TreeItem;
  path: number[];
  onRename: (path: number[], title: string) => void;
  onAddChild: (path: number[]) => void;
  onDelete: (path: number[]) => void;
}

const CollectionNode: React.FC<CollectionNodeProps> = ({
  node,
  path,
  onRename,
  onAddChild,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-gray-400 flex-shrink-0" />
        <span className="truncate">{String(node.title)}</span>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onRename(path, String(node.title))}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddChild(path)}>
              Add child
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(path)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CollectionNode;
