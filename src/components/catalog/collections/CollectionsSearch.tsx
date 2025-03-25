
import React from "react";
import { Input } from "@/components/ui/input";

interface CollectionsSearchProps {
  searchString: string;
  setSearchString: (value: string) => void;
}

const CollectionsSearch: React.FC<CollectionsSearchProps> = ({
  searchString,
  setSearchString
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-full max-w-sm">
        <Input 
          placeholder="Search collections..." 
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CollectionsSearch;
