
import React from "react";
import CollectionsTable, { Collection } from "@/components/catalog/collections/CollectionsTable";

interface CollectionsContainerProps {
  collections: {
    display: Collection[];
    all: Collection[];
  };
  searchString: string;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onBulkSelect?: (selectedIds: string[]) => void;
}

const CollectionsContainer: React.FC<CollectionsContainerProps> = ({
  collections,
  searchString,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onRename,
  onDelete,
  onBulkSelect
}) => {
  // Filter display collections by search string if needed
  const filteredCollections = searchString.trim() !== '' 
    ? collections.display.filter(c => 
        c.title.toLowerCase().includes(searchString.toLowerCase()))
    : collections.display;

  if (loading) {
    return (
      <div className="border rounded-md p-4 min-h-[500px] bg-white shadow-sm">
        <div className="flex justify-center items-center h-[500px]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading collections...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4 min-h-[500px] bg-white shadow-sm">
      <CollectionsTable 
        collections={collections.all} // Pass all collections for parent-child relationship
        onRename={onRename}
        onDelete={onDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onBulkSelect={onBulkSelect}
      />
    </div>
  );
};

export default CollectionsContainer;
