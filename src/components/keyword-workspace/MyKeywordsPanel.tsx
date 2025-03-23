
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
  X, 
  Plus,
  ChevronDown,
  ChevronRight,
  FolderPlus
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Group {
  id: string;
  name: string;
  count: number;
  color?: string;
  isDefault?: boolean;
}

interface MyKeywordsPanelProps {
  groups: Group[];
  keywords: any[];
  selectedGroupId: string;
  onSelectGroup: (groupId: string) => void;
  onRemoveKeyword: (keywordId: string, groupId?: string) => void;
  onSelectKeyword: (keyword: any) => void;
  selectedKeywordId: string | null;
  onCreateGroup: (name: string, color?: string) => void;
  onRemoveGroup: (groupId: string) => void;
}

const MyKeywordsPanel: React.FC<MyKeywordsPanelProps> = ({ 
  groups,
  keywords, 
  selectedGroupId,
  onSelectGroup,
  onRemoveKeyword,
  onSelectKeyword,
  selectedKeywordId,
  onCreateGroup,
  onRemoveGroup
}) => {
  const [filter, setFilter] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "all": true
  });
  
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

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    onCreateGroup(newGroupName.trim());
    setNewGroupName("");
  };
  
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">My Keywords</h2>
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
        {groups.length > 0 ? (
          <div className="space-y-2">
            {groups.map(group => (
              <Collapsible
                key={group.id}
                open={expandedGroups[group.id]}
                onOpenChange={() => toggleGroup(group.id)}
                className={`rounded-md ${selectedGroupId === group.id ? 'bg-muted' : ''}`}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left">
                  <div className="flex items-center">
                    {expandedGroups[group.id] ? 
                      <ChevronDown className="h-4 w-4 mr-1" /> : 
                      <ChevronRight className="h-4 w-4 mr-1" />
                    }
                    <div 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: group.color || 'var(--background)' 
                      }}
                    ></div>
                    <span 
                      className={`${selectedGroupId === group.id ? 'font-medium' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectGroup(group.id);
                      }}
                    >
                      {group.name}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {group.count}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 pr-2">
                  {filteredKeywords.length > 0 ? (
                    <div className="space-y-1 py-1">
                      {filteredKeywords.map(keyword => (
                        <div 
                          key={keyword.id} 
                          className={`flex items-center justify-between py-1 px-2 rounded-md cursor-pointer hover:bg-muted/50 group ${
                            selectedKeywordId === keyword.id ? 'bg-primary/10' : ''
                          }`}
                          onClick={() => onSelectKeyword(keyword)}
                        >
                          <div className="flex items-center min-w-0">
                            {renderIntentBadge(keyword.intent || "navigational")}
                            <span className="truncate text-sm">{keyword.keyword}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveKeyword(keyword.id, group.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    group.id === selectedGroupId && (
                      <div className="text-xs text-muted-foreground py-2">
                        No keywords in this group
                      </div>
                    )
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
              <FolderPlus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No keyword groups</p>
            <p className="text-xs text-muted-foreground mt-1">
              Create a group to organize your keywords
            </p>
          </div>
        )}

        {filter && filteredKeywords.length === 0 && (
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
        )}

        {!filter && keywords.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Search className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No keywords selected yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Use the Discovery tab to find and add keywords
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center mb-2">
          <Input
            placeholder="New group name..."
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="flex-1 text-sm h-8"
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 h-8"
            onClick={handleCreateGroup}
            disabled={!newGroupName.trim()}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {keywords.length > 0 && (
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center text-destructive border-destructive/30 mt-2">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Keywords
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyKeywordsPanel;
