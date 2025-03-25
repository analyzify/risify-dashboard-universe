
import React, { useCallback } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Download, Upload } from "lucide-react";
import { useCollectionTree } from "@/hooks/useCollectionTree";
import CollectionTree from "@/components/catalog/CollectionTree";
import { RenameDialog, AddDialog } from "@/components/catalog/CollectionDialogs";

const CollectionsPage: React.FC = () => {
  const {
    treeData,
    setTreeData,
    searchString,
    setSearchString,
    newNodeName,
    setNewNodeName,
    selectedNodePath,
    setSelectedNodePath,
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
    isMounted
  } = useCollectionTree();

  // Handler for rename action
  const handleRenameAction = useCallback((path: number[], title: string) => {
    setSelectedNodePath(path);
    setRenamedValue(title);
    setIsRenameDialogOpen(true);
  }, [setSelectedNodePath, setRenamedValue, setIsRenameDialogOpen]);

  // Handler for add child action
  const handleAddChildAction = useCallback((path: number[]) => {
    setSelectedNodePath(path);
    setIsAddDialogOpen(true);
  }, [setSelectedNodePath, setIsAddDialogOpen]);

  return (
    <Layout title="Collections">
      <div className="space-y-6">
        {/* Header with action buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Collections</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleExportCollections}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button size="sm" onClick={() => {
              setSelectedNodePath([]);
              setIsAddDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add collection
            </Button>
          </div>
        </div>

        {/* Search and filter */}
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

        {/* Collections Tree with border, better visibility */}
        <div className="border rounded-md p-4 min-h-[500px] bg-white shadow-sm">
          <CollectionTree
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
