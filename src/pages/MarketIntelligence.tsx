
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp, RefreshCw, Download, Share2, Search, X, Plus, ExternalLink, Lightbulb, PieChart, LineChart, BarChart } from "lucide-react";
import CompetitorDetailsPanel from "@/components/market-intelligence/CompetitorDetailsPanel";
import CompetitorRow from "@/components/market-intelligence/CompetitorRow";
import InsightCard from "@/components/market-intelligence/InsightCard";
import RisingTrends from "@/components/market-intelligence/RisingTrends";
import { Skeleton } from "@/components/ui/skeleton";

interface CompetitorData {
  id: number;
  name: string;
  domain: string;
  favicon: string;
  monthlyTraffic: number;
  trafficTrend: number[];
  trafficSources: {
    organic: number;
    direct: number;
    referral: number;
    social: number;
    paid: number;
  };
  topKeywords: string[];
  similarityScore: number;
  isExpanded?: boolean;
  isSelected?: boolean;
}

interface SuggestedCompetitor extends CompetitorData {
  trafficVolume: string;
  similarityPercentage: number;
}

interface TrendingKeyword {
  keyword: string;
  growthPercentage: number;
  competitors: string[];
}

interface TrendingPage {
  url: string;
  domain: string;
  growthPercentage: number;
  mainKeywords: string[];
}

