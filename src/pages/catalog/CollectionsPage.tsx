
import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/Layout";
import SortableTree, { TreeItem, addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from "react-sortable-tree";
import "react-sortable-tree/style.css";
import "@/styles/SortableTree.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Download, Upload, ArrowUpDown, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define the initial tree data with more comprehensive mock collections
const initialData: TreeItem[] = [
  {
    title: "Women",
    expanded: true,
    children: [
      { 
        title: "Dresses", 
        expanded: true,
        children: [
          { title: "Cocktail Dresses", children: [] },
          { title: "Maxi Dresses", children: [] },
          { title: "Summer Dresses", children: [] },
          { title: "Evening Gowns", children: [] }
        ] 
      },
      { 
        title: "Tops", 
        expanded: true,
        children: [
          { title: "Blouses", children: [] },
          { title: "T-Shirts", children: [] },
          { title: "Sweaters", children: [] }
        ] 
      },
      { 
        title: "Bottoms", 
        expanded: true,
        children: [
          { title: "Jeans", children: [] },
          { title: "Skirts", children: [] },
          { title: "Shorts", children: [] }
        ] 
      },
      { 
        title: "Outerwear",
        expanded: true, 
        children: [
          { title: "Winter Jackets", children: [] },
          { title: "Rain Coats", children: [] },
          { title: "Spring Jackets", children: [] }
        ] 
      }
    ]
  },
  {
    title: "Men",
    expanded: true,
    children: [
      { 
        title: "Shirts", 
        expanded: true,
        children: [
          { title: "Dress Shirts", children: [] },
          { title: "Casual Shirts", children: [] },
          { title: "Polo Shirts", children: [] }
        ] 
      },
      { 
        title: "Pants", 
        expanded: true,
        children: [
          { title: "Chinos", children: [] },
          { title: "Jeans", children: [] },
          { title: "Dress Pants", children: [] }
        ] 
      },
      { 
        title: "Suits", 
        expanded: true,
        children: [
          { title: "Business Suits", children: [] },
          { title: "Tuxedos", children: [] },
          { title: "Casual Blazers", children: [] }
        ] 
      },
      { 
        title: "Outerwear", 
        expanded: true,
        children: [
          { title: "Winter Coats", children: [] },
          { title: "Leather Jackets", children: [] },
          { title: "Rainwear", children: [] }
        ] 
      }
    ]
  },
  {
    title: "Accessories",
    expanded: true,
    children: [
      { 
        title: "Jewelry", 
        expanded: true,
        children: [
          { title: "Necklaces", children: [] },
          { title: "Bracelets", children: [] },
          { title: "Earrings", children: [] },
          { title: "Rings", children: [] }
        ] 
      },
      { 
        title: "Hats", 
        expanded: true,
        children: [
          { title: "Summer Hats", children: [] },
          { title: "Winter Hats", children: [] },
          { title: "Caps", children: [] }
        ] 
      },
      { 
        title: "Bags", 
        expanded: true,
        children: [
          { title: "Handbags", children: [] },
          { title: "Backpacks", children: [] },
          { title: "Clutches", children: [] },
          { title: "Totes", children: [] }
        ] 
      },
      { 
        title: "Shoes", 
        expanded: true,
        children: [
          { 
            title: "Women's Shoes", 
            expanded: true,
            children: [
              { title: "Heels", children: [] },
              { title: "Flats", children: [] },
              { title: "Boots", children: [] }
            ] 
          },
          { 
            title: "Men's Shoes", 
            expanded: true,
            children: [
              { title: "Dress Shoes", children: [] },
              { title: "Sneakers", children: [] },
              { title: "Boots", children: [] }
            ] 
          }
        ] 
      }
    ]
  },
  {
    title: "Home",
    expanded: true,
    children: [
      { 
        title: "Living Room",
        expanded: true, 
        children: [
          { title: "Sofas", children: [] },
          { title: "Coffee Tables", children: [] },
          { title: "Throw Pillows", children: [] },
          { title: "Lighting", children: [] }
        ] 
      },
      { 
        title: "Bedroom", 
        expanded: true,
        children: [
          { title: "Bedding", children: [] },
          { title: "Mattresses", children: [] },
          { title: "Nightstands", children: [] }
        ] 
      },
      { 
        title: "Kitchen", 
        expanded: true,
        children: [
          { title: "Cookware", children: [] },
          { title: "Appliances", children: [] },
          { title: "Tableware", children: [] },
          { 
            title: "Storage", 
            expanded: true,
            children: [
              { title: "Pantry Organizers", children: [] },
              { title: "Spice Racks", children: [] },
              { title: "Food Containers", children: [] }
            ] 
          }
        ] 
      }
    ]
  },
  {
    title: "Sale",
    expanded: true,
    children: [
      { title: "Clearance", children: [] },
      { title: "Seasonal Markdowns", children: [] },
      { title: "Flash Sales", children: [] }
    ]
  }
];

// Error boundary component to catch any errors in the tree
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-center">Something went wrong with the collections tree. Please try refreshing the page.</div>;
    }
    return this.props.children;
  }
}

