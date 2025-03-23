
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  ArrowRight, 
  Link as LinkIcon,
  Unlink,
  AlertCircle
} from "lucide-react";

interface KeywordMappingProps {
  keywords: any[];
  onSelectKeyword: (keyword: any) => void;
}

const KeywordMapping: React.FC<KeywordMappingProps> = ({ 
  keywords,
  onSelectKeyword
}) => {
  // Mock data for existing pages
  const [pages, setPages] = useState([
    {
      id: 'page1',
      title: 'Product Customization Guide',
      url: '/product-customization-guide',
      primaryKeyword: 'product customization',
      secondaryKeywords: ['custom design tool', 'product editor']
    },
    {
      id: 'page2',
      title: 'How to Use the Design Templates',
      url: '/how-to-use-design-templates',
      primaryKeyword: 'design templates',
      secondaryKeywords: ['template library', 'design presets']
    },
    {
      id: 'page3',
      title: 'Personalized Products Ideas',
      url: '/personalized-product-ideas',
      primaryKeyword: 'personalized products',
      secondaryKeywords: ['custom gift ideas', 'unique personalization']
    }
  ]);

  // Generate a list of keywords that aren't mapped to any page
  const allMappedKeywords = pages.flatMap(
    page => [page.primaryKeyword, ...page.secondaryKeywords]
  );
  
  const unmappedKeywords = [
    'product customization examples',
    'best customizable products',
    'custom design services',
    'personalization options',
    'product editor tutorial'
  ].filter(keyword => !allMappedKeywords.includes(keyword));

  const [newPageTitle, setNewPageTitle] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [draggedKeyword, setDraggedKeyword] = useState<string | null>(null);
  
  const handleCreateNewPage = () => {
    if (!newPageTitle) return;
    
    const newPage = {
      id: `page${pages.length + 1}`,
      title: newPageTitle,
      url: `/${newPageTitle.toLowerCase().replace(/\s+/g, '-')}`,
      primaryKeyword: '',
      secondaryKeywords: []
    };
    
    setPages([...pages, newPage]);
    setNewPageTitle('');
  };
  
  const filteredPages = searchFilter 
    ? pages.filter(page => 
        page.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        page.primaryKeyword.toLowerCase().includes(searchFilter.toLowerCase()) ||
        page.secondaryKeywords.some(kw => 
          kw.toLowerCase().includes(searchFilter.toLowerCase())
        )
      )
    : pages;
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search pages or keywords..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-64"
          />
          <Button onClick={() => setSearchFilter('')} variant="outline" size="sm" disabled={!searchFilter}>
            Clear
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="New page title..."
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleCreateNewPage} disabled={!newPageTitle} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Create Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Content Pages */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-medium">Content Pages</h2>
          {filteredPages.length === 0 ? (
            <Card className="bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  No pages match your search criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPages.map(page => (
              <Card 
                key={page.id} 
                className="border-l-4"
                style={{ borderLeftColor: page.primaryKeyword ? '#8B5CF6' : '#E5E7EB' }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{page.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {page.url}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Primary Keyword</div>
                      {page.primaryKeyword ? (
                        <div className="flex items-center">
                          <Badge 
                            className="bg-purple-100 text-purple-700 border-purple-300 py-1.5 mr-2"
                          >
                            {page.primaryKeyword}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground">
                            <Unlink className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="border border-dashed border-muted-foreground/30 rounded-md p-2 text-sm text-muted-foreground"
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add('bg-purple-50');
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.classList.remove('bg-purple-50');
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('bg-purple-50');
                            if (draggedKeyword) {
                              // Handle drop logic here
                              // In a real app, this would update the page with the primary keyword
                            }
                          }}
                        >
                          Drag a keyword here to set as primary
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Secondary Keywords</div>
                      <div className="flex flex-wrap gap-2">
                        {page.secondaryKeywords.map((keyword, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="py-1.5"
                          >
                            {keyword}
                          </Badge>
                        ))}
                        <Badge 
                          variant="outline" 
                          className="border-dashed cursor-pointer py-1.5"
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add('bg-muted');
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.classList.remove('bg-muted');
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('bg-muted');
                            if (draggedKeyword) {
                              // Handle drop logic here
                              // In a real app, this would add the keyword to the secondary keywords
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add keyword
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {/* Unmapped Keywords */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Unmapped Keywords</h2>
          <Card className="border border-amber-200 bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                Content Gaps
              </CardTitle>
              <CardDescription>
                These keywords aren't mapped to any content yet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {unmappedKeywords.map((keyword, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded-md border border-amber-100 shadow-sm"
                    draggable
                    onDragStart={() => setDraggedKeyword(keyword)}
                    onDragEnd={() => setDraggedKeyword(null)}
                  >
                    <span>{keyword}</span>
                    <div className="flex items-center text-muted-foreground">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      <span className="text-xs">Drag to map</span>
                    </div>
                  </div>
                ))}
                
                {unmappedKeywords.length === 0 && (
                  <div className="text-center p-4 text-muted-foreground">
                    All keywords are mapped to content
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-amber-200">
                <h3 className="text-sm font-medium mb-2">Suggested Content</h3>
                <div className="space-y-2">
                  {unmappedKeywords.length > 0 && (
                    <Button variant="outline" size="sm" className="w-full justify-start text-left">
                      <Plus className="h-4 w-4 mr-2" />
                      Create "{unmappedKeywords[0]}" page
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    <FileText className="h-4 w-4 mr-2" />
                    Run content gap analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Keyword Assignment Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p>Assign one primary keyword per page for focused optimization</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p>Group semantically related keywords on the same page</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p>Drag and drop keywords to map them to existing content</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p>Create new pages for keywords that don't fit existing content</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KeywordMapping;