const MarketIntelligence = () => {
  const [isCompetitorPanelOpen, setIsCompetitorPanelOpen] = useState(false);
  const [expandedCompetitorId, setExpandedCompetitorId] = useState<number | null>(null);
  const [selectedCompetitors, setSelectedCompetitors] = useState<CompetitorData[]>([]);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [trendTab, setTrendTab] = useState("keywords");

  const competitors: CompetitorData[] = [
    {
      id: 1,
      name: "Your Store",
      domain: "yourstore.com",
      favicon: "https://placehold.co/16/blue/white.png",
      monthlyTraffic: 245000,
      trafficTrend: [22, 24, 28, 26, 29, 32, 30],
      trafficSources: {
        organic: 45,
        direct: 30,
        referral: 10,
        social: 10,
        paid: 5
      },
      topKeywords: ["online shopping", "fashion store", "buy clothes online"],
      similarityScore: 100,
      isSelected: true
    },
    {
      id: 2,
      name: "Competitor A",
      domain: "competitora.com",
      favicon: "https://placehold.co/16/red/white.png",
      monthlyTraffic: 320000,
      trafficTrend: [26, 28, 32, 35, 38, 42, 45],
      trafficSources: {
        organic: 55,
        direct: 20,
        referral: 15,
        social: 5,
        paid: 5
      },
      topKeywords: ["fashion marketplace", "designer clothes", "online shopping"],
      similarityScore: 92,
      isSelected: true
    },
    {
      id: 3,
      name: "Competitor B",
      domain: "competitorb.com",
      favicon: "https://placehold.co/16/green/white.png",
      monthlyTraffic: 186000,
      trafficTrend: [22, 19, 17, 18, 20, 23, 25],
      trafficSources: {
        organic: 40,
        direct: 25,
        referral: 15,
        social: 15,
        paid: 5
      },
      topKeywords: ["affordable fashion", "trendy clothes", "seasonal clothing"],
      similarityScore: 84,
      isSelected: true
    },
    {
      id: 4,
      name: "Competitor C",
      domain: "competitorc.com",
      favicon: "https://placehold.co/16/purple/white.png",
      monthlyTraffic: 425000,
      trafficTrend: [32, 36, 34, 38, 42, 44, 48],
      trafficSources: {
        organic: 50,
        direct: 25,
        referral: 10,
        social: 5,
        paid: 10
      },
      topKeywords: ["luxury fashion", "premium clothing", "high-end apparel"],
      similarityScore: 78,
      isSelected: true
    }
  ];

  const suggestedCompetitors: SuggestedCompetitor[] = [
    {
      id: 5,
      name: "Fashion Hub",
      domain: "fashionhub.com",
      favicon: "https://placehold.co/16/orange/white.png",
      monthlyTraffic: 290000,
      trafficVolume: "290K/mo",
      trafficTrend: [24, 26, 29, 32, 34, 36, 38],
      trafficSources: {
        organic: 48,
        direct: 22,
        referral: 12,
        social: 8,
        paid: 10
      },
      topKeywords: ["fashion trends", "seasonal styles", "casual clothing"],
      similarityScore: 88,
      similarityPercentage: 88
    },
    {
      id: 6,
      name: "Style Market",
      domain: "stylemarket.com",
      favicon: "https://placehold.co/16/teal/white.png",
      monthlyTraffic: 310000,
      trafficVolume: "310K/mo",
      trafficTrend: [28, 30, 32, 35, 38, 40, 42],
      trafficSources: {
        organic: 52,
        direct: 18,
        referral: 15,
        social: 10,
        paid: 5
      },
      topKeywords: ["trending fashion", "seasonal outfits", "style guide"],
      similarityScore: 82,
      similarityPercentage: 82
    },
    {
      id: 7,
      name: "Apparel World",
      domain: "apparelworld.com",
      favicon: "https://placehold.co/16/brown/white.png",
      monthlyTraffic: 215000,
      trafficVolume: "215K/mo",
      trafficTrend: [22, 24, 26, 28, 27, 30, 32],
      trafficSources: {
        organic: 45,
        direct: 25,
        referral: 12,
        social: 8,
        paid: 10
      },
      topKeywords: ["clothing store", "affordable outfits", "wardrobe essentials"],
      similarityScore: 75,
      similarityPercentage: 75
    }
  ];

  const trendingKeywords: TrendingKeyword[] = [
    {
      keyword: "sustainable fashion",
      growthPercentage: 128,
      competitors: ["Competitor A", "Competitor C"]
    },
    {
      keyword: "athleisure wear",
      growthPercentage: 95,
      competitors: ["Competitor B"]
    },
    {
      keyword: "vintage clothing",
      growthPercentage: 87,
      competitors: ["Competitor A", "Competitor B"]
    },
    {
      keyword: "capsule wardrobe",
      growthPercentage: 72,
      competitors: ["Competitor C"]
    },
    {
      keyword: "summer essentials",
      growthPercentage: 65,
      competitors: ["Competitor A", "Competitor C"]
    }
  ];

  const trendingPages: TrendingPage[] = [
    {
      url: "/sustainability-collection",
      domain: "competitora.com",
      growthPercentage: 156,
      mainKeywords: ["sustainable fashion", "eco-friendly clothing"]
    },
    {
      url: "/athleisure-collection",
      domain: "competitorb.com",
      growthPercentage: 112,
      mainKeywords: ["athleisure wear", "workout clothes"]
    },
    {
      url: "/vintage-collection",
      domain: "competitora.com",
      growthPercentage: 98,
      mainKeywords: ["vintage clothing", "retro fashion"]
    },
    {
      url: "/minimalist-wardrobe-guide",
      domain: "competitorc.com",
      growthPercentage: 87,
      mainKeywords: ["capsule wardrobe", "minimalist fashion"]
    },
    {
      url: "/summer-style-essentials",
      domain: "competitora.com",
      growthPercentage: 76,
      mainKeywords: ["summer essentials", "seasonal fashion"]
    }
  ];

  const toggleCompetitorPanel = () => {
    setIsCompetitorPanelOpen(!isCompetitorPanelOpen);
  };

  const handleExpandCompetitor = (id: number) => {
    setExpandedCompetitorId(expandedCompetitorId === id ? null : id);
  };

  const handleAddCompetitor = (competitor: SuggestedCompetitor) => {
    if (!selectedCompetitors.find(c => c.id === competitor.id)) {
      setSelectedCompetitors([...selectedCompetitors, competitor]);
    }
  };

  const handleRemoveCompetitor = (competitorId: number) => {
    setSelectedCompetitors(selectedCompetitors.filter(c => c.id !== competitorId));
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Layout title="Market Intelligence">
      <div className="space-y-6">
        {/* Header & Control Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Market Intelligence</h1>
            <span className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-[180px] justify-between">
                  {dateRange}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] p-0">
                <div className="flex flex-col">
                  {["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "Custom range"].map((range) => (
                    <Button
                      key={range}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setDateRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Competitor Selection Panel */}
        <Collapsible open={isCompetitorPanelOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="mb-4" onClick={toggleCompetitorPanel}>
              {isCompetitorPanelOpen ? "Hide Competitors" : "Edit Competitors"}
              {isCompetitorPanelOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 bg-muted/20 p-4 rounded-lg animate-accordion-down">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for competitors..." className="pl-8" />
              </div>
              <Button>Apply</Button>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {selectedCompetitors.map((competitor) => (
                <Badge key={competitor.id} variant="secondary" className="flex items-center gap-1">
                  <img src={competitor.favicon} alt="" className="h-3 w-3 mr-1" />
                  {competitor.name}
                  <button onClick={() => handleRemoveCompetitor(competitor.id)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-2">
                {suggestedCompetitors.map((competitor) => (
                  <div key={competitor.id} className="flex-shrink-0 w-60 p-3 border rounded-md bg-background">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img src={competitor.favicon} alt="" className="h-4 w-4" />
                        <span className="font-medium">{competitor.domain}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleAddCompetitor(competitor)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{competitor.trafficVolume}</span>
                      <span>{competitor.similarityPercentage}% similar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Competitive Analysis Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Competitor</TableHead>
                  <TableHead className="w-[100px]">Monthly Traffic</TableHead>
                  <TableHead className="w-[120px]">Traffic Trend</TableHead>
                  <TableHead className="w-[120px]">Traffic Sources</TableHead>
                  <TableHead className="w-[200px]">Top Keywords</TableHead>
                  <TableHead className="w-[100px]">Similarity</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((competitor) => (
                  <React.Fragment key={competitor.id}>
                    <CompetitorRow 
                      competitor={competitor} 
                      isExpanded={expandedCompetitorId === competitor.id}
                      onExpand={() => handleExpandCompetitor(competitor.id)}
                      formatNumber={formatNumber}
                    />
                    {expandedCompetitorId === competitor.id && (
                      <TableRow>
                        <TableCell colSpan={7} className="p-0">
                          <CompetitorDetailsPanel competitor={competitor} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Rising Trends Section */}
        <RisingTrends 
          trendingKeywords={trendingKeywords} 
          trendingPages={trendingPages} 
          activeTab={trendTab}
          onTabChange={setTrendTab}
        />

        {/* Quick Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <InsightCard 
            title="Competitor Growth Leader" 
            value="Competitor C" 
            trend="+28%" 
            description="Highest traffic growth in last 90 days"
            icon={<LineChart className="h-5 w-5 text-green-500" />}
          />
          <InsightCard 
            title="Keyword Opportunities" 
            value="12 Keywords" 
            trend="High potential" 
            description="Popular keywords you don't rank for yet"
            icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
          />
          <InsightCard 
            title="Traffic Source Gap" 
            value="Social Media" 
            trend="-35% vs competitors" 
            description="Source where competitors outperform you"
            icon={<PieChart className="h-5 w-5 text-blue-500" />}
          />
          <InsightCard 
            title="New Content Alert" 
            value="8 New Pages" 
            trend="Last 30 days" 
            description="Recently published competitor content"
            icon={<BarChart className="h-5 w-5 text-purple-500" />}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MarketIntelligence;
