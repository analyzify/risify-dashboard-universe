
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Save, 
  Download, 
  Share2, 
  Settings, 
  Search,
  Plus,
  Link,
  ExternalLink,
  MoreHorizontal,
  ArrowUpDown,
  Filter
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { preselectedKeywords, preselectedGroups } from "@/lib/mock-data";
import { toast } from "sonner";

const KeywordWorkspace = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<any[]>(preselectedKeywords);
  const [keywordGroups, setKeywordGroups] = useState<any[]>(preselectedGroups);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddKeyword = () => {
    toast.success("Add keyword modal would appear here");
  };

  const getFilteredKeywords = () => {
    if (!searchQuery) return selectedKeywords;
    
    return selectedKeywords.filter(keyword => 
      keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getGroupName = (groupId: string) => {
    const group = keywordGroups.find(g => g.id === groupId);
    return group ? group.name : "Unassigned";
  };

  // Mock relationship data
  const getRelationship = (keyword: any) => {
    // For demo purposes, assign relationships to specific keywords
    if (keyword.keyword.includes("jackets") || keyword.keyword.includes("north face")) {
      return {
        type: "Parent-Child",
        connections: Math.floor(Math.random() * 3) + 1
      };
    } else if (keyword.keyword.includes("snow") || keyword.keyword.includes("bernard")) {
      return {
        type: "Related Concept",
        connections: 1
      };
    }
    return { type: "None", connections: 0 };
  };

  // Mock URL mapping data
  const getUrlMapping = (keyword: any) => {
    // For demo purposes, map some keywords to URLs
    if (keyword.keyword === "winter jackets") {
      return "/winter-collection/jackets";
    } else if (keyword.keyword === "north face jackets") {
      return "/brands/north-face/jackets";
    } else if (keyword.keyword === "saint bernard") {
      return "/about/brand-story";
    } else if (keyword.keyword === "snow shoes") {
      return "/winter-gear/footwear/snow-shoes";
    } else if (Math.random() > 0.6) {
      // Randomly map some keywords
      return `/products/${keyword.keyword.toLowerCase().replace(/\s+/g, '-')}`;
    }
    return null;
  };

  const filteredKeywords = getFilteredKeywords();

  return (
    <Layout title="Keyword Workspace">
      <div className="flex flex-col h-full space-y-4">
        <Tabs defaultValue="workspace" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Keyword Workspace</h1>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search keywords..." 
                  className="pl-8"
                />
              </div>
              <Button 
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                New Keyword
              </Button>
            </div>
          </div>
          
          <TabsList className="mb-6">
            <TabsTrigger value="workspace">Keyword Workspace</TabsTrigger>
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
            <TabsTrigger value="clusters">Clusters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workspace" className="h-full mt-0">
            <div className="flex flex-col h-full space-y-4">
              {/* Workspace header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Keyword Workspace</h2>
                  <p className="text-muted-foreground text-sm">
                    Unified view of keywords with groups, relationships, and URL mappings
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleAddKeyword} className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add Keyword
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Search and filter controls */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search keywords..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Group
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Link className="h-4 w-4" />
                  Relationship
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  URL Mapping
                </Button>
              </div>
              
              {/* Keywords table */}
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-[300px]">
                        Keyword
                      </TableHead>
                      <TableHead>
                        Group
                      </TableHead>
                      <TableHead>
                        Relationship
                      </TableHead>
                      <TableHead>
                        URL Mapping
                      </TableHead>
                      <TableHead className="w-[60px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeywords.map((keyword) => {
                      const relationship = getRelationship(keyword);
                      const urlMapping = getUrlMapping(keyword);
                      // Assign keywords to groups for demo purposes
                      let groupId;
                      if (keyword.keyword.includes("jackets") || keyword.keyword.includes("coat")) {
                        groupId = "jackets";
                      } else if (keyword.keyword.includes("bernard")) {
                        groupId = "brand";
                      } else if (keyword.keyword.includes("snow") || keyword.keyword.includes("boot")) {
                        groupId = "footwear";
                      } else if (keyword.keyword.includes("accessories")) {
                        groupId = "accessories";
                      } else {
                        groupId = "all";
                      }
                      
                      return (
                        <TableRow key={keyword.id}>
                          <TableCell className="w-[30px]">
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">
                            {keyword.keyword}
                          </TableCell>
                          <TableCell>
                            {groupId !== "all" && (
                              <Badge variant="secondary" className="px-2 py-1 text-xs">
                                {getGroupName(groupId)}
                              </Badge>
                            )}
                            {groupId === "all" && <span className="text-muted-foreground">Unassigned</span>}
                          </TableCell>
                          <TableCell>
                            {relationship.type !== "None" ? (
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                  <Link className="h-3 w-3" /> 
                                  {relationship.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {relationship.connections} connection{relationship.connections !== 1 ? 's' : ''}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">None</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {urlMapping ? (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-blue-600 truncate max-w-[200px]">
                                  {urlMapping}
                                </span>
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Not mapped</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredKeywords.length} of {selectedKeywords.length} keywords
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="discovery" className="h-full mt-0">
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Discovery tab content</p>
            </div>
          </TabsContent>
          
          <TabsContent value="clusters" className="h-full mt-0">
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Clusters tab content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default KeywordWorkspace;
