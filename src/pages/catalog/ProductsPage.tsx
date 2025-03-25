
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
  Check
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Ergonomic Desk Chair",
    status: "Draft",
    inventory: "24 in stock",
    sales: 12,
    channels: 2,
    category: "Office Furniture",
    type: "Chair",
    vendor: "ErgoWorks"
  },
  {
    id: 2,
    name: "Premium Mechanical Keyboard",
    status: "Active",
    inventory: "38 in stock",
    sales: 28,
    channels: 3,
    category: "Computer Accessories",
    type: "Input Device",
    vendor: "TechType"
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    status: "Active",
    inventory: "15 in stock",
    sales: 42,
    channels: 4,
    category: "Audio Equipment",
    type: "Headphones",
    vendor: "SoundWave"
  },
  {
    id: 4,
    name: "Ultra-Wide Curved Monitor",
    status: "Draft",
    inventory: "7 in stock",
    sales: 9,
    channels: 2,
    category: "Displays",
    type: "Monitor",
    vendor: "VisualTech"
  },
  {
    id: 5,
    name: "Smart Home Hub",
    status: "Active",
    inventory: "32 in stock",
    sales: 56,
    channels: 5,
    category: "Smart Home",
    type: "Control Hub",
    vendor: "HomeConnect"
  },
  {
    id: 6,
    name: "Portable External SSD",
    status: "Draft",
    inventory: "0 in stock for 2 variants",
    sales: 18,
    channels: 3,
    category: "Storage Devices",
    type: "External Drive",
    vendor: "DataSpeed"
  },
  {
    id: 7,
    name: "Professional Drawing Tablet",
    status: "Archived",
    inventory: "5 in stock",
    sales: 11,
    channels: 2,
    category: "Creative Tools",
    type: "Input Device",
    vendor: "ArtTech"
  },
  {
    id: 8,
    name: "Adjustable Standing Desk",
    status: "Active",
    inventory: "12 in stock",
    sales: 31,
    channels: 3,
    category: "Office Furniture",
    type: "Desk",
    vendor: "ErgoWorks"
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    status: "Active",
    inventory: "48 in stock",
    sales: 87,
    channels: 4,
    category: "Charging Accessories",
    type: "Charger",
    vendor: "PowerUp"
  },
  {
    id: 10,
    name: "Ergonomic Vertical Mouse",
    status: "Draft",
    inventory: "19 in stock",
    sales: 24,
    channels: 2,
    category: "Computer Accessories",
    type: "Input Device",
    vendor: "ErgoWorks"
  }
];

// Inventory stats
const inventoryStats = [
  { days: "0 days", count: 735 },
  { days: "1-30 days", count: 435 },
  { days: "31-90 days", count: 318 },
  { days: "91+ days", count: 991 }
];

// Product analysis
const productAnalysis = [
  { grade: "A-grade", count: "kr 137M" },
  { grade: "B-grade", count: "kr 69.6M" },
  { grade: "C-grade", count: "kr 1.5B" }
];

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

  // Filter products based on active tab
  const filteredProducts = mockProducts.filter(product => {
    if (activeTab === "All") return true;
    return product.status === activeTab;
  });

  // Further filter based on search term
  const searchedProducts = filteredProducts.filter(product => 
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
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">0.4%</span>
                <span className="text-gray-500">—</span>
              </div>
            </CardContent>
          </Card>

          {/* Products by days of inventory remaining */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Products by days of inventory remaining</h3>
              <div className="flex items-center space-x-4">
                {inventoryStats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span className="text-lg font-semibold">{stat.count}</span>
                    <span className="text-sm text-gray-500">{stat.days}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ABC product analysis */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">ABC product analysis</h3>
              <div className="flex items-center space-x-4">
                {productAnalysis.map((analysis, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span className="text-lg font-semibold">{analysis.count}</span>
                    <span className="text-sm text-gray-500">{analysis.grade}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === "All" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("All")}
            >
              All
            </Button>
            <Button 
              variant={activeTab === "Active" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("Active")}
            >
              Active
            </Button>
            <Button 
              variant={activeTab === "Draft" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("Draft")}
            >
              Draft
            </Button>
            <Button 
              variant={activeTab === "Archived" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("Archived")}
            >
              Archived
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
                <TableHead>Status</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Sales channels</TableHead>
                <TableHead>B2B catalogs</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Vendor</TableHead>
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
                    <TableCell>
                      <Badge variant={product.status === "Active" ? "default" : "outline"} className="capitalize">
                        {product.status === "Active" && <Check className="h-3 w-3 mr-1" />}
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>{product.channels}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.vendor}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
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
