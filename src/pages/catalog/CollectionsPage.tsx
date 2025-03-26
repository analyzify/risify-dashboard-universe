
import React from "react";
import Layout from "@/components/Layout";
import { useCollectionsPage } from "@/hooks/useCollectionsPage";
import { RenameDialog, AddDialog } from "@/components/catalog/CollectionDialogs";
import CollectionsHeader from "@/components/catalog/collections/CollectionsHeader";
import CollectionsSearch from "@/components/catalog/collections/CollectionsSearch";
import CollectionsContainer from "@/components/catalog/collections/CollectionsContainer";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const CollectionsPage: React.FC = () => {
  const {
    collections,
    loading,
    searchString,
    setSearchString,
    currentPage,
    totalPages,
    handlePageChange,
    newCollectionName,
    setNewCollectionName,
    isRenameDialogOpen,
    setIsRenameDialogOpen,
    isAddDialogOpen,
    setIsAddDialogOpen,
    renamedValue,
    setRenamedValue,
    handleAddCollection,
    handleRenameCollection,
    handleDeleteAction,
    handleExportCollections,
    handleRenameAction,
    handleAddRootCollection,
    selectedCollections,
    handleBulkSelect,
    handleBulkDelete
  } = useCollectionsPage();

  return (
    <Layout title="Collections">
      <div className="space-y-6">
        {/* Header with action buttons */}
        <CollectionsHeader 
          onExport={handleExportCollections}
          onAddRoot={handleAddRootCollection}
        />

        {/* Search and filter */}
        <CollectionsSearch 
          searchString={searchString}
          setSearchString={setSearchString}
        />

        {/* Bulk actions */}
        {selectedCollections.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <span className="text-sm font-medium">{selectedCollections.length} collections selected</span>
            <Button 
              variant="destructive" 
              size="sm" 
              className="ml-auto"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete Selected
            </Button>
          </div>
        )}

        {/* Collections Table */}
        <CollectionsContainer 
          collections={collections}
          searchString={searchString}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRename={handleRenameAction}
          onDelete={handleDeleteAction}
          onBulkSelect={handleBulkSelect}
        />
      </div>

      {/* Dialogs */}
      <RenameDialog
        isOpen={isRenameDialogOpen}
        onOpenChange={setIsRenameDialogOpen}
        renamedValue={renamedValue}
        setRenamedValue={setRenamedValue}
        onRename={handleRenameCollection}
      />
      
      <AddDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newNodeName={newCollectionName}
        setNewNodeName={setNewCollectionName}
        onAdd={handleAddCollection}
      />
    </Layout>
  );
};

export default CollectionsPage;
