
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Download, 
  Share2, 
  Settings, 
  Search,
  Folder,
  TrendingUp,
  PieChart,
  FileText,
  Plus,
  ChevronRight
} from "lucide-react";
import KeywordDiscovery from "@/components/keyword-workspace/KeywordDiscovery";
import KeywordClusters from "@/components/keyword-workspace/KeywordClusters";
import SeasonalTrends from "@/components/keyword-workspace/SeasonalTrends";
import IntentAnalysis from "@/components/keyword-workspace/IntentAnalysis";
import KeywordMapping from "@/components/keyword-workspace/KeywordMapping";
import MyKeywordsPanel from "@/components/keyword-workspace/MyKeywordsPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const KeywordWorkspace = () => {
  const [activeTab, setActiveTab] = useState("discovery");
  const [selectedKeywords, setSelectedKeywords] = useState<any[]>([]);
  const [selectedKeywordForContext, setSelectedKeywordForContext] = useState<any>(null);
  const [keywordGroups, setKeywordGroups] = useState<any[]>([
    { id: "all", name: "All Keywords", count: 0, isDefault: true },
    { id: "group1", name: "Product Features", count: 3, color: "#E5DEFF" },
    { id: "group2", name: "Customer Questions", count: 5, color: "#D3E4FD" },
    { id: "group3", name: "Competitor Terms", count: 2, color: "#FFDEE2" }
  ]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("all");

  const handleAddKeyword = (keyword: any, groupId = "all") => {
    if (!selectedKeywords.find(k => k.id === keyword.id)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
      
      // Update group counts
      setKeywordGroups(prevGroups => {
        return prevGroups.map(group => {
          if (group.id === groupId || group.id === "all") {
            return { ...group, count: group.count + 1 };
          }
          return group;
        });
      });
    }
  };

  const handleRemoveKeyword = (keywordId: string, groupId = "all") => {
    setSelectedKeywords(selectedKeywords.filter(k => k.id !== keywordId));
    
    // Update group counts
    setKeywordGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === groupId || group.id === "all") {
          return { ...group, count: Math.max(0, group.count - 1) };
        }
        return group;
      });
    });
  };

  const handleSelectKeywordForContext = (keyword: any) => {
    setSelectedKeywordForContext(keyword);
  };

  const handleCreateGroup = (name: string, color?: string) => {
    const newGroup = {
      id: `group${Date.now()}`,
      name,
      count: 0,
      color: color || `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    
    setKeywordGroups([...keywordGroups, newGroup]);
    return newGroup.id;
  };

  const handleRemoveGroup = (groupId: string) => {
    if (groupId === "all") return; // Can't remove default group
    
    setKeywordGroups(keywordGroups.filter(g => g.id !== groupId));
    if (selectedGroupId === groupId) {
      setSelectedGroupId("all");
    }
  };

  const nextStep = () => {
    const tabOrder = ["discovery", "clusters", "trends", "intent", "mapping"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  return (
    <Layout title="Keyword Workspace">
      <div className="flex flex-col h-full space-y-4">
        {/* Header with actions */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Keyword Workspace</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Main workspace area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-lg border">
          {/* Left Panel: My Keywords */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-background">
            <MyKeywordsPanel 
              groups={keywordGroups}
              keywords={selectedKeywords} 
              selectedGroupId={selectedGroupId}
              onSelectGroup={setSelectedGroupId}
              onRemoveKeyword={handleRemoveKeyword}
              onSelectKeyword={handleSelectKeywordForContext}
              selectedKeywordId={selectedKeywordForContext?.id}
              onCreateGroup={handleCreateGroup}
              onRemoveGroup={handleRemoveGroup}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Main Workspace Area */}
          <ResizablePanel defaultSize={80} className="bg-background">
            <div className="flex flex-col h-full p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="discovery" className="flex items-center gap-1">
                    <Search className="h-4 w-4" />
                    Discovery
                  </TabsTrigger>
                  <TabsTrigger value="clusters" className="flex items-center gap-1">
                    <Folder className="h-4 w-4" />
                    Clusters
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Trends
                  </TabsTrigger>
                  <TabsTrigger value="intent" className="flex items-center gap-1">
                    <PieChart className="h-4 w-4" />
                    Intent
                  </TabsTrigger>
                  <TabsTrigger value="mapping" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Mapping
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex-1 mt-4 overflow-auto relative">
                  <TabsContent value="discovery" className="h-full mt-0">
                    <KeywordDiscovery 
                      onAddKeyword={handleAddKeyword} 
                      onSelectKeyword={handleSelectKeywordForContext}
                      selectedKeywords={selectedKeywords}
                      groups={keywordGroups}
                    />
                  </TabsContent>
                  
                  <TabsContent value="clusters" className="h-full mt-0">
                    <KeywordClusters 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                      groups={keywordGroups}
                      onCreateGroup={handleCreateGroup}
                      onRemoveGroup={handleRemoveGroup}
                    />
                  </TabsContent>
                  
                  <TabsContent value="trends" className="h-full mt-0">
                    <SeasonalTrends 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                  
                  <TabsContent value="intent" className="h-full mt-0">
                    <IntentAnalysis 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                  
                  <TabsContent value="mapping" className="h-full mt-0">
                    <KeywordMapping 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                  
                  {selectedKeywords.length > 0 && (
                    <div className="absolute bottom-4 right-4">
                      <Button 
                        onClick={nextStep} 
                        className="flex items-center gap-1"
                      >
                        Next Step
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default KeywordWorkspace;
