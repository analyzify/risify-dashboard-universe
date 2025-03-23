
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Upload, 
  Filter, 
  Plus, 
  PlusCircle, 
  TrendingUp, 
  DollarSign, 
  Info, 
  ShoppingCart,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockKeywordSuggestions } from "@/lib/mock-data";

interface KeywordDiscoveryProps {
  onAddKeyword: (keyword: any) => void;
  onSelectKeyword: (keyword: any) => void;
  selectedKeywords: any[];
}

const KeywordDiscovery: React.FC<KeywordDiscoveryProps> = ({ 
  onAddKeyword, 
  onSelectKeyword,
  selectedKeywords 
}) => {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [source, setSource] = useState("organic");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = () => {
    if (!seedKeyword.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSuggestions(mockKeywordSuggestions);
      setIsSearching(false);
    }, 800);
  };

  const isKeywordSelected = (keywordId: string) => {
    return selectedKeywords.some(k => k.id === keywordId);
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

  return (
    <div className="flex flex-col h-full space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4 flex space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter seed keyword..."
                  value={seedKeyword}
                  onChange={(e) => setSeedKeyword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSeedKeyword("")}
                >
                  ×
                </Button>
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
        <TabsList className="w-full justify-start">
          <TabsTrigger value="organic">Organic</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 flex-1 overflow-auto">
          {suggestions.length > 0 ? (
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-2 bg-muted">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Selected
                  </Button>
                  <Button size="sm" variant="outline">Add All</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {suggestions.length} keywords found
                </div>
              </div>
              <div className="relative">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-2 px-4 text-left font-medium text-sm">Keyword</th>
                      <th className="py-2 px-4 text-left font-medium text-sm">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Volume
                        </div>
                      </th>
                      <th className="py-2 px-4 text-left font-medium text-sm">
                        <div className="flex items-center">
                          <Filter className="h-4 w-4 mr-1" />
                          KD
                        </div>
                      </th>
                      <th className="py-2 px-4 text-left font-medium text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          CPC
                        </div>
                      </th>
                      <th className="py-2 px-4 text-left font-medium text-sm">
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          Intent
                        </div>
                      </th>
                      <th className="py-2 px-4 text-left font-medium text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestions.map((keyword, index) => (
                      <tr 
                        key={keyword.id} 
                        className={`border-b hover:bg-muted/50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                        onClick={() => onSelectKeyword(keyword)}
                      >
                        <td className="py-3 px-4">{keyword.keyword}</td>
                        <td className="py-3 px-4">{keyword.volume.toLocaleString()}</td>
                        <td className="py-3 px-4">{renderDifficultyIndicator(keyword.difficulty)}</td>
                        <td className="py-3 px-4">${keyword.cpc.toFixed(2)}</td>
                        <td className="py-3 px-4">{renderIntentBadge(keyword.intent)}</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddKeyword(keyword);
                            }}
                            disabled={isKeywordSelected(keyword.id)}
                            className="h-8 w-8 p-0"
                          >
                            {isKeywordSelected(keyword.id) ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  <p>Example seed keywords:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="cursor-pointer" onClick={() => setSeedKeyword("custom t-shirts")}>custom t-shirts</Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => setSeedKeyword("organic skincare")}>organic skincare</Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => setSeedKeyword("smartphone accessories")}>smartphone accessories</Badge>
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
