
import { useState, useEffect, useRef, useCallback } from "react";
import { TreeItem } from "react-sortable-tree";
import { toast } from "@/hooks/use-toast";
import { initialCollections } from "@/data/initialCollections";
import { addCollection, renameCollection, deleteCollection, exportCollections } from "@/utils/collectionUtils";

export const useCollectionTree = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>(initialCollections);
  const [searchString, setSearchString] = useState("");
  const [newNodeName, setNewNodeName] = useState("");
  const [selectedNodePath, setSelectedNodePath] = useState<number[]>([]);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [renamedValue, setRenamedValue] = useState("");
  const [treeReady, setTreeReady] = useState(false);
  
  // Reference to track component mounted state
  const isMounted = useRef(true);

  // Handle component mount/unmount lifecycle
  useEffect(() => {
    // Set isMounted to true on mount
    isMounted.current = true;
    
    // Short delay to ensure proper initialization
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setTreeReady(true);
      }
    }, 800); // Delay to ensure DOM is fully ready
    
    return () => {
      isMounted.current = false;
      setTreeReady(false);
      clearTimeout(timer);
    };
  }, []);
  
  // Function to handle adding a new collection
  const handleAddCollection = useCallback(() => {
    if (newNodeName.trim() === "") {
      toast({
        title: "Error",
        description: "Collection name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newTreeData = addCollection(treeData, newNodeName, selectedNodePath);
    setTreeData(newTreeData);
    
    setNewNodeName("");
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Collection added successfully"
    });
  }, [newNodeName, selectedNodePath, treeData]);

  // Function to handle renaming a collection
  const handleRenameCollection = useCallback(() => {
    if (renamedValue.trim() === "") {
      toast({
        title: "Error",
        description: "Collection name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newTree = renameCollection(treeData, selectedNodePath, renamedValue);
    
    setTreeData(newTree);
    setIsRenameDialogOpen(false);
    toast({
      title: "Success",
      description: "Collection renamed successfully"
    });
  }, [renamedValue, selectedNodePath, treeData]);

  // Function to handle deleting a collection
  const handleDeleteCollection = useCallback((path: number[]) => {
    const newTreeData = deleteCollection(treeData, path);
    setTreeData(newTreeData);
    
    toast({
      title: "Success",
      description: "Collection deleted successfully"
    });
  }, [treeData]);
  
  // Function to handle exporting collections
  const handleExportCollections = useCallback(() => {
    exportCollections(treeData, () => {
      toast({
        title: "Success",
        description: "Collections exported successfully"
      });
    });
  }, [treeData]);
  
  // Debug log to ensure data is available
  useEffect(() => {
    console.log("Tree data:", treeData);
    console.log("Tree ready state:", treeReady);
  }, [treeData, treeReady]);

  return {
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
  };
};
