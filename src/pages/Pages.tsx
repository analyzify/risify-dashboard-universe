import React, { useState } from "react";
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
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Link as LinkIcon,
  Lightbulb
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Page = {
  id: number;
  title: string;
  url: string;
  lastUpdated: string;
  status: "Published" | "Draft";
  views: number;
  type: "page" | "product" | "collection" | "blog" | "other";
  isIndexed: boolean | "lost";
  lastMonthClicks: number;
  opportunityScore: "high" | "medium" | "low";
  keywordsMapped: string[];
  hasOptimizationIdeas?: boolean;
}

const Pages = () => {
  const allPages: Page[] = [
    {
      id: 1,
      title: "Home Page",
      url: "/",
      lastUpdated: "2 days ago",
      status: "Published",
      views: 1205,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 548,
      opportunityScore: "high",
      keywordsMapped: ["online store", "buy products", "shop now"],
      hasOptimizationIdeas: true
    },
    {
      id: 2,
      title: "Product Collection",
      url: "/collections/all",
      lastUpdated: "1 week ago",
      status: "Draft",
      views: 456,
      type: "collection",
      isIndexed: true,
      lastMonthClicks: 210,
      opportunityScore: "medium",
      keywordsMapped: ["all products", "product catalog"]
    },
    {
      id: 3,
      title: "About Us",
      url: "/about",
      lastUpdated: "3 weeks ago",
      status: "Published",
      views: 789,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 124,
      opportunityScore: "low",
      keywordsMapped: ["company information", "about company"]
    },
    {
      id: 4,
      title: "Contact",
      url: "/contact",
      lastUpdated: "5 days ago",
      status: "Published",
      views: 321,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 89,
      opportunityScore: "low",
      keywordsMapped: ["contact us", "support"]
    },
    {
      id: 5,
      title: "Winter Jackets",
      url: "/products/winter-jackets",
      lastUpdated: "2 days ago",
      status: "Published",
      views: 1102,
      type: "product",
      isIndexed: true,
      lastMonthClicks: 435,
      opportunityScore: "high",
      keywordsMapped: ["winter jackets", "warm coats", "winter apparel"],
      hasOptimizationIdeas: true
    },
    {
      id: 6,
      title: "Blog: Winter Fashion Trends",
      url: "/blog/winter-fashion-trends",
      lastUpdated: "1 day ago",
      status: "Published",
      views: 876,
      type: "blog",
      isIndexed: true,
      lastMonthClicks: 320,
      opportunityScore: "high",
      keywordsMapped: ["winter fashion", "fashion trends", "seasonal clothing"],
      hasOptimizationIdeas: true
    },
    {
      id: 7,
      title: "Size Guide",
      url: "/size-guide",
      lastUpdated: "1 month ago",
      status: "Published",
      views: 432,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 98,
      opportunityScore: "medium",
      keywordsMapped: ["clothing sizes", "size chart"]
    },
    {
      id: 8,
      title: "Summer Collection",
      url: "/collections/summer",
      lastUpdated: "2 weeks ago",
      status: "Published",
      views: 901,
      type: "collection",
      isIndexed: true,
      lastMonthClicks: 278,
      opportunityScore: "medium",
      keywordsMapped: ["summer clothes", "summer collection", "summer wear"]
    },
    {
      id: 9,
      title: "Shipping Information",
      url: "/shipping",
      lastUpdated: "3 weeks ago",
      status: "Published",
      views: 543,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 112,
      opportunityScore: "low",
      keywordsMapped: ["shipping policy", "delivery information"]
    },
    {
      id: 10,
      title: "Returns Policy",
      url: "/returns",
      lastUpdated: "2 months ago",
      status: "Published",
      views: 421,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 95,
      opportunityScore: "low",
      keywordsMapped: ["return policy", "product returns"]
    },
    {
      id: 11,
      title: "Hiking Boots",
      url: "/products/hiking-boots",
      lastUpdated: "3 days ago",
      status: "Published",
      views: 789,
      type: "product",
      isIndexed: true,
      lastMonthClicks: 310,
      opportunityScore: "high",
      keywordsMapped: ["hiking boots", "outdoor footwear", "trail shoes"]
    },
    {
      id: 12,
      title: "Accessories",
      url: "/collections/accessories",
      lastUpdated: "1 week ago",
      status: "Published",
      views: 654,
      type: "collection",
      isIndexed: true,
      lastMonthClicks: 201,
      opportunityScore: "medium",
      keywordsMapped: ["fashion accessories", "clothing accessories"]
    },
    {
      id: 13,
      title: "Blog: Outdoor Adventures",
      url: "/blog/outdoor-adventures",
      lastUpdated: "5 days ago",
      status: "Published",
      views: 567,
      type: "blog",
      isIndexed: true,
      lastMonthClicks: 231,
      opportunityScore: "medium",
      keywordsMapped: ["outdoor activities", "adventure tips"]
    },
    {
      id: 14,
      title: "Gift Cards",
      url: "/gift-cards",
      lastUpdated: "2 weeks ago",
      status: "Published",
      views: 432,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 143,
      opportunityScore: "medium",
      keywordsMapped: ["gift certificates", "store credit"]
    },
    {
      id: 15,
      title: "Terms of Service",
      url: "/terms",
      lastUpdated: "3 months ago",
      status: "Published",
      views: 321,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 45,
      opportunityScore: "low",
      keywordsMapped: ["terms conditions", "legal terms"]
    },
    {
      id: 16,
      title: "Privacy Policy",
      url: "/privacy",
      lastUpdated: "3 months ago",
      status: "Published",
      views: 287,
      type: "page",
      isIndexed: true,
      lastMonthClicks: 38,
      opportunityScore: "low",
      keywordsMapped: ["privacy information", "data policy"]
    },
    {
      id: 17,
      title: "Winter Gloves",
      url: "/products/winter-gloves",
      lastUpdated: "1 week ago",
      status: "Published",
      views: 654,
      type: "product",
      isIndexed: true,
      lastMonthClicks: 210,
      opportunityScore: "medium",
      keywordsMapped: ["warm gloves", "winter hand wear"]
    },
    {
      id: 18,
      title: "Sale Items",
      url: "/collections/sale",
      lastUpdated: "2 days ago",
      status: "Published",
      views: 1432,
      type: "collection",
      isIndexed: true,
      lastMonthClicks: 520,
      opportunityScore: "high",
      keywordsMapped: ["discounted items", "sale products", "clearance"]
    },
    {
      id: 19,
      title: "Blog: How to Choose Hiking Gear",
      url: "/blog/hiking-gear-guide",
      lastUpdated: "1 week ago",
      status: "Published",
      views: 765,
      type: "blog",
      isIndexed: true,
      lastMonthClicks: 289,
      opportunityScore: "high",
      keywordsMapped: ["hiking equipment", "outdoor gear", "trekking essentials"]
    },
    {
      id: 20,
      title: "FAQ",
      url: "/faq",
      lastUpdated: "2 weeks ago",
      status: "Published",
      views: 543,
      type: "page",
      isIndexed: false,
      lastMonthClicks: 178,
      opportunityScore: "medium",
      keywordsMapped: ["frequently asked questions", "common questions"]
    },
    {
      id: 21,
      title: "New Products",
      url: "/collections/new-arrivals",
      lastUpdated: "1 day ago",
      status: "Draft",
      views: 0,
      type: "collection",
      isIndexed: false,
      lastMonthClicks: 0,
      opportunityScore: "high",
      keywordsMapped: ["new arrivals", "latest products"]
    },
    {
      id: 22,
      title: "Winter Hats",
      url: "/products/winter-hats",
      lastUpdated: "3 days ago",
      status: "Published",
      views: 532,
      type: "product",
      isIndexed: true,
      lastMonthClicks: 176,
      opportunityScore: "medium",
      keywordsMapped: ["winter caps", "beanies", "cold weather hats"]
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const pageSize = 10;
  
  const filterByType = (pages: Page[], type: string | null) => {
    if (!type) return pages;
    return pages.filter(page => page.type === type);
  };
  
  const filterBySearch = (pages: Page[], term: string) => {
    if (!term.trim()) return pages;
    const lowerTerm = term.toLowerCase();
    return pages.filter(page => 
      page.title.toLowerCase().includes(lowerTerm) || 
      page.url.toLowerCase().includes(lowerTerm)
    );
  };
  
  const filteredPages = filterByType(filterBySearch(allPages, searchTerm), activeFilter as any);
  
  const totalPages = Math.ceil(filteredPages.length / pageSize);
  const pagesForCurrentPage = filteredPages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getOpportunityScoreColor = (score: "high" | "medium" | "low") => {
    switch (score) {
      case "high": return "text-green-600 bg-green-100";
      case "medium": return "text-amber-600 bg-amber-100";
      case "low": return "text-gray-600 bg-gray-100";
    }
  };

  const getIndexedStatus = (status: boolean | "lost") => {
    if (status === "lost") return { label: "Lost", variant: "destructive" as const };
    return status ? { label: "Yes", variant: "default" as const } : { label: "No", variant: "outline" as const };
  };

  return (
    <Layout title="Pages">
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pages</h1>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search pages..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button 
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              New Page
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={activeFilter === null ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveFilter(null)}
          >
            All
          </Badge>
          <Badge 
            variant={activeFilter === "page" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveFilter("page")}
          >
            Pages
          </Badge>
          <Badge 
            variant={activeFilter === "product" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveFilter("product")}
          >
            Products
          </Badge>
          <Badge 
            variant={activeFilter === "collection" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveFilter("collection")}
          >
            Collections
          </Badge>
          <Badge 
            variant={activeFilter === "blog" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveFilter("blog")}
          >
            Blog Posts
          </Badge>
          <Badge 
            variant={activeFilter === "other" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveFilter("other")}
          >
            Other
          </Badge>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  Page Title
                </TableHead>
                <TableHead className="w-[50px]">
                  URL
                </TableHead>
                <TableHead>
                  Last Updated
                </TableHead>
                <TableHead>
                  Indexed
                </TableHead>
                <TableHead>
                  Last Month Clicks
                </TableHead>
                <TableHead>
                  Opportunity
                </TableHead>
                <TableHead className="w-[60px]">
                  Keywords
                </TableHead>
                <TableHead className="w-[50px]">
                  Ideas
                </TableHead>
                <TableHead className="w-[60px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesForCurrentPage.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">
                    {page.title}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-1">
                            <ExternalLink className="h-3 w-3 text-blue-600 flex-shrink-0" />
                            <span className="truncate">{page.url}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{page.url}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    {page.lastUpdated}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const status = getIndexedStatus(page.isIndexed);
                      return (
                        <Badge 
                          variant={status.variant}
                          className="px-2 py-1 text-xs"
                        >
                          {status.label}
                        </Badge>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    {page.lastMonthClicks.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`px-2 py-1 text-xs ${getOpportunityScoreColor(page.opportunityScore)}`}
                    >
                      {page.opportunityScore.charAt(0).toUpperCase() + page.opportunityScore.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.keywordsMapped.length > 0 ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 flex gap-1 items-center">
                            <LinkIcon className="h-3.5 w-3.5 text-blue-600" />
                            <span className="text-xs">{page.keywordsMapped.length}</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Keywords mapped to: {page.title}</h4>
                            <div className="flex flex-wrap gap-1">
                              {page.keywordsMapped.map((keyword, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span className="text-xs text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {page.hasOptimizationIdeas ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Lightbulb className="h-4 w-4 text-amber-500 fill-amber-100" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View optimization ideas</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="h-7 w-7 block"></span> 
                    )}
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
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {pagesForCurrentPage.length} of {filteredPages.length} pages
          </p>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(current => Math.max(current - 1, 1))}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 3 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }
                
                if (pageNum <= totalPages) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(current => Math.min(current + 1, totalPages))}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default Pages;

