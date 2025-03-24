
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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

interface RisingTrendsProps {
  trendingKeywords: TrendingKeyword[];
  trendingPages: TrendingPage[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const RisingTrends: React.FC<RisingTrendsProps> = ({ 
  trendingKeywords, 
  trendingPages, 
  activeTab,
  onTabChange
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Rising Trends</h2>
          <Button variant="outline" size="sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="keywords">Rising Keywords</TabsTrigger>
            <TabsTrigger value="pages">Rising Pages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keywords" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead>Top Competitors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendingKeywords.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.keyword}</TableCell>
                    <TableCell>
                      <span className="text-green-500 font-medium">+{item.growthPercentage}%</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.competitors.map((competitor, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {competitor}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="pages" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead>Main Keywords</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendingPages.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{item.url}</span>
                        <span className="text-xs text-muted-foreground">{item.domain}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-green-500 font-medium">+{item.growthPercentage}%</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.mainKeywords.map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RisingTrends;
