
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Upload, 
  Download, 
  Trash2, 
  Filter,
  X 
} from "lucide-react";

interface SelectedKeywordsPanelProps {
  keywords: any[];
  onRemoveKeyword: (keywordId: string) => void;
  onSelectKeyword: (keyword: any) => void;
  selectedKeywordId: string | null;
}

const SelectedKeywordsPanel: React.FC<SelectedKeywordsPanelProps> = ({ 
  keywords, 
  onRemoveKeyword,
  onSelectKeyword,
  selectedKeywordId
}) => {
  const [filter, setFilter] = useState("");
  
  const filteredKeywords = filter 
    ? keywords.filter(k => 
        k.keyword.toLowerCase().includes(filter.toLowerCase())
      )
    : keywords;
  
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
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Selected Keywords</h2>
        <Badge variant="outline" className="text-xs font-normal">
          {keywords.length} Keywords
        </Badge>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter keywords..."
          className="pl-8"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setFilter("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-2 gap-2">
        <Button variant="outline" size="sm" className="w-full flex-1">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="outline" size="sm" className="w-full flex-1">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto mt-4">
        {filteredKeywords.length > 0 ? (
          <div className="space-y-1">
            {filteredKeywords.map(keyword => (
              <div 
                key={keyword.id} 
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted group ${
                  selectedKeywordId === keyword.id ? 'bg-primary/10' : ''
                }`}
                onClick={() => onSelectKeyword(keyword)}
              >
                <div className="flex items-center min-w-0">
                  {renderIntentBadge(keyword.intent || "navigational")}
                  <span className="truncate">{keyword.keyword}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-7 w-7 p-0 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveKeyword(keyword.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          filter ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No keywords match your filter</p>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setFilter("")}
                className="mt-1"
              >
                Clear filter
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No keywords selected yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Use the Discovery tab to find and add keywords
              </p>
            </div>
          )
        )}
      </div>
      
      {filteredKeywords.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center text-destructive border-destructive/30">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Keywords
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectedKeywordsPanel;
