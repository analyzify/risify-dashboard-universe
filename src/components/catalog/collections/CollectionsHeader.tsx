
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Plus } from "lucide-react";

interface CollectionsHeaderProps {
  onExport: () => void;
  onAddRoot: () => void;
}

const CollectionsHeader: React.FC<CollectionsHeaderProps> = ({ 
  onExport, 
  onAddRoot 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Collections</h1>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button size="sm" onClick={onAddRoot}>
          <Plus className="mr-2 h-4 w-4" />
          Add collection
        </Button>
      </div>
    </div>
  );
};

export default CollectionsHeader;
