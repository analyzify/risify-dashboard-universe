
import React from "react";
import Layout from "@/components/Layout";
import { useCollectionsPage } from "@/hooks/useCollectionsPage";
import { RenameDialog, AddDialog } from "@/components/catalog/CollectionDialogs";
import CollectionsHeader from "@/components/catalog/collections/CollectionsHeader";
import CollectionsSearch from "@/components/catalog/collections/CollectionsSearch";
import CollectionsContainer from "@/components/catalog/collections/CollectionsContainer";

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
    handleAddRootCollection
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