const CollectionsPage: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>(initialData);
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
    }, 800); // Increased delay to ensure DOM is fully ready
    
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

    // If no selected node, add to root
    if (selectedNodePath.length === 0) {
      setTreeData([
        ...treeData,
        { title: newNodeName, children: [] }
      ]);
    } else {
      // Otherwise add as a child to the selected node
      const { treeData: newTree } = addNodeUnderParent({
        treeData,
        parentKey: selectedNodePath[selectedNodePath.length - 1],
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: { title: newNodeName, children: [] }
      });
      setTreeData(newTree);
    }
    
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

    const newTree = changeNodeAtPath({
      treeData,
      path: selectedNodePath,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: { 
        ...getNodeAtPath(treeData, selectedNodePath).node,
        title: renamedValue 
      }
    });
    
    setTreeData(newTree);
    setIsRenameDialogOpen(false);
    toast({
      title: "Success",
      description: "Collection renamed successfully"
    });
  }, [renamedValue, selectedNodePath, treeData]);

  // Function to handle deleting a collection
  const handleDeleteCollection = useCallback((path: number[]) => {
    setTreeData(
      removeNodeAtPath({
        treeData,
        path,
        getNodeKey: ({ treeIndex }) => treeIndex
      })
    );
    
    toast({
      title: "Success",
      description: "Collection deleted successfully"
    });
  }, [treeData]);

  // Function to get a node at a specific path
  const getNodeAtPath = (data: TreeItem[], path: number[]) => {
    let currentNode = null;
    let currentTreeData = data;
    
    for (let i = 0; i < path.length; i++) {
      const index = path[i];
      currentNode = currentTreeData[index];
      if (currentNode && currentNode.children) {
        currentTreeData = currentNode.children;
      }
    }
    
    return { node: currentNode, treeData: currentTreeData };
  };

  // Export collections as JSON
  const exportCollections = useCallback(() => {
    const dataStr = JSON.stringify(treeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'collections.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Success",
      description: "Collections exported successfully"
    });
  }, [treeData]);

  // Custom node render to add action buttons
  const renderNode = useCallback(({ node, path }: { node: TreeItem, path: number[] }) => {
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
              <DropdownMenuItem onClick={() => {
                setSelectedNodePath(path);
                setRenamedValue(String(node.title));
                setIsRenameDialogOpen(true);
              }}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setSelectedNodePath(path);
                setIsAddDialogOpen(true);
              }}>
                Add child
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteCollection(path)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }, [handleDeleteCollection]);

  // Render the tree component with error boundary
  const renderTree = useCallback(() => {
    if (!treeReady) {
      return (
        <div className="flex justify-center items-center h-[500px]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading collections...</p>
          </div>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <DndProvider backend={HTML5Backend}>
          <div style={{ height: 500 }} className="tree-wrapper">
            <SortableTree
              treeData={treeData}
              onChange={setTreeData}
              searchQuery={searchString}
              searchFocusOffset={0}
              searchFinishCallback={(matches) => {
                if (isMounted.current) {
                  console.log(`${matches.length} nodes found`);
                }
              }}
              canDrag={true}
              generateNodeProps={({ node, path }) => ({
                title: renderNode({ node, path: path as number[] })
              })}
              style={{ width: '100%' }}
              innerStyle={{ padding: '15px' }}
            />
          </div>
        </DndProvider>
      </ErrorBoundary>
    );
  }, [treeData, treeReady, searchString, renderNode]);

  // Debug log to ensure data is available
  useEffect(() => {
    console.log("Tree data:", treeData);
    console.log("Tree ready state:", treeReady);
  }, [treeData, treeReady]);

  return (
    <Layout title="Collections">
      <div className="space-y-6">
        {/* Header with action buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Collections</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={exportCollections}>
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
          {renderTree()}
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Collection</DialogTitle>
            <DialogDescription>
              Enter a new name for this collection.
            </DialogDescription>
          </DialogHeader>
          <Input 
            value={renamedValue}
            onChange={(e) => setRenamedValue(e.target.value)}
            placeholder="Collection name"
            className="mt-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameCollection}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Collection Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Collection</DialogTitle>
            <DialogDescription>
              Enter a name for the new collection.
            </DialogDescription>
          </DialogHeader>
          <Input 
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            placeholder="Collection name"
            className="mt-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCollection}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CollectionsPage;
