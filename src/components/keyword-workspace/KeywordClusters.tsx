
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Folder, 
  Trash2, 
  MoveHorizontal, 
  Edit, 
  Save, 
  Magic 
} from "lucide-react";

interface KeywordClustersProps {
  keywords: any[];
  onSelectKeyword: (keyword: any) => void;
}

const KeywordClusters: React.FC<KeywordClustersProps> = ({ 
  keywords,
  onSelectKeyword
}) => {
  const [clusters, setClusters] = useState<any[]>([
    { 
      id: "cluster1", 
      name: "Product Features", 
      color: "#E5DEFF", 
      keywords: ["product customization", "product features", "product specifications"]
    },
    { 
      id: "cluster2", 
      name: "Buying Guides", 
      color: "#D3E4FD", 
      keywords: ["how to buy", "product comparison", "best options"]
    },
    { 
      id: "cluster3", 
      name: "Troubleshooting", 
      color: "#FFDEE2", 
      keywords: ["common issues", "troubleshooting guide", "fix problems"]
    }
  ]);
  
  const [newClusterName, setNewClusterName] = useState("");
  const [editingClusterId, setEditingClusterId] = useState<string | null>(null);
  
  const clusterColors = [
    "#E5DEFF", "#D3E4FD", "#FFDEE2", "#FDE1D3", "#F2FCE2", 
    "#FEF7CD", "#FEC6A1", "#FFEED1", "#E0F5FF", "#F1F0FB"
  ];
  
  const handleAddCluster = () => {
    if (!newClusterName) return;
    
    const newCluster = {
      id: `cluster${Date.now()}`,
      name: newClusterName,
      color: clusterColors[Math.floor(Math.random() * clusterColors.length)],
      keywords: []
    };
    
    setClusters([...clusters, newCluster]);
    setNewClusterName("");
  };
  
  const handleDeleteCluster = (clusterId: string) => {
    setClusters(clusters.filter(cluster => cluster.id !== clusterId));
  };
  
  const handleEdit = (clusterId: string) => {
    setEditingClusterId(clusterId);
  };
  
  const handleSaveEdit = (clusterId: string, newName: string) => {
    setClusters(clusters.map(cluster => 
      cluster.id === clusterId 
        ? { ...cluster, name: newName } 
        : cluster
    ));
    setEditingClusterId(null);
  };
  
  const handleAutoCluster = () => {
    // In a real app, this would use an algorithm to automatically group keywords
    // For the mockup, we'll just display a message
    alert("Auto-clustering would analyze your keywords and create semantic groups automatically.");
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="New cluster name..."
            value={newClusterName}
            onChange={(e) => setNewClusterName(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleAddCluster} disabled={!newClusterName} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Cluster
          </Button>
        </div>
        <Button onClick={handleAutoCluster} variant="outline" className="flex items-center gap-1">
          <Magic className="h-4 w-4" />
          Auto-Cluster
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto pb-6">
        {clusters.map(cluster => (
          <Card key={cluster.id} style={{ borderTop: `4px solid ${cluster.color}` }}>
            <CardHeader className="pb-2">
              {editingClusterId === cluster.id ? (
                <div className="flex gap-2">
                  <Input 
                    defaultValue={cluster.name}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit(cluster.id, e.currentTarget.value);
                      }
                    }}
                    autoFocus
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleSaveEdit(cluster.id, 
                      document.querySelector(`#cluster-${cluster.id}-input`)?.value || cluster.name)}
                    className="h-10 p-2"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <Folder className="h-5 w-5 mr-2" style={{ color: cluster.color }} />
                    {cluster.name}
                  </CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(cluster.id)} className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCluster(cluster.id)} className="h-8 w-8 p-0 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 min-h-[100px]">
                {cluster.keywords.map((keyword: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-accent py-1.5"
                    onClick={() => {
                      // Find the corresponding keyword object from the keywords array
                      const keywordObj = keywords.find(k => k.keyword === keyword);
                      if (keywordObj) {
                        onSelectKeyword(keywordObj);
                      }
                    }}
                  >
                    {keyword}
                  </Badge>
                ))}
                <Badge 
                  variant="outline" 
                  className="cursor-pointer border-dashed hover:bg-accent py-1.5"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add keyword
                </Badge>
              </div>
              <div className="mt-4 text-xs text-muted-foreground flex justify-between">
                <span>{cluster.keywords.length} keywords</span>
                <span>Avg. difficulty: 45</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeywordClusters;
