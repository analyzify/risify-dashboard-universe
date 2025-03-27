
import React, { useState } from "react";
import { Search, Plus, Filter, MoreVertical, Check, Copy, Link2, ShoppingBag, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ContentType = "faq" | "hero" | "testimonial" | "cta";

interface Reference {
  id: string;
  title: string;
  type: "product" | "collection" | "page";
  url: string;
}

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  updatedAt: string;
  selected?: boolean;
  references?: Reference[];
}

const ContentManagement = () => {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allSelected, setAllSelected] = useState(false);
  const [showReferencesDialog, setShowReferencesDialog] = useState(false);
  const [selectedReferences, setSelectedReferences] = useState<Reference[]>([]);
  const [selectedItemTitle, setSelectedItemTitle] = useState("");
  const itemsPerPage = 5;
  
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "What is Risify's return policy?",
      type: "faq",
      updatedAt: "Jun 1, 2023",
      references: [
        { id: "r1", title: "Returns & Exchanges", type: "page", url: "/pages/returns" },
        { id: "r2", title: "Customer Support", type: "page", url: "/pages/support" },
        { id: "r3", title: "Terms & Conditions", type: "page", url: "/pages/terms" },
      ]
    },
    {
      id: "2",
      title: "How do I switch this product on and off?",
      type: "faq",
      updatedAt: "May 30, 2023",
      references: [
        { id: "r4", title: "Smart Home Hub", type: "product", url: "/products/smart-home-hub" },
        { id: "r5", title: "Electronic Devices", type: "collection", url: "/collections/electronics" },
      ]
    },
    {
      id: "3",
      title: "How does Risify FAQ work?",
      type: "faq",
      updatedAt: "Apr 25, 2023",
      references: [
        { id: "r6", title: "Help Center", type: "page", url: "/pages/help" },
      ]
    },
    {
      id: "4",
      title: "Summer Collection Showcase",
      type: "hero",
      updatedAt: "May 15, 2023",
      references: [
        { id: "r7", title: "Summer Collection", type: "collection", url: "/collections/summer" },
        { id: "r8", title: "Featured Products", type: "collection", url: "/collections/featured" },
      ]
    },
    {
      id: "5",
      title: "Customer Success Story",
      type: "testimonial",
      updatedAt: "Apr 10, 2023",
      references: [
        { id: "r9", title: "Testimonials", type: "page", url: "/pages/testimonials" },
        { id: "r10", title: "About Us", type: "page", url: "/pages/about" },
      ]
    },
    {
      id: "6",
      title: "Limited Time Offer",
      type: "cta",
      updatedAt: "Jun 5, 2023",
      references: [
        { id: "r11", title: "Sale Items", type: "collection", url: "/collections/sale" },
        { id: "r12", title: "New Arrivals", type: "collection", url: "/collections/new" },
      ]
    },
    {
      id: "7",
      title: "Product Care Instructions",
      type: "faq",
      updatedAt: "Jun 10, 2023",
      references: [
        { id: "r13", title: "Care Guide", type: "page", url: "/pages/care-guide" },
      ]
    },
    {
      id: "8",
      title: "Spring Sale Banner",
      type: "hero",
      updatedAt: "Mar 20, 2023",
      references: [
        { id: "r14", title: "Spring Collection", type: "collection", url: "/collections/spring" },
      ]
    },
    {
      id: "9",
      title: "New Customer Review",
      type: "testimonial",
      updatedAt: "May 22, 2023",
      references: []
    },
    {
      id: "10",
      title: "Holiday Special Offer",
      type: "cta",
      updatedAt: "Dec 1, 2023",
      references: [
        { id: "r15", title: "Holiday Collection", type: "collection", url: "/collections/holiday" },
        { id: "r16", title: "Gift Ideas", type: "collection", url: "/collections/gifts" },
        { id: "r17", title: "Seasonal Products", type: "collection", url: "/collections/seasonal" },
      ]
    },
    {
      id: "11",
      title: "Shipping Information",
      type: "faq",
      updatedAt: "Jul 5, 2023",
      references: [
        { id: "r18", title: "Shipping Policy", type: "page", url: "/pages/shipping" },
        { id: "r19", title: "FAQ", type: "page", url: "/pages/faq" },
      ]
    },
  ]);

  const filterByType = (type: ContentType) => {
    setSelectedType(type === selectedType ? null : type);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredContent = contentItems.filter(item => {
    if (selectedType && item.type !== selectedType) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContent = filteredContent.slice(startIndex, startIndex + itemsPerPage);

  const handleCheckboxChange = (id: string) => {
    setContentItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    const newAllSelected = !allSelected;
    setAllSelected(newAllSelected);
    
    setContentItems(items =>
      items.map(item => {
        if (filteredContent.some(filtered => filtered.id === item.id)) {
          return { ...item, selected: newAllSelected };
        }
        return item;
      })
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAction = (action: string, items: ContentItem | ContentItem[]) => {
    const itemsList = Array.isArray(items) ? items : [items];
    const itemNames = itemsList.map(item => item.title).join(", ");
    
    switch (action) {
      case "edit":
        toast.success(`Editing: ${itemNames}`);
        break;
      case "duplicate":
        toast.success(`Duplicated: ${itemNames}`);
        break;
      case "assignToProduct":
        toast.success(`Assigning to product: ${itemNames}`);
        break;
      case "assignToCollection":
        toast.success(`Assigning to collection: ${itemNames}`);
        break;
      default:
        break;
    }
  };

  const getSelectedItems = () => {
    return contentItems.filter(item => item.selected);
  };

  const selectedCount = getSelectedItems().length;

  const openReferencesDialog = (item: ContentItem) => {
    setSelectedReferences(item.references || []);
    setSelectedItemTitle(item.title);
    setShowReferencesDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">CMS</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add content
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Badge 
            variant={selectedType === "faq" ? "default" : "outline"} 
            className="cursor-pointer px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600"
            onClick={() => filterByType("faq")}
          >
            FAQ
          </Badge>
          <Badge 
            variant={selectedType === "hero" ? "default" : "outline"} 
            className="cursor-pointer px-3 py-1 text-xs bg-purple-500 hover:bg-purple-600"
            onClick={() => filterByType("hero")}
          >
            Hero
          </Badge>
          <Badge 
            variant={selectedType === "testimonial" ? "default" : "outline"} 
            className="cursor-pointer px-3 py-1 text-xs bg-green-500 hover:bg-green-600"
            onClick={() => filterByType("testimonial")}
          >
            Testimonials
          </Badge>
          <Badge 
            variant={selectedType === "cta" ? "default" : "outline"} 
            className="cursor-pointer px-3 py-1 text-xs bg-amber-500 hover:bg-amber-600"
            onClick={() => filterByType("cta")}
          >
            CTA
          </Badge>
        </div>

        <div className="flex items-center space-x-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search content..."
              className="h-10 w-full rounded-md border border-input pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-3 w-3" /> Filter
          </Button>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="bg-muted/50 p-2 rounded-md flex items-center justify-between">
          <div className="text-sm">
            {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions <MoreVertical className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => handleAction("edit", getSelectedItems())}>
                  <Check className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("duplicate", getSelectedItems())}>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("assignToProduct", getSelectedItems())}>
                  <ShoppingBag className="mr-2 h-4 w-4" /> Assign to Product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("assignToCollection", getSelectedItems())}>
                  <Link2 className="mr-2 h-4 w-4" /> Assign to Collection
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>References</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={item.selected || false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.title}</div>
                </TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    onClick={() => openReferencesDialog(item)}
                  >
                    {item.references?.length || 0} references
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem onClick={() => handleAction("edit", item)}>
                        <Check className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("duplicate", item)}>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("assignToProduct", item)}>
                        <ShoppingBag className="mr-2 h-4 w-4" /> Assign to Product
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("assignToCollection", item)}>
                        <Link2 className="mr-2 h-4 w-4" /> Assign to Collection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredContent.length === 0 ? (
          <div className="flex justify-center items-center py-8 text-muted-foreground">
            No content found
          </div>
        ) : (
          <div className="py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* References Dialog */}
      <Dialog open={showReferencesDialog} onOpenChange={setShowReferencesDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>References for "{selectedItemTitle}"</DialogTitle>
            <DialogDescription>
              This content is used in the following locations:
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-auto">
            {selectedReferences.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No references found.</p>
            ) : (
              <div className="space-y-3 mt-4">
                {selectedReferences.map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <Badge variant="outline" className={cn(
                        "text-xs mr-2",
                        ref.type === "product" ? "border-blue-200 bg-blue-50 text-blue-700" :
                        ref.type === "collection" ? "border-purple-200 bg-purple-50 text-purple-700" :
                        "border-green-200 bg-green-50 text-green-700"
                      )}>
                        {ref.type}
                      </Badge>
                      <span className="text-sm font-medium">{ref.title}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7" asChild>
                      <a href={ref.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
