
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { Page } from '@/data/growthTasks';

interface PageSelectorProps {
  pages: Page[];
  selectedKeywords: string[];
  onBack: () => void;
  onContinue: (page: Page) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ 
  pages, 
  selectedKeywords, 
  onBack, 
  onContinue 
}) => {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageType, setPageType] = useState('all');
  
  // Filter pages based on search and type
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = pageType === 'all' || page.type === pageType;
    return matchesSearch && matchesType;
  });
  
  // For demo, show "recommended" on first page
  const recommendedPage = pages[0];
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">3</div>
          <h1 className="text-2xl font-bold">Select Page to Optimize</h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-11">
          Choose which page you want to optimize with the selected keywords:
          <span className="font-medium ml-1">
            {selectedKeywords.join(', ')}
          </span>
        </p>
      </div>
      
      <div className="mb-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <Badge className="w-fit mb-1 bg-blue-100 text-blue-800 border-blue-200">
              AI Recommended
            </Badge>
            <CardTitle className="text-lg">Recommended Page for Your Keywords</CardTitle>
            <CardDescription>
              Based on your selected keywords, we recommend optimizing this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{recommendedPage.title}</p>
                <p className="text-sm text-muted-foreground">{recommendedPage.url}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">{recommendedPage.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {new Date(recommendedPage.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => {
                  setSelectedPage(recommendedPage);
                  onContinue(recommendedPage);
                }}
              >
                Select Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Pages</h2>
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                className="pl-8" 
                placeholder="Search pages" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Plus size={16} />
              Create New Page
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setPageType}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="collection">Collections</TabsTrigger>
            <TabsTrigger value="page">Pages</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-3">Page Title</th>
                    <th className="text-center p-3">Type</th>
                    <th className="text-center p-3">Completeness</th>
                    <th className="text-center p-3">Last Updated</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        No pages found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredPages.map((page) => (
                      <tr 
                        key={page.id} 
                        className={`border-b last:border-b-0 hover:bg-muted/20 ${
                          selectedPage?.id === page.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="p-3">
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-muted-foreground">{page.url}</p>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline">
                            {page.type.charAt(0).toUpperCase() + page.type.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col items-center">
                            <div className="w-full bg-muted rounded-full h-2 mb-1">
                              <div 
                                className={`h-2 rounded-full ${
                                  page.completenessScore > 70 ? 'bg-green-500' : 
                                  page.completenessScore > 40 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${page.completenessScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {page.completenessScore}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center text-sm text-muted-foreground">
                          {new Date(page.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-center">
                          <Button size="sm" onClick={() => {
                            setSelectedPage(page);
                            onContinue(page);
                          }}>
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Tabs>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Keywords
        </Button>
        <Button 
          onClick={() => selectedPage && onContinue(selectedPage)}
          disabled={!selectedPage}
        >
          Start Optimization
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PageSelector;
