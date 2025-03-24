
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  ExternalLink,
  MoreHorizontal,
  PlusCircle,
  Check,
  Clock
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format } from "date-fns";
import { toast } from "sonner";

const metrics = [
  {
    title: "Today",
    value: "21",
    description: "New terms found",
    icon: <Calendar className="h-5 w-5 text-primary/60" />
  },
  {
    title: "This Week",
    value: "50",
    description: "New terms found",
    icon: <TrendingUp className="h-5 w-5 text-primary/60" />
  },
  {
    title: "Total Discovered",
    value: "248",
    description: "All time terms",
    icon: <Check className="h-5 w-5 text-green-500/60" />
  },
  {
    title: "Top Source",
    value: "Google",
    description: "Most keywords",
    icon: <Search className="h-5 w-5 text-purple-500/60" />
  }
];

const sourceTabs = ["All", "Google", "Reddit", "Competitors", "Q&A Sites"];

const seedKeywords = [
  { id: 1, keyword: "organic coffee", active: true },
  { id: 2, keyword: "specialty coffee", active: true },
  { id: 3, keyword: "coffee beans", active: true },
  { id: 4, keyword: "fair trade coffee", active: true },
  { id: 5, keyword: "arabica coffee", active: false },
  { id: 6, keyword: "coffee brewing", active: false },
  { id: 7, keyword: "coffee roasters", active: false }
];

const allKeywords = [
  { 
    id: 1, 
    keyword: "best organic coffee beans", 
    seed: "organic coffee", 
    source: "Google",
    added: false,
    link: true,
    placement: "Related Search",
    discoveredOn: new Date(2023, 7, 12)
  },
  { 
    id: 2, 
    keyword: "how to brew specialty coffee", 
    seed: "specialty coffee", 
    source: "Google",
    added: false,
    link: true,
    placement: "PAA",
    discoveredOn: new Date(2023, 7, 15)
  },
  { 
    id: 3, 
    keyword: "fair trade coffee brands", 
    seed: "fair trade coffee", 
    source: "Competitors",
    added: true,
    link: true,
    placement: "Related Search",
    discoveredOn: new Date(2023, 7, 10)
  },
  { 
    id: 4, 
    keyword: "single origin coffee beans", 
    seed: "coffee beans", 
    source: "Reddit",
    added: false,
    link: true,
    placement: "Autocomplete",
    discoveredOn: new Date(2023, 7, 8)
  },
  { 
    id: 5, 
    keyword: "specialty coffee subscription", 
    seed: "specialty coffee", 
    source: "Competitors",
    added: false,
    link: true,
    placement: "Related Search",
    discoveredOn: new Date(2023, 7, 5)
  },
  { 
    id: 6, 
    keyword: "arabica coffee beans", 
    seed: "arabica coffee", 
    source: "Google",
    added: false,
    link: true,
    placement: "Autocomplete",
    discoveredOn: new Date(2023, 7, 3)
  },
  { 
    id: 7, 
    keyword: "coffee brewing methods", 
    seed: "coffee brewing", 
    source: "Q&A Sites",
    added: true,
    link: true,
    placement: "PAA",
    discoveredOn: new Date(2023, 6, 28)
  }
];

const SearchDiscovery = () => {
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const [activeSeedKeywords, setActiveSeedKeywords] = useState<string[]>(
    seedKeywords.filter(k => k.active).map(k => k.keyword)
  );
  const [discoveredKeywords, setDiscoveredKeywords] = useState(allKeywords);
  
  // Filter keywords based on selected source and active seed keywords
  useEffect(() => {
    let filtered = [...allKeywords];
    
    // Filter by source
    if (selectedSource !== "All") {
      filtered = filtered.filter(keyword => keyword.source === selectedSource);
    }
    
    // Filter by active seed keywords
    if (activeSeedKeywords.length > 0) {
      filtered = filtered.filter(keyword => 
        activeSeedKeywords.includes(keyword.seed)
      );
    }
    
    setDiscoveredKeywords(filtered);
  }, [selectedSource, activeSeedKeywords]);
  
  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    toast.success(`Filtered by source: ${source}`);
  };

  const handleKeywordToggle = (id: number) => {
    if (selectedKeywords.includes(id)) {
      setSelectedKeywords(selectedKeywords.filter(keywordId => keywordId !== id));
    } else {
      setSelectedKeywords([...selectedKeywords, id]);
    }
  };

  const handleAddKeyword = (id: number) => {
    // This would update the status in a real app
    toast.success(`Added keyword with id: ${id} to your list`);
    console.log(`Adding keyword with id: ${id}`);
  };
  
  const toggleSeedKeyword = (keyword: string) => {
    if (activeSeedKeywords.includes(keyword)) {
      setActiveSeedKeywords(activeSeedKeywords.filter(k => k !== keyword));
      toast.info(`Removed filter: ${keyword}`);
    } else {
      setActiveSeedKeywords([...activeSeedKeywords, keyword]);
      toast.success(`Added filter: ${keyword}`);
    }
  };

  return (
    <Layout title="Keyword Discovery">
      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {metric.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Keywords Count and Source Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg font-medium">
            <span className="font-bold">{discoveredKeywords.length}</span> Keywords
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Sources:</span>
              <div className="flex flex-wrap gap-1">
                {sourceTabs.map(source => (
                  <Badge 
                    key={source}
                    variant={selectedSource === source ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSourceChange(source)}
                  >
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Seed Keywords */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Seed Keywords:</span>
            <div className="flex flex-wrap gap-2">
              {seedKeywords.map(keyword => (
                <Badge 
                  key={keyword.id}
                  variant={activeSeedKeywords.includes(keyword.keyword) ? "secondary" : "outline"}
                  className={`${activeSeedKeywords.includes(keyword.keyword) ? "" : "text-muted-foreground"} cursor-pointer`}
                  onClick={() => toggleSeedKeyword(keyword.keyword)}
                >
                  {keyword.keyword}
                  {activeSeedKeywords.includes(keyword.keyword) && (
                    <button 
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSeedKeyword(keyword.keyword);
                      }}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full h-8 w-8">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <Checkbox 
                    checked={selectedKeywords.length === discoveredKeywords.length && discoveredKeywords.length > 0}
                    onCheckedChange={() => {
                      if (selectedKeywords.length === discoveredKeywords.length) {
                        setSelectedKeywords([]);
                      } else {
                        setSelectedKeywords(discoveredKeywords.map(k => k.id));
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Seed</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead>Discovered On</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discoveredKeywords.length > 0 ? (
                discoveredKeywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedKeywords.includes(keyword.id)}
                        onCheckedChange={() => handleKeywordToggle(keyword.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {keyword.keyword}
                        {keyword.link && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className="font-normal cursor-pointer"
                        onClick={() => toggleSeedKeyword(keyword.seed)}
                      >
                        {keyword.seed}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${keyword.source === "Google" ? "bg-blue-50 text-blue-700 border-blue-200" : 
                            keyword.source === "Reddit" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                            keyword.source === "Competitors" ? "bg-purple-50 text-purple-700 border-purple-200" : 
                            keyword.source === "Q&A Sites" ? "bg-green-50 text-green-700 border-green-200" :
                            "bg-gray-50 text-gray-700 border-gray-200"}
                        `}
                      >
                        {keyword.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {keyword.placement}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {format(keyword.discoveredOn, "MMM d, yyyy")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {keyword.added ? (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Added
                          </Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleAddKeyword(keyword.id)}
                          >
                            <PlusCircle className="h-4 w-4" />
                            Add
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No keywords match your current filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default SearchDiscovery;
