
import { useCallback } from "react";
import { useCollectionTree } from "@/hooks/useCollectionTree";

export const useCollectionsPage = () => {
  const collectionTreeState = useCollectionTree();
  
  // Handler for rename action
  const handleRenameAction = useCallback((path: number[], title: string) => {
    collectionTreeState.setSelectedNodePath(path);
    collectionTreeState.setRenamedValue(title);
    collectionTreeState.setIsRenameDialogOpen(true);
  }, [collectionTreeState.setSelectedNodePath, collectionTreeState.setRenamedValue, collectionTreeState.setIsRenameDialogOpen]);

  // Handler for add child action
  const handleAddChildAction = useCallback((path: number[]) => {
    collectionTreeState.setSelectedNodePath(path);
    collectionTreeState.setIsAddDialogOpen(true);
  }, [collectionTreeState.setSelectedNodePath, collectionTreeState.setIsAddDialogOpen]);
  
  // Handler for add root collection
  const handleAddRootCollection = useCallback(() => {
    collectionTreeState.setSelectedNodePath([]);
    collectionTreeState.setIsAddDialogOpen(true);
  }, [collectionTreeState.setSelectedNodePath, collectionTreeState.setIsAddDialogOpen]);

  return {
    ...collectionTreeState,
    handleRenameAction,
    handleAddChildAction,
    handleAddRootCollection
  };
};
