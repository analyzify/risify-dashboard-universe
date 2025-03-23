
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
  Sparkles,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
      keywords: ["product customization", "product features", "product specifications"],
      avgVolume: 1800,
      avgDifficulty: 45
    },
    { 
      id: "cluster2", 
      name: "Buying Guides", 
      color: "#D3E4FD", 
      keywords: ["how to buy", "product comparison", "best options"],
      avgVolume: 2400,
      avgDifficulty: 38
    },
    { 
      id: "cluster3", 
      name: "Troubleshooting", 
      color: "#FFDEE2", 
      keywords: ["common issues", "troubleshooting guide", "fix problems"],
      avgVolume: 1500,
      avgDifficulty: 52
    }
  ]);
  
  const [newClusterName, setNewClusterName] = useState("");
  const [editingClusterId, setEditingClusterId] = useState<string | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  
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
      keywords: [],
      avgVolume: 0,
      avgDifficulty: 0
    };
    
    setClusters([...clusters, newCluster]);
    setNewClusterName("");
  };
  
  const handleDeleteCluster = (clusterId: string) => {
    setClusters(clusters.filter(cluster => cluster.id !== clusterId));
    if (selectedClusterId === clusterId) {
      setSelectedClusterId(null);
    }
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

  const handleSelectCluster = (clusterId: string) => {
    setSelectedClusterId(clusterId === selectedClusterId ? null : clusterId);
  };

  const filteredClusters = filterText
    ? clusters.filter(cluster => 
        cluster.name.toLowerCase().includes(filterText.toLowerCase()) ||
        cluster.keywords.some((kw: string) => 
          kw.toLowerCase().includes(filterText.toLowerCase())
        )
      )
    : clusters;

  const selectedCluster = clusters.find(c => c.id === selectedClusterId);

  // Helper function to render intent indicator
  const renderIntentBadge = (intent: string) => {
    switch (intent) {
      case "informational":
        return <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>;
      case "commercial":
        return <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>;
      case "transactional":
        return <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top action bar */}
      <div className="flex justify-between items-center gap-4 bg-card p-4 rounded-lg border">
        <div className="flex gap-2 items-center flex-1">
          <Input
            placeholder="Filter groups..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="sm" onClick={() => setFilterText("")} disabled={!filterText}>
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleAutoCluster} variant="outline" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            Auto-Cluster
          </Button>
          
          <div className="flex items-center gap-2">
            <Input
              placeholder="New group name..."
              value={newClusterName}
              onChange={(e) => setNewClusterName(e.target.value)}
              className="w-48"
            />
            <Button onClick={handleAddCluster} disabled={!newClusterName} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Create Group
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-4 flex-1 overflow-auto">
        {/* Clusters table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Keyword Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead className="text-right">Keywords</TableHead>
                  <TableHead className="text-right">Avg. Volume</TableHead>
                  <TableHead className="text-right">Avg. Difficulty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClusters.length > 0 ? (
                  filteredClusters.map(cluster => (
                    <TableRow 
                      key={cluster.id}
                      className={`cursor-pointer ${selectedClusterId === cluster.id ? 'bg-primary/10' : ''}`}
                      onClick={() => handleSelectCluster(cluster.id)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: cluster.color }}
                          ></div>
                          {editingClusterId === cluster.id ? (
                            <div className="flex gap-2">
                              <Input 
                                defaultValue={cluster.name}
                                id={`cluster-${cluster.id}-input`}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSaveEdit(cluster.id, (e.target as HTMLInputElement).value);
                                  }
                                }}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                                className="w-48"
                              />
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const input = document.querySelector(`#cluster-${cluster.id}-input`) as HTMLInputElement;
                                  handleSaveEdit(cluster.id, input?.value || cluster.name);
                                }}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="font-medium">{cluster.name}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{cluster.keywords.length}</TableCell>
                      <TableCell className="text-right">{cluster.avgVolume.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="w-12 bg-gray-200 h-2 rounded-full mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                cluster.avgDifficulty > 70 ? 'bg-red-500' : 
                                cluster.avgDifficulty > 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${cluster.avgDifficulty}%` }}
                            ></div>
                          </div>
                          <span>{cluster.avgDifficulty}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(cluster.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCluster(cluster.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Folder className="h-10 w-10 mb-2" />
                        <p>No keyword groups found</p>
                        {filterText && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            onClick={() => setFilterText("")}
                            className="mt-1"
                          >
                            Clear filter
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Selected group details */}
        {selectedCluster && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-2" 
                  style={{ backgroundColor: selectedCluster.color }}
                ></div>
                {selectedCluster.name} - Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Difficulty</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Mapped To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCluster.keywords.length > 0 ? (
                    selectedCluster.keywords.map((keyword: string, index: number) => {
                      // Mock data for each keyword
                      const volume = Math.floor(Math.random() * 5000) + 500;
                      const difficulty = Math.floor(Math.random() * 70) + 20;
                      const intents = ["informational", "commercial", "transactional"];
                      const intent = intents[Math.floor(Math.random() * intents.length)];
                      
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <div 
                              className="cursor-pointer hover:text-primary"
                              onClick={() => {
                                // Find the corresponding keyword object from the keywords array
                                const keywordObj = keywords.find(k => k.keyword === keyword);
                                if (keywordObj) {
                                  onSelectKeyword(keywordObj);
                                }
                              }}
                            >
                              {keyword}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{volume.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <div className="w-12 bg-gray-200 h-2 rounded-full mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    difficulty > 70 ? 'bg-red-500' : 
                                    difficulty > 40 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${difficulty}%` }}
                                ></div>
                              </div>
                              <span>{difficulty}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {renderIntentBadge(intent)}
                              <span className="capitalize">{intent}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {Math.random() > 0.5 ? (
                              <Badge variant="outline" className="text-xs">
                                /pages/{keyword.toLowerCase().replace(/\s+/g, '-')}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <p>No keywords in this group</p>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="mt-1"
                          >
                            Add keywords from discovery
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-dashed"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add keyword
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Empty state when no cluster is selected */}
        {!selectedCluster && filteredClusters.length > 0 && (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Folder className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground mb-2">
                Select a keyword group to view its keywords
              </p>
              <p className="text-sm text-muted-foreground">
                Click on any group in the table above to see its keywords and details
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KeywordClusters;
