
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
  Upload,
  Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import KeywordDiscovery from "@/components/keyword-workspace/KeywordDiscovery";
import KeywordClusters from "@/components/keyword-workspace/KeywordClusters";
import SeasonalTrends from "@/components/keyword-workspace/SeasonalTrends";
import IntentAnalysis from "@/components/keyword-workspace/IntentAnalysis";
import KeywordMapping from "@/components/keyword-workspace/KeywordMapping";
import SelectedKeywordsPanel from "@/components/keyword-workspace/SelectedKeywordsPanel";
import KeywordContextPanel from "@/components/keyword-workspace/KeywordContextPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const KeywordWorkspace = () => {
  const [activeTab, setActiveTab] = useState("discovery");
  const [selectedKeywords, setSelectedKeywords] = useState<any[]>([]);
  const [selectedKeywordForContext, setSelectedKeywordForContext] = useState<any>(null);

  const handleAddKeyword = (keyword: any) => {
    if (!selectedKeywords.find(k => k.id === keyword.id)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleRemoveKeyword = (keywordId: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k.id !== keywordId));
  };

  const handleSelectKeywordForContext = (keyword: any) => {
    setSelectedKeywordForContext(keyword);
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
          {/* Left Panel: Selected Keywords */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-background">
            <SelectedKeywordsPanel 
              keywords={selectedKeywords} 
              onRemoveKeyword={handleRemoveKeyword}
              onSelectKeyword={handleSelectKeywordForContext}
              selectedKeywordId={selectedKeywordForContext?.id}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Main Workspace Area */}
          <ResizablePanel defaultSize={55} className="bg-background">
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
                
                <div className="flex-1 mt-4 overflow-auto">
                  <TabsContent value="discovery" className="h-full">
                    <KeywordDiscovery 
                      onAddKeyword={handleAddKeyword} 
                      onSelectKeyword={handleSelectKeywordForContext}
                      selectedKeywords={selectedKeywords}
                    />
                  </TabsContent>
                  
                  <TabsContent value="clusters" className="h-full">
                    <KeywordClusters 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                  
                  <TabsContent value="trends" className="h-full">
                    <SeasonalTrends 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                  
                  <TabsContent value="intent" className="h-full">
                    <IntentAnalysis 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                  
                  <TabsContent value="mapping" className="h-full">
                    <KeywordMapping 
                      keywords={selectedKeywords}
                      onSelectKeyword={handleSelectKeywordForContext}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel: Context Information */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="bg-background">
            <KeywordContextPanel keyword={selectedKeywordForContext} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default KeywordWorkspace;
