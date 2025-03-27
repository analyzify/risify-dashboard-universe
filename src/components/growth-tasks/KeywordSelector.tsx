
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, TrendingUp, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Keyword } from '@/data/growthTasks';

interface KeywordSelectorProps {
  keywords: Keyword[];
  onBack: () => void;
  onContinue: (selectedKeywords: string[]) => void;
}

const KeywordSelector: React.FC<KeywordSelectorProps> = ({ keywords, onBack, onContinue }) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  
  const filteredKeywords = searchQuery 
    ? keywords.filter(k => k.keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    : keywords;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">2</div>
          <h1 className="text-2xl font-bold">Select Target Keywords</h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-11">
          Choose keywords to target with your optimization
        </p>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Recommended Keywords</CardTitle>
            <CardDescription>
              Based on your store data and search trends, we recommend these keywords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap mb-4">
              {keywords.slice(0, 3).map(keyword => (
                <Badge 
                  key={keyword.keyword} 
                  variant={selectedKeywords.includes(keyword.keyword) ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1 px-3"
                  onClick={() => toggleKeyword(keyword.keyword)}
                >
                  {keyword.keyword}
                </Badge>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setSelectedKeywords(keywords.slice(0, 3).map(k => k.keyword))}
            >
              <Sparkles size={16} />
              Use Recommended Keywords
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Keywords</h2>
          <div className="relative w-64">
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-8" 
              placeholder="Search keywords" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 w-10"></th>
                  <th className="text-left p-3">Keyword</th>
                  <th className="text-center p-3">Search Volume</th>
                  <th className="text-center p-3">Difficulty</th>
                  <th className="text-center p-3">Current Ranking</th>
                  <th className="text-center p-3">Opportunity</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map((keyword, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-muted/20">
                    <td className="p-3">
                      <Checkbox 
                        checked={selectedKeywords.includes(keyword.keyword)}
                        onCheckedChange={() => toggleKeyword(keyword.keyword)}
                      />
                    </td>
                    <td className="p-3 font-medium">{keyword.keyword}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp size={14} className="text-muted-foreground" />
                        {keyword.volume.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className={
                        keyword.difficulty === 'low' ? 'bg-green-50 text-green-700' :
                        keyword.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                        keyword.difficulty === 'high' ? 'bg-orange-50 text-orange-700' :
                        'bg-red-50 text-red-700'
                      }>
                        {keyword.difficulty}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      {keyword.currentRanking ? 
                        <span className="font-semibold">{keyword.currentRanking}</span> : 
                        <span className="text-muted-foreground">Not ranking</span>
                      }
                    </td>
                    <td className="p-3 text-center">
                      <Badge className={
                        keyword.opportunity === 'excellent' ? 'bg-green-100 text-green-800' :
                        keyword.opportunity === 'good' ? 'bg-blue-100 text-blue-800' :
                        keyword.opportunity === 'potential' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {keyword.opportunity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Tasks
        </Button>
        <Button 
          onClick={() => onContinue(selectedKeywords)}
          disabled={selectedKeywords.length === 0}
        >
          Continue to Page Selection
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default KeywordSelector;
