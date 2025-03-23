
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  Circle, 
  MoveHorizontal,
  AlertCircle,
  Download,
  RefreshCw,
  ArrowDownWideNarrow,
  Ungroup
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for keyword clusters
const mockClusters = [
  {
    id: 1,
    name: "Product Features",
    color: "blue",
    keywords: [
      "stainless steel water bottle",
      "insulated water bottle",
      "water bottle with filter",
      "collapsible water bottle",
      "bpa free water bottles"
    ],
    metrics: {
      avgVolume: 12500,
      avgDifficulty: 58,
      gaps: 2
    }
  },
  {
    id: 2,
    name: "Usage & Maintenance",
    color: "green",
    keywords: [
      "how to clean water bottle",
      "water bottle cleaning tablets",
      "dishwasher safe water bottles"
    ],
    metrics: {
      avgVolume: 8900,
      avgDifficulty: 31,
      gaps: 0
    }
  },
  {
    id: 3,
    name: "Comparisons",
    color: "purple",
    keywords: [
      "best insulated water bottle",
      "water bottle brands comparison",
      "hydro flask vs yeti"
    ],
    metrics: {
      avgVolume: 15200,
      avgDifficulty: 72,
      gaps: 3
    }
  }
];

// Mock unassigned keywords
const mockUnassignedKeywords = [
  "eco-friendly water bottles",
  "water bottle for hiking",
  "kids water bottle",
  "glass water bottle",
  "water bottle accessories"
];

const getClusterColorClass = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-700 border-blue-300";
    case "green":
      return "bg-green-100 text-green-700 border-green-300";
    case "purple":
      return "bg-purple-100 text-purple-700 border-purple-300";
    case "orange":
      return "bg-orange-100 text-orange-700 border-orange-300";
    case "red":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-blue-100 text-blue-700 border-blue-300";
  }
};

const KeywordClusters = () => {
  const [clusters, setClusters] = useState(mockClusters);
  const [unassignedKeywords, setUnassignedKeywords] = useState(mockUnassignedKeywords);
  const [clusterView, setClusterView] = useState<"visual" | "list">("visual");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" />
            New Cluster
          </Button>
          <Button variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Auto-Cluster
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">View:</div>
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setClusterView("visual")}
              className={`px-3 py-1 text-sm ${clusterView === "visual" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              Visual
            </button>
            <button
              onClick={() => setClusterView("list")}
              className={`px-3 py-1 text-sm ${clusterView === "list" ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              List
            </button>
          </div>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Visual Cluster View */}
      {clusterView === "visual" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Clusters */}
          {clusters.map((cluster) => (
            <div 
              key={cluster.id}
              className={`rounded-lg border p-4 ${getClusterColorClass(cluster.color)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-current" />
                  {cluster.name}
                </h3>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/20 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                {cluster.keywords.map((keyword, index) => (
                  <div 
                    key={index}
                    className="bg-white/60 rounded px-2 py-1 text-sm flex justify-between items-center"
                  >
                    <span>{keyword}</span>
                    <MoveHorizontal className="h-3 w-3 opacity-50" />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-current border-opacity-20">
                <div>
                  <span className="font-medium">{cluster.keywords.length}</span> keywords
                </div>
                <div>
                  Avg. volume: <span className="font-medium">{cluster.metrics.avgVolume.toLocaleString()}</span>
                </div>
                <div>
                  Difficulty: <span className="font-medium">{cluster.metrics.avgDifficulty}</span>
                </div>
                {cluster.metrics.gaps > 0 && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {cluster.metrics.gaps} gaps
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Add New Cluster */}
          <div className="rounded-lg border border-dashed p-4 flex flex-col items-center justify-center text-muted-foreground h-[200px]">
            <Layers className="h-8 w-8 mb-2" />
            <p className="text-sm mb-4">Create a new keyword cluster</p>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Cluster
            </Button>
          </div>
        </div>
      )}
      
      {/* List View */}
      {clusterView === "list" && (
        <div className="space-y-4">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted p-3 flex justify-between items-center">
              <h3 className="font-medium">Clusters</h3>
              <div className="flex gap-2">
                <Select defaultValue="name">
                  <SelectTrigger className="w-[150px] h-8">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="keywords">Sort by Keywords</SelectItem>
                    <SelectItem value="volume">Sort by Volume</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="divide-y">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${cluster.color === 'blue' ? 'bg-blue-500' : cluster.color === 'green' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    <span className="font-medium">{cluster.name}</span>
                    <Badge variant="outline">{cluster.keywords.length} keywords</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Avg. Volume: <span className="font-medium">{cluster.metrics.avgVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Unassigned Keywords */}
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted p-3 flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Ungroup className="h-4 w-4" />
                Unassigned Keywords
              </h3>
              <Button variant="outline" size="sm">Assign All</Button>
            </div>
            
            <div className="p-3">
              <div className="flex flex-wrap gap-2">
                {unassignedKeywords.map((keyword, index) => (
                  <div 
                    key={index}
                    className="bg-muted rounded-full px-3 py-1 text-sm flex items-center gap-2"
                  >
                    <span>{keyword}</span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordClusters;
