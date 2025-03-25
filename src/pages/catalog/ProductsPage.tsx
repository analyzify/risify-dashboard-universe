
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { 
  MoreHorizontal, 
  Filter, 
  Search, 
  ArrowUpDown, 
  Plus, 
  Download, 
  Upload,
  Package,
  Tag,
  Lightbulb
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Ergonomic Desk Chair",
    category: "Office Furniture",
    type: "Chair",
    vendor: "ErgoWorks"
  },
  {
    id: 2,
    name: "Premium Mechanical Keyboard",
    category: "Computer Accessories",
    type: "Input Device",
    vendor: "TechType"
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio Equipment",
    type: "Headphones",
    vendor: "SoundWave"
  },
  {
    id: 4,
    name: "Ultra-Wide Curved Monitor",
    category: "Displays",
    type: "Monitor",
    vendor: "VisualTech"
  },
  {
    id: 5,
    name: "Smart Home Hub",
    category: "Smart Home",
    type: "Control Hub",
    vendor: "HomeConnect"
  },
  {
    id: 6,
    name: "Portable External SSD",
    category: "Storage Devices",
    type: "External Drive",
    vendor: "DataSpeed"
  },
  {
    id: 7,
    name: "Professional Drawing Tablet",
    category: "Creative Tools",
    type: "Input Device",
    vendor: "ArtTech"
  },
  {
    id: 8,
    name: "Adjustable Standing Desk",
    category: "Office Furniture",
    type: "Desk",
    vendor: "ErgoWorks"
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    category: "Charging Accessories",
    type: "Charger",
    vendor: "PowerUp"
  },
  {
    id: 10,
    name: "Ergonomic Vertical Mouse",
    category: "Computer Accessories",
    type: "Input Device",
    vendor: "ErgoWorks"
  }
];

// Updated statistics
const inventoryStats = {
  sellThrough: "0.4%",
  dayZero: "735",
  day1to30: "435",
  day31to90: "318",
  day91plus: "991"
};

// Product analysis
const productAnalysis = {
  gradeA: "kr 137M",
  gradeB: "kr 69.6M",
  gradeC: "kr 1.5B"
};

const ProductsPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(mockProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    }
  };

  const handleAssignKeyword = (productId: number) => {
    console.log(`Assign keyword to product ${productId}`);
    // Add your implementation for assigning keywords
  };

  const handleGetOptimizationIdeas = (productId: number) => {
    console.log(`Get optimization ideas for product ${productId}`);
    // Add your implementation for getting optimization ideas
  };

  // Filter products based on search term
  const searchedProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Products">
      <div className="space-y-6">
        {/* Header with action buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <div className="relative">
              <Button variant="outline" size="sm">
                More actions
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add product
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Products by sell-through rate */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Products by sell-through rate</h3>
              <div className="flex items-center">
                <span className="text-2xl font-semibold">{inventoryStats.sellThrough}</span>
                <span className="text-gray-500 ml-2">average rate</span>
              </div>
            </CardContent>
          </Card>

          {/* Products by days of inventory remaining */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Products by days of inventory remaining</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{inventoryStats.dayZero}</span>
                  <span className="text-sm text-gray-500">0 days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{inventoryStats.day1to30}</span>
                  <span className="text-sm text-gray-500">1-30 days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{inventoryStats.day31to90}</span>
                  <span className="text-sm text-gray-500">31-90 days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{inventoryStats.day91plus}</span>
                  <span className="text-sm text-gray-500">91+ days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ABC product analysis */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">ABC product analysis</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{productAnalysis.gradeA}</span>
                  <span className="text-sm text-gray-500">A-grade</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{productAnalysis.gradeB}</span>
                  <span className="text-sm text-gray-500">B-grade</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">{productAnalysis.gradeC}</span>
                  <span className="text-sm text-gray-500">C-grade</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === "All" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("All")}
            >
              All
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-9" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedProducts.length === mockProducts.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchedProducts.length > 0 ? (
                searchedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.vendor}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAssignKeyword(product.id)}>
                            <Tag className="mr-2 h-4 w-4" />
                            Assign keyword
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGetOptimizationIdeas(product.id)}>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Get optimization ideas
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No products found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {searchedProducts.length} of {mockProducts.length} products
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
