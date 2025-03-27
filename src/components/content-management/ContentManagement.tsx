
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
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
import { cn } from "@/lib/utils";

type ContentType = "faq" | "hero" | "testimonial" | "cta";

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  addedBy: string;
  updatedAt: string;
  selected?: boolean;
}

const ContentManagement = () => {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "What is Risify's return policy?",
      type: "faq",
      addedBy: "Jane Cooper",
      updatedAt: "Jun 1, 2023",
    },
    {
      id: "2",
      title: "How do I switch this product on and off?",
      type: "faq",
      addedBy: "Jane Cooper",
      updatedAt: "May 30, 2023",
    },
    {
      id: "3",
      title: "How does Risify FAQ work?",
      type: "faq",
      addedBy: "Jane Cooper",
      updatedAt: "Apr 25, 2023",
    },
    {
      id: "4",
      title: "Summer Collection Showcase",
      type: "hero",
      addedBy: "Mark Johnson",
      updatedAt: "May 15, 2023",
    },
    {
      id: "5",
      title: "Customer Success Story",
      type: "testimonial",
      addedBy: "Sarah Williams",
      updatedAt: "Apr 10, 2023",
    },
    {
      id: "6",
      title: "Limited Time Offer",
      type: "cta",
      addedBy: "David Brown",
      updatedAt: "Jun 5, 2023",
    },
  ]);

  const filterByType = (type: ContentType | null) => {
    setSelectedType(type);
  };

  const filteredContent = contentItems.filter(item => {
    if (selectedType && item.type !== selectedType) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCheckboxChange = (id: string) => {
    setContentItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Entries from: {selectedType ? selectedType.toUpperCase() : "All Content"}</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add content
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Badge 
          variant={selectedType === null ? "default" : "outline"} 
          className="cursor-pointer px-3 py-1 text-xs"
          onClick={() => filterByType(null)}
        >
          All
        </Badge>
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

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input 
          type="text"
          placeholder="Searching in All"
          className="h-10 w-full rounded-md border border-input pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center py-2">
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-3 w-3" /> Add filter
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Added by</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.map((item) => (
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
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.title}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        item.type === "faq" && "border-blue-200 bg-blue-50 text-blue-700",
                        item.type === "hero" && "border-purple-200 bg-purple-50 text-purple-700",
                        item.type === "testimonial" && "border-green-200 bg-green-50 text-green-700",
                        item.type === "cta" && "border-amber-200 bg-amber-50 text-amber-700"
                      )}
                    >
                      {item.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{item.addedBy}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredContent.length === 0 && (
          <div className="flex justify-center items-center py-8 text-muted-foreground">
            No content found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
