
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Upload, 
  Filter, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Info, 
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockKeywordSuggestions, popularSeedKeywords } from "@/lib/mock-data";

interface KeywordDiscoveryProps {
  onAddKeyword: (keyword: any, groupId?: string) => void;
  onSelectKeyword: (keyword: any) => void;
  selectedKeywords: any[];
  groups: any[];
}

const KeywordDiscovery: React.FC<KeywordDiscoveryProps> = ({ 
  onAddKeyword, 
  onSelectKeyword,
  selectedKeywords,
  groups
}) => {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [source, setSource] = useState("organic");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(suggestions.length / rowsPerPage);

  const handleSearch = () => {
    if (!seedKeyword.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const results = mockKeywordSuggestions.filter(kw => 
        kw.keyword.toLowerCase().includes(seedKeyword.toLowerCase())
      );
      setSuggestions(results.length > 0 ? results : mockKeywordSuggestions);
      setIsSearching(false);
      setCurrentPage(1);
      setSelectedRows([]);
    }, 800);
  };

  const isKeywordSelected = (keywordId: string) => {
    return selectedKeywords.some(k => k.id === keywordId);
  };

  const handleRowSelect = (keywordId: string) => {
    setSelectedRows(prev => 
      prev.includes(keywordId) 
        ? prev.filter(id => id !== keywordId) 
        : [...prev, keywordId]
    );
  };

  const handleSelectAll = () => {
    const currentPageKeywords = getCurrentPageKeywords();
    const allSelected = currentPageKeywords.every(kw => selectedRows.includes(kw.id));
    
    if (allSelected) {
      // Deselect all on current page
      setSelectedRows(prev => prev.filter(id => 
        !currentPageKeywords.some(kw => kw.id === id))
      );
    } else {
      // Select all on current page
      const newSelectedRows = [
        ...selectedRows,
        ...currentPageKeywords.map(kw => kw.id).filter(id => !selectedRows.includes(id))
      ];
      setSelectedRows(newSelectedRows);
    }
  };

  const handleAddSelectedKeywords = (groupId?: string) => {
    selectedRows.forEach(keywordId => {
      const keyword = suggestions.find(kw => kw.id === keywordId);
      if (keyword && !isKeywordSelected(keywordId)) {
        onAddKeyword(keyword, groupId);
      }
    });
    setSelectedRows([]);
  };

  const getCurrentPageKeywords = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return suggestions.slice(startIndex, startIndex + rowsPerPage);
  };

  const renderIntentBadge = (intent: string) => {
    switch (intent) {
      case "informational":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">Informational</Badge>;
      case "commercial":
        return <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">Commercial</Badge>;
      case "transactional":
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">Transactional</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">Navigational</Badge>;
    }
  };

  const renderDifficultyIndicator = (difficulty: number) => {
    let color = "bg-green-500";
    if (difficulty > 70) {
      color = "bg-red-500";
    } else if (difficulty > 40) {
      color = "bg-yellow-500";
    }
    
    return (
      <div className="flex items-center gap-2">
        <div className={`h-2 w-12 rounded-full bg-gray-200`}>
          <div className={`h-2 rounded-full ${color}`} style={{ width: `${difficulty}%` }}></div>
        </div>
        <span>{difficulty}</span>
      </div>
    );
  };

  const handleSeedKeywordClick = (keyword: string) => {
    setSeedKeyword(keyword);
    handleSearch();
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4 flex space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter seed keyword like 'organic skincare' or 'custom t-shirts'..."
                  value={seedKeyword}
                  onChange={(e) => setSeedKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  className="pr-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="flex items-center gap-1">
                {isSearching ? "Searching..." : "Find Keywords"}
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Import
              </Button>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="organic" value={source} onValueChange={setSource} className="flex-1 flex flex-col">
        {suggestions.length > 0 && (
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="organic">Organic</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
          </TabsList>
        )}
        
        <div className="mt-0 flex-1 overflow-auto">
          {suggestions.length > 0 ? (
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-2 bg-muted">
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Add Selected
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Add to Group</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {groups.map(group => (
                        <DropdownMenuItem 
                          key={group.id}
                          onClick={() => handleAddSelectedKeywords(group.id)}
                        >
                          <div 
                            className="h-2 w-2 rounded-full mr-2" 
                            style={{ 
                              backgroundColor: group.color || 'var(--background)'
                            }}
                          ></div>
                          {group.name}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAddSelectedKeywords()}>
                        <FolderPlus className="h-4 w-4 mr-2" />
                        Add to new group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAddSelectedKeywords()}
                  >
                    Add All
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {suggestions.length} keywords found
                </div>
              </div>
              <div className="relative">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox 
                          checked={
                            getCurrentPageKeywords().length > 0 && 
                            getCurrentPageKeywords().every(kw => selectedRows.includes(kw.id))
                          }
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead className="font-medium">Keyword</TableHead>
                      <TableHead className="font-medium text-right">
                        <div className="flex items-center justify-end">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Volume
                        </div>
                      </TableHead>
                      <TableHead className="font-medium text-right">
                        <div className="flex items-center justify-end">
                          <Filter className="h-4 w-4 mr-1" />
                          KD
                        </div>
                      </TableHead>
                      <TableHead className="font-medium text-right">
                        <div className="flex items-center justify-end">
                          <DollarSign className="h-4 w-4 mr-1" />
                          CPC
                        </div>
                      </TableHead>
                      <TableHead className="font-medium">
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          Intent
                        </div>
                      </TableHead>
                      <TableHead className="font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getCurrentPageKeywords().map((keyword) => (
                      <TableRow 
                        key={keyword.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => onSelectKeyword(keyword)}
                      >
                        <TableCell className="p-2">
                          <Checkbox 
                            checked={selectedRows.includes(keyword.id)}
                            onCheckedChange={() => handleRowSelect(keyword.id)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Select ${keyword.keyword}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                        <TableCell className="text-right">{keyword.volume.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{renderDifficultyIndicator(keyword.difficulty)}</TableCell>
                        <TableCell className="text-right">${keyword.cpc.toFixed(2)}</TableCell>
                        <TableCell>{renderIntentBadge(keyword.intent)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => e.stopPropagation()}
                                disabled={isKeywordSelected(keyword.id)}
                                className="h-8 w-8 p-0"
                              >
                                {isKeywordSelected(keyword.id) ? (
                                  <span className="text-green-600">✓</span>
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Add to Group</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {groups.map(group => (
                                <DropdownMenuItem 
                                  key={group.id}
                                  onClick={() => onAddKeyword(keyword, group.id)}
                                >
                                  <div 
                                    className="h-2 w-2 rounded-full mr-2" 
                                    style={{ 
                                      backgroundColor: group.color || 'var(--background)'
                                    }}
                                  ></div>
                                  {group.name}
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => onAddKeyword(keyword)}>
                                <FolderPlus className="h-4 w-4 mr-2" />
                                Add to new group
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-2 bg-muted border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          ) : isSearching ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p>Finding keyword suggestions...</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted/20 border rounded-md">
              <div className="text-center p-6">
                <Search className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Discover Keyword Opportunities</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Enter a seed keyword to find relevant suggestions, questions, and related terms to expand your SEO strategy.
                </p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <p>Popular seed keywords:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer" 
                      onClick={() => handleSeedKeywordClick("organic skincare")}
                    >
                      organic skincare
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer" 
                      onClick={() => handleSeedKeywordClick("custom t-shirts")}
                    >
                      custom t-shirts
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer" 
                      onClick={() => handleSeedKeywordClick("smartphone accessories")}
                    >
                      smartphone accessories
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default KeywordDiscovery;
