
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MoreHorizontal, 
  Plus, 
  Filter, 
  Download,
  ExternalLink
} from "lucide-react";

const Pages = () => {
  const pagesList = [
    {
      id: 1,
      title: "Home Page",
      url: "/",
      lastUpdated: "2 days ago",
      status: "Published",
      views: 1205
    },
    {
      id: 2,
      title: "Product Collection",
      url: "/collections/all",
      lastUpdated: "1 week ago",
      status: "Draft",
      views: 456
    },
    {
      id: 3,
      title: "About Us",
      url: "/about",
      lastUpdated: "3 weeks ago",
      status: "Published",
      views: 789
    }
  ];

  return (
    <Layout title="Pages">
      <div className="flex flex-col h-full space-y-4">
        {/* Header with search and actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pages</h1>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search pages..." 
                className="pl-8"
              />
            </div>
            <Button 
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              New Page
            </Button>
          </div>
        </div>
        
        {/* Workspace controls */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Pages table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  Page Title
                </TableHead>
                <TableHead>
                  URL
                </TableHead>
                <TableHead>
                  Last Updated
                </TableHead>
                <TableHead>
                  Status
                </TableHead>
                <TableHead>
                  Views
                </TableHead>
                <TableHead className="w-[60px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesList.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    {page.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-blue-600 truncate max-w-[200px]">
                        {page.url}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {page.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={page.status === "Published" ? "secondary" : "outline"}
                      className="px-2 py-1 text-xs"
                    >
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.views}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {pagesList.length} pages
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pages;
