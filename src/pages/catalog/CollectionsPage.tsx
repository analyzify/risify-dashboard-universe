
import React from "react";
import Layout from "@/components/Layout";
import { useCollectionsPage } from "@/hooks/useCollectionsPage";
import { RenameDialog, AddDialog } from "@/components/catalog/CollectionDialogs";
import CollectionsHeader from "@/components/catalog/collections/CollectionsHeader";
import CollectionsSearch from "@/components/catalog/collections/CollectionsSearch";
import CollectionsContainer from "@/components/catalog/collections/CollectionsContainer";

const CollectionsPage: React.FC = () => {
  const {
    treeData,
    setTreeData,
    searchString,
    setSearchString,
    newNodeName,
    setNewNodeName,
    selectedNodePath,
    isRenameDialogOpen,
    setIsRenameDialogOpen,
    isAddDialogOpen,
    setIsAddDialogOpen,
    renamedValue,
    setRenamedValue,
    treeReady,
    handleAddCollection,
    handleRenameCollection,
    handleDeleteCollection,
    handleExportCollections,
    isMounted,
    handleRenameAction,
    handleAddChildAction,
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

        {/* Collections Tree */}
        <CollectionsContainer 
          treeData={treeData}
          setTreeData={setTreeData}
          searchString={searchString}
          treeReady={treeReady}
          isMounted={isMounted}
          onRename={handleRenameAction}
          onAddChild={handleAddChildAction}
          onDelete={handleDeleteCollection}
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
        newNodeName={newNodeName}
        setNewNodeName={setNewNodeName}
        onAdd={handleAddCollection}
      />
    </Layout>
  );
};

export default CollectionsPage;
