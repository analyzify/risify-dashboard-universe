
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ListTree, 
  File, 
  FileText, 
  Plus, 
  ShoppingBag, 
  Home,
  Filter,
  FileEdit,
  Crown,
  PlusCircle,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for existing pages
const existingPages = [
  {
    id: 1,
    title: "Best Insulated Water Bottles Guide",
    url: "/guides/best-insulated-water-bottles",
    type: "guide",
    primaryKeyword: "best insulated water bottle",
    secondaryKeywords: [
      "insulated water bottle comparison",
      "top insulated water bottles",
      "water bottle temperature retention"
    ],
    status: "published",
    coverage: 85
  },
  {
    id: 2,
    title: "Stainless Steel Water Bottles",
    url: "/products/stainless-steel-water-bottles",
    type: "product",
    primaryKeyword: "stainless steel water bottle",
    secondaryKeywords: [
      "metal water bottle",
      "durable water bottle"
    ],
    status: "published",
    coverage: 70
  },
  {
    id: 3,
    title: "How to Clean Water Bottles",
    url: "/guides/how-to-clean-water-bottles",
    type: "article",
    primaryKeyword: "how to clean water bottle",
    secondaryKeywords: [
      "water bottle cleaning techniques",
      "clean water bottle stains"
    ],
    status: "published",
    coverage: 90
  },
  {
    id: 4,
    title: "Eco-Friendly Water Bottles",
    url: "/guides/eco-friendly-water-bottles",
    type: "guide",
    primaryKeyword: "eco-friendly water bottles",
    secondaryKeywords: [
      "sustainable water bottles",
      "environmentally friendly water bottles"
    ],
    status: "draft",
    coverage: 45
  }
];

// Mock unmapped keywords
const unmappedKeywords = [
  "collapsible water bottle",
  "kids water bottle",
  "water bottle accessories",
  "glass water bottle",
  "water bottle with time markers",
  "smart water bottle",
  "vacuum insulated water bottle",
  "filtered water bottle"
];

// Get page type icon
const getPageTypeIcon = (type: string) => {
  switch (type) {
    case "product":
      return <ShoppingBag className="h-4 w-4" />;
    case "guide":
      return <FileText className="h-4 w-4" />;
    case "article":
      return <File className="h-4 w-4" />;
    case "homepage":
      return <Home className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
};

// Get coverage color
const getCoverageColor = (coverage: number) => {
  if (coverage >= 80) return "text-green-600";
  if (coverage >= 50) return "text-yellow-600";
  return "text-red-600";
};

const KeywordMapping = () => {
  const [pages, setPages] = useState(existingPages);
  const [keywords, setKeywords] = useState(unmappedKeywords);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter pages based on selected filters
  const filteredPages = pages.filter(page => {
    if (filterType !== "all" && page.type !== filterType) return false;
    if (filterStatus !== "all" && page.status !== filterStatus) return false;
    return true;
  });
  
  // Create suggested page mappings
  const suggestedMappings = [
    {
      keyword: "collapsible water bottle",
      suggestedPage: "New Product Page",
      confidence: 92,
      reason: "Unique product type without existing coverage"
    },
    {
      keyword: "filtered water bottle",
      suggestedPage: existingPages[1].title,
      confidence: 75,
      reason: "Related to existing product category"
    },
    {
      keyword: "water bottle accessories",
      suggestedPage: "New Category Page",
      confidence: 85,
      reason: "Collection of related products without current mapping"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <Select defaultValue="all" onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Page Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Page Types</SelectItem>
              <SelectItem value="product">Product Pages</SelectItem>
              <SelectItem value="guide">Guides</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all" onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            New Page
          </Button>
        </div>
      </div>
      
      {/* Current pages with keywords */}
      <div className="rounded-md border">
        <div className="bg-muted p-3 flex justify-between items-center">
          <h3 className="font-medium flex items-center gap-2">
            <ListTree className="h-4 w-4" />
            Current Content Mapping
          </h3>
          <div className="text-sm text-muted-foreground">
            {pages.length} pages mapped
          </div>
        </div>
        
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">Page</TableHead>
                <TableHead>Primary Keyword</TableHead>
                <TableHead>Secondary Keywords</TableHead>
                <TableHead className="w-[100px]">Coverage</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        {getPageTypeIcon(page.type)}
                      </div>
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {page.url}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Crown className="h-3 w-3 text-amber-500" />
                      <span>{page.primaryKeyword}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {page.secondaryKeywords.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${getCoverageColor(page.coverage)}`}>
                      {page.coverage}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={page.status === "published" ? "default" : "outline"}
                      className={page.status === "published" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {page.status === "published" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Unmapped keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unmapped keywords section */}
        <div className="rounded-md border">
          <div className="bg-muted p-3 flex justify-between items-center">
            <h3 className="font-medium">Unmapped Keywords</h3>
            <div className="text-sm text-muted-foreground">
              {keywords.length} keywords
            </div>
          </div>
          
          <div className="p-3">
            <div className="space-y-2">
              {keywords.map((keyword, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center border rounded-md p-2"
                >
                  <span>{keyword}</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Suggested mappings */}
        <div className="rounded-md border">
          <div className="bg-muted p-3">
            <h3 className="font-medium">Suggested Mappings</h3>
          </div>
          
          <div className="divide-y">
            {suggestedMappings.map((suggestion, index) => (
              <div key={index} className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{suggestion.keyword}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <ArrowRight className="h-3 w-3" />
                      {suggestion.suggestedPage}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={suggestion.confidence >= 80 ? "text-green-600 border-green-300" : "text-yellow-600 border-yellow-300"}
                  >
                    {suggestion.confidence}% match
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  {suggestion.reason}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Skip</Button>
                  <Button size="sm">Map Keyword</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content gap analysis */}
      <div className="rounded-md border">
        <div className="bg-muted p-3">
          <h3 className="font-medium">Content Gap Analysis</h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Missing Coverage: "Water Bottles for Kids"</h4>
                <p className="text-sm text-muted-foreground">
                  Several keywords related to children's water bottles have no content mapping.
                </p>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-md p-3">
              <h5 className="text-sm font-medium mb-2">Related Keywords:</h5>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">kids water bottle</Badge>
                <Badge variant="outline">children's water bottle</Badge>
                <Badge variant="outline">school water bottle</Badge>
                <Badge variant="outline">water bottle for toddlers</Badge>
              </div>
              
              <div className="mt-3 flex justify-end">
                <Button>Create New Page</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordMapping;
