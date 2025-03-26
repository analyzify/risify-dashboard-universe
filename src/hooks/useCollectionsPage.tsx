
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export interface Collection {
  id: string;
  title: string;
  parentId?: string | null;
}

// Mock data for collections
const mockCollections: Collection[] = [
  { id: '1', title: 'Electronics' },
  { id: '2', title: 'Clothing' },
  { id: '3', title: 'Home & Kitchen' },
  { id: '4', title: 'Books' },
  { id: '5', title: 'Toys & Games' },
  { id: '6', title: 'Sports & Outdoors' },
  { id: '7', title: 'Beauty & Personal Care' },
  { id: '8', title: 'Health & Household' },
  { id: '9', title: 'Automotive' },
  { id: '10', title: 'Pet Supplies' },
  { id: '11', title: 'Office Products' },
  { id: '12', title: 'Garden & Outdoor' },
  { id: '13', title: 'Tools & Home Improvement' },
  { id: '14', title: 'Grocery & Gourmet Food' },
  { id: '15', title: 'Industrial & Scientific' },
];

export const useCollectionsPage = () => {
  // Collections state
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Dialog states
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [renamedValue, setRenamedValue] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Get filtered and paginated collections
  const getFilteredCollections = useCallback(() => {
    let filtered = collections;
    
    if (searchString.trim() !== '') {
      filtered = collections.filter(c => 
        c.title.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    
    return filtered;
  }, [collections, searchString]);

  const getPaginatedCollections = useCallback(() => {
    const filtered = getFilteredCollections();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return filtered.slice(startIndex, endIndex);
  }, [getFilteredCollections, currentPage]);

  const totalPages = Math.max(1, Math.ceil(getFilteredCollections().length / itemsPerPage));

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Handle actions
  const handleRenameAction = useCallback((id: string, title: string) => {
    setSelectedCollectionId(id);
    setRenamedValue(title);
    setIsRenameDialogOpen(true);
  }, []);

  const handleDeleteAction = useCallback((id: string) => {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this collection?')) {
      setCollections(prev => prev.filter(c => c.id !== id));
      toast.success('Collection deleted successfully');
    }
  }, []);

  const handleRenameCollection = useCallback(() => {
    if (!selectedCollectionId || !renamedValue.trim()) return;
    
    setCollections(prev => 
      prev.map(c => 
        c.id === selectedCollectionId ? { ...c, title: renamedValue } : c
      )
    );
    
    setIsRenameDialogOpen(false);
    toast.success('Collection renamed successfully');
  }, [selectedCollectionId, renamedValue]);

  const handleAddCollection = useCallback(() => {
    if (!newCollectionName.trim()) return;
    
    const newId = String(collections.length + 1);
    setCollections(prev => [...prev, { id: newId, title: newCollectionName }]);
    
    setIsAddDialogOpen(false);
    setNewCollectionName('');
    toast.success('Collection added successfully');
  }, [newCollectionName, collections]);

  const handleAddRootCollection = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const handleExportCollections = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(collections));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "collections.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success('Collections exported successfully');
  }, [collections]);

  return {
    collections: getPaginatedCollections(),
    loading,
    searchString,
    setSearchString,
    currentPage,
    totalPages,
    handlePageChange,
    newCollectionName,
    setNewCollectionName,
    selectedCollectionId,
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
  };
};
