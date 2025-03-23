
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  FileText, 
  ShoppingCart, 
  Compass, 
  PieChart,
  FileSpreadsheet,
  Download,
  HelpCircle,
  Copy
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock intent data
const intentData = [
  { name: "Informational", value: 42, color: "#3B82F6" },
  { name: "Commercial", value: 38, color: "#8B5CF6" },
  { name: "Transactional", value: 15, color: "#10B981" },
  { name: "Navigational", value: 5, color: "#6B7280" }
];

// Mock keyword intent data
const keywordIntentData = [
  { 
    keyword: "eco-friendly water bottles", 
    volume: 5400, 
    intent: "informational",
    confidence: 87,
    contentType: "Guide/Blog Post"
  },
  { 
    keyword: "best insulated water bottle", 
    volume: 22000, 
    intent: "commercial",
    confidence: 92,
    contentType: "Comparison Page"
  },
  { 
    keyword: "stainless steel water bottle", 
    volume: 33500, 
    intent: "transactional",
    confidence: 78,
    contentType: "Product Page"
  },
  { 
    keyword: "water bottle with filter", 
    volume: 12400, 
    intent: "informational",
    confidence: 65,
    contentType: "Guide/Blog Post"
  },
  { 
    keyword: "buy hydro flask water bottle", 
    volume: 8900, 
    intent: "transactional",
    confidence: 95,
    contentType: "Product Page"
  },
  { 
    keyword: "how to clean water bottle", 
    volume: 18200, 
    intent: "informational",
    confidence: 96,
    contentType: "How-to Guide"
  },
  { 
    keyword: "yeti website", 
    volume: 3200, 
    intent: "navigational",
    confidence: 94,
    contentType: "N/A"
  },
  { 
    keyword: "water bottle brands", 
    volume: 14500, 
    intent: "commercial",
    confidence: 89,
    contentType: "Listicle/Comparison"
  }
];

// Intent icons
const getIntentIcon = (intent: string) => {
  switch (intent) {
    case "informational":
      return <Lightbulb className="h-4 w-4" />;
    case "commercial":
      return <FileText className="h-4 w-4" />;
    case "transactional":
      return <ShoppingCart className="h-4 w-4" />;
    case "navigational":
      return <Compass className="h-4 w-4" />;
    default:
      return <HelpCircle className="h-4 w-4" />;
  }
};

// Intent colors
const getIntentColor = (intent: string) => {
  switch (intent) {
    case "informational":
      return "bg-blue-100 text-blue-700";
    case "commercial":
      return "bg-purple-100 text-purple-700";
    case "transactional":
      return "bg-green-100 text-green-700";
    case "navigational":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// Badge color
const getIntentBadgeColor = (intent: string) => {
  switch (intent) {
    case "informational":
      return "bg-blue-500 hover:bg-blue-600";
    case "commercial":
      return "bg-purple-500 hover:bg-purple-600";
    case "transactional":
      return "bg-green-500 hover:bg-green-600";
    case "navigational":
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "";
  }
};

const IntentAnalysis = () => {
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [selectedIntent, setSelectedIntent] = useState("all");
  
  const filteredKeywords = selectedIntent === "all" 
    ? keywordIntentData 
    : keywordIntentData.filter(k => k.intent === selectedIntent);
    
  // Calculate total volume by intent
  const volumeByIntent: Record<string, number> = {};
  keywordIntentData.forEach(k => {
    if (!volumeByIntent[k.intent]) volumeByIntent[k.intent] = 0;
    volumeByIntent[k.intent] += k.volume;
  });
  
  const totalVolume = Object.values(volumeByIntent).reduce((sum, vol) => sum + vol, 0);
  
  // Content type recommendations
  const contentRecommendations = [
    {
      intent: "informational",
      title: "Informational Content",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "bg-blue-500",
      types: ["How-to guides", "Educational blog posts", "FAQs", "Resource pages", "Infographics"]
    },
    {
      intent: "commercial",
      title: "Commercial Content",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-purple-500",
      types: ["Comparison pages", "Reviews", "Buying guides", "Best X for Y posts", "Alternatives pages"]
    },
    {
      intent: "transactional",
      title: "Transactional Content",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "bg-green-500",
      types: ["Product pages", "Category pages", "Landing pages", "Special offers", "Cart optimizations"]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <Select defaultValue="all" onValueChange={setSelectedCluster}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Clusters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clusters</SelectItem>
              <SelectItem value="product">Product Features</SelectItem>
              <SelectItem value="usage">Usage & Maintenance</SelectItem>
              <SelectItem value="comparisons">Comparisons</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all" onValueChange={setSelectedIntent}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Intents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Intents</SelectItem>
              <SelectItem value="informational">Informational</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="transactional">Transactional</SelectItem>
              <SelectItem value="navigational">Navigational</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <FileSpreadsheet className="h-4 w-4" />
            Export Intent Data
          </Button>
        </div>
      </div>
      
      {/* Intent distribution chart */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Intent Distribution</CardTitle>
              <CardDescription>Breakdown of search intent in your keyword set</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <RechartsPieChart>
                    <Pie
                      data={intentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {intentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["informational", "commercial", "transactional", "navigational"].map((intent) => {
              const intentObj = intentData.find(i => i.name.toLowerCase() === intent);
              const volume = volumeByIntent[intent] || 0;
              const volumePercentage = ((volume / totalVolume) * 100).toFixed(1);
              
              return (
                <Card key={intent} className={`${getIntentColor(intent)} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      {getIntentIcon(intent)}
                      {intentObj?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{intentObj?.value}%</div>
                    <div className="text-sm opacity-80">
                      {volume.toLocaleString()} monthly searches ({volumePercentage}% of volume)
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Intent Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Your keyword set is primarily <strong>informational (42%)</strong> and <strong>commercial (38%)</strong>, 
                indicating users are in research and consideration phases.
              </p>
              <p>
                Only <strong>15%</strong> of keywords show transactional intent - there may be 
                opportunities to target more purchase-ready terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Keywords by intent */}
      <div className="rounded-md border">
        <div className="bg-muted p-3 flex justify-between items-center">
          <h3 className="font-medium">Keywords by Intent</h3>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Intent</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Recommended Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKeywords.map((keyword, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{keyword.keyword}</TableCell>
                <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getIntentBadgeColor(keyword.intent)} variant="default">
                    <div className="flex items-center gap-1">
                      {getIntentIcon(keyword.intent)}
                      <span className="capitalize">{keyword.intent}</span>
                    </div>
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-gray-200">
                      <div 
                        className={`h-full rounded-full ${keyword.confidence > 80 ? 'bg-green-500' : keyword.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${keyword.confidence}%` }}
                      ></div>
                    </div>
                    <span>{keyword.confidence}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <span>{keyword.contentType}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Content recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contentRecommendations.map((rec, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className={`w-8 h-8 rounded-full ${rec.color} text-white flex items-center justify-center mb-2`}>
                {rec.icon}
              </div>
              <CardTitle className="text-base">{rec.title}</CardTitle>
              <CardDescription>
                {
                  rec.intent === "informational" ? "Answer questions & educate" :
                  rec.intent === "commercial" ? "Help users evaluate options" :
                  "Convert ready-to-buy users"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {rec.types.map((type, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    {type}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">See Examples</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntentAnalysis;
