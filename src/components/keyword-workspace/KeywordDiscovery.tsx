
import React, { useState } from "react";
import { 
  ArrowRight, 
  Search, 
  Upload, 
  Filter, 
  RefreshCw,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  Link as LinkIcon,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeSource, setActiveSource] = useState("organic");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("winter_apparel");
  const [results, setResults] = useState<any[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState("all");
  
  const handleSearch = () => {
    if (!seedKeyword.trim()) return;
    
    // Filter the mock suggestions based on the seed keyword
    const filtered = mockKeywordSuggestions.filter(kw => 
      kw.keyword.toLowerCase().includes(seedKeyword.toLowerCase()) ||
      seedKeyword.toLowerCase().includes(kw.keyword.toLowerCase())
    );
    
    setResults(filtered);
    setSearchPerformed(true);
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    // Auto-populate the seed keyword with the first keyword from this category
    if (popularSeedKeywords[category as keyof typeof popularSeedKeywords]?.length > 0) {
      setSeedKeyword(popularSeedKeywords[category as keyof typeof popularSeedKeywords][0]);
    }
  };
  
  const handleAddKeyword = (keyword: any) => {
    onAddKeyword(keyword, selectedGroupId);
  };
  
  const isKeywordSelected = (keywordId: string) => {
    return selectedKeywords.some(kw => kw.id === keywordId);
  };
  
  const renderSourceTab = (source: string) => {
    switch (source) {
      case "organic":
        return (
          <div className="space-y-4">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(keyword => (
                  <Card key={keyword.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Volume: {keyword.volume.toLocaleString()}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            keyword.difficulty > 70 ? 'border-red-500 text-red-500' : 
                            keyword.difficulty > 40 ? 'border-yellow-500 text-yellow-500' : 
                            'border-green-500 text-green-500'
                          }`}
                        >
                          Difficulty: {keyword.difficulty}
                        </Badge>
                      </div>
                      <CardTitle 
                        className="text-base mt-2 cursor-pointer hover:text-primary"
                        onClick={() => onSelectKeyword(keyword)}
                      >
                        {keyword.keyword}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="text-xs capitalize mr-1">
                          {keyword.intent || "informational"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          CPC: ${keyword.cpc?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <div className="flex justify-between items-center w-full">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onSelectKeyword(keyword)}
                        >
                          Details
                        </Button>
                        {isKeywordSelected(keyword.id) ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled
                          >
                            Added
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleAddKeyword(keyword)}
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Discover Keyword Opportunities</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Enter a seed keyword to find relevant suggestions, questions, and related terms to expand your SEO strategy.
                </p>
                <Button onClick={() => setSeedKeyword("winter jackets")}>
                  Try "winter jackets"
                </Button>
              </div>
            )}
          </div>
        );
      
      case "questions":
        return (
          <div className="space-y-4">
            {searchPerformed ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {["What are the best winter jackets for extreme cold?", 
                  "How to choose the right north face jacket?",
                  "Are snow shoes good for hiking?",
                  "Which brand makes the warmest winter coats?",
                  "How to care for a down jacket?",
                  "What is the difference between waterproof and water resistant?"].map((question, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center mb-2">
                        <MessageCircle className="h-4 w-4 mr-2 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          Question
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{question}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Button size="sm">Add as Keyword</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Question-Based Keywords</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Search for a keyword to find related questions that your customers are asking online.
                </p>
              </div>
            )}
          </div>
        );
        
      case "related":
        return (
          <div className="space-y-4">
            {searchPerformed ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["thermal jackets", 
                  "insulated coats", 
                  "parka jackets men", 
                  "women's down jackets",
                  "kids winter jackets",
                  "best ski jackets",
                  "lightweight winter coat",
                  "winter jacket brands",
                  "waterproof winter coats"].map((term, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                        <span>{term}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg">
                <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Related Keywords</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Find semantically related keywords to expand your SEO strategy.
                </p>
              </div>
            )}
          </div>
        );
        
      case "competitors":
        return (
          <div className="space-y-4">
            {searchPerformed ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Competitor Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="font-medium">backcountry.com</div>
                        <div>147 ranking keywords</div>
                        <Button size="sm">View Keywords</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="font-medium">rei.com</div>
                        <div>203 ranking keywords</div>
                        <Button size="sm">View Keywords</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="font-medium">moosejaw.com</div>
                        <div>116 ranking keywords</div>
                        <Button size="sm">View Keywords</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg">
                <ThumbsUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Competitor Keywords</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Discover keywords that your competitors are ranking for that you aren't targeting yet.
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Search controls */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter seed keyword like 'winter jackets' or 'snow boots'..."
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Button onClick={handleSearch} className="flex items-center gap-1 whitespace-nowrap">
              Find Keywords
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Add to group:</span>
            <select 
              className="text-sm p-1 border rounded"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
            >
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Popular seed keywords:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(popularSeedKeywords).map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.replace('_', ' ')}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCategory && popularSeedKeywords[selectedCategory as keyof typeof popularSeedKeywords]?.map((keyword, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => {
                    setSeedKeyword(keyword);
                    setTimeout(() => handleSearch(), 100);
                  }}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Results area */}
      <div className="flex-1">
        <Tabs defaultValue="organic" value={activeSource} onValueChange={setActiveSource}>
          <TabsList className="mb-4">
            <TabsTrigger value="organic" className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              Organic
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="related" className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              Related
            </TabsTrigger>
            <TabsTrigger value="competitors" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              Competitors
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="organic">
            {renderSourceTab("organic")}
          </TabsContent>
          
          <TabsContent value="questions">
            {renderSourceTab("questions")}
          </TabsContent>
          
          <TabsContent value="related">
            {renderSourceTab("related")}
          </TabsContent>
          
          <TabsContent value="competitors">
            {renderSourceTab("competitors")}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KeywordDiscovery;
