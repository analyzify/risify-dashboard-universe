
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  HelpCircle, 
  Upload,
  ChevronDown
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
import { Slider } from "@/components/ui/slider";

// Mock keywords data
const mockKeywords = [
  { 
    keyword: "eco-friendly water bottles", 
    volume: 5400, 
    difficulty: 42, 
    cpc: 1.25, 
    intent: "informational",
    features: ["featured_snippet", "image_pack"]
  },
  { 
    keyword: "best insulated water bottle", 
    volume: 22000, 
    difficulty: 67, 
    cpc: 2.15, 
    intent: "commercial",
    features: ["shopping_results", "related_questions"]
  },
  { 
    keyword: "stainless steel water bottle", 
    volume: 33500, 
    difficulty: 75, 
    cpc: 1.80, 
    intent: "transactional",
    features: ["shopping_results", "image_pack"]
  },
  { 
    keyword: "water bottle with filter", 
    volume: 12400, 
    difficulty: 52, 
    cpc: 1.45, 
    intent: "informational",
    features: ["featured_snippet", "related_questions"]
  },
  { 
    keyword: "bpa free water bottles", 
    volume: 8900, 
    difficulty: 61, 
    cpc: 1.35, 
    intent: "commercial",
    features: ["shopping_results"]
  },
  { 
    keyword: "collapsible water bottle", 
    volume: 6700, 
    difficulty: 38, 
    cpc: 1.10, 
    intent: "transactional",
    features: ["image_pack"]
  },
  { 
    keyword: "how to clean water bottle", 
    volume: 18200, 
    difficulty: 25, 
    cpc: 0.75, 
    intent: "informational",
    features: ["video_results", "featured_snippet", "related_questions"]
  },
];

const KeywordDiscovery = () => {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [selectedSource, setSelectedSource] = useState("organic");
  const [difficultyRange, setDifficultyRange] = useState([0, 100]);
  const [volumeFilter, setVolumeFilter] = useState("all");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleAddKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleAddAllKeywords = () => {
    const allKeywords = mockKeywords.map(k => k.keyword);
    setSelectedKeywords([...new Set([...selectedKeywords, ...allKeywords])]);
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return "bg-green-500";
    if (difficulty <= 60) return "bg-yellow-500"; 
    return "bg-red-500";
  };

  // Get intent badge
  const getIntentBadge = (intent: string) => {
    switch (intent) {
      case "informational":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Informational</Badge>;
      case "commercial":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Commercial</Badge>;
      case "transactional":
        return <Badge className="bg-green-500 hover:bg-green-600">Transactional</Badge>;
      case "navigational":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Navigational</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              value={seedKeyword} 
              onChange={(e) => setSeedKeyword(e.target.value)} 
              placeholder="Enter seed keyword (e.g., 'water bottle')" 
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="gap-1 flex-shrink-0">
            <Search className="h-4 w-4" />
            Find Keywords
          </Button>
          <Button variant="outline" className="gap-1 flex-shrink-0">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Difficulty Range</div>
            <div className="w-full max-w-xs px-2">
              <Slider 
                defaultValue={[0, 100]} 
                max={100} 
                step={1} 
                onValueChange={(value) => setDifficultyRange(value as number[])}
                className="my-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Easy (0)</span>
                <span>Medium (50)</span>
                <span>Hard (100)</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 flex flex-col">
            <div className="text-sm font-medium">Search Volume</div>
            <Select defaultValue="all" onValueChange={setVolumeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All volumes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All volumes</SelectItem>
                <SelectItem value="high">High (10,000+)</SelectItem>
                <SelectItem value="medium">Medium (1,000-10,000)</SelectItem>
                <SelectItem value="low">Low (0-1,000)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 flex flex-col">
            <div className="text-sm font-medium">Intent</div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All intents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All intents</SelectItem>
                <SelectItem value="informational">Informational</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
                <SelectItem value="navigational">Navigational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="organic" className="w-full" onValueChange={setSelectedSource}>
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="organic">Organic</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>
        <TabsContent value="organic" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Volume
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Difficulty
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>CPC ($)</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>SERP Features</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockKeywords.map((keyword, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 rounded-full bg-gray-200">
                          <div 
                            className={`h-full rounded-full ${getDifficultyColor(keyword.difficulty)}`} 
                            style={{ width: `${keyword.difficulty}%` }}
                          ></div>
                        </div>
                        <span>{keyword.difficulty}</span>
                      </div>
                    </TableCell>
                    <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell>{getIntentBadge(keyword.intent)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {keyword.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {feature.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddKeyword(keyword.keyword)}
                        disabled={selectedKeywords.includes(keyword.keyword)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {selectedKeywords.includes(keyword.keyword) ? 'Added' : 'Add'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {mockKeywords.length} keywords
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Add Selected
              </Button>
              <Button size="sm" onClick={handleAddAllKeywords}>
                Add All ({mockKeywords.length})
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="mt-4">
          <div className="h-[300px] flex items-center justify-center border rounded-lg">
            <div className="text-center text-muted-foreground">
              <p>Question keywords will appear here</p>
              <p className="text-sm">(Change keywords with "?" or "how/what/why")</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="related" className="mt-4">
          <div className="h-[300px] flex items-center justify-center border rounded-lg">
            <div className="text-center text-muted-foreground">
              <p>Related keywords will appear here</p>
              <p className="text-sm">(Semantically similar terms)</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="competitors" className="mt-4">
          <div className="h-[300px] flex items-center justify-center border rounded-lg">
            <div className="text-center text-muted-foreground">
              <p>Competitor keywords will appear here</p>
              <p className="text-sm">(Enter competitor domains to see their keywords)</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KeywordDiscovery;
