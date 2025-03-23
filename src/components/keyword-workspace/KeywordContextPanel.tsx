
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  BarChart2, 
  ExternalLink, 
  Flag, 
  Target, 
  FileText,
  Info,
  ShoppingCart,
  Search
} from "lucide-react";

interface KeywordContextPanelProps {
  keyword: any | null;
}

const KeywordContextPanel: React.FC<KeywordContextPanelProps> = ({ keyword }) => {
  if (!keyword) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Info className="h-12 w-12 text-muted-foreground/60 mb-4" />
        <h3 className="text-lg font-medium mb-2">Keyword Details</h3>
        <p className="text-muted-foreground mb-4">
          Select a keyword to view detailed information, metrics, and content suggestions
        </p>
      </div>
    );
  }
  
  const renderIntentIcon = (intent: string) => {
    switch (intent) {
      case 'informational':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'commercial':
        return <ShoppingCart className="h-5 w-5 text-purple-500" />;
      case 'transactional':
        return <BarChart2 className="h-5 w-5 text-green-500" />;
      default:
        return <Search className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Mock monthly trend data for the selected keyword
  const mockMonthlyData = [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 1100 },
    { month: 'Mar', value: 1300 },
    { month: 'Apr', value: 1400 },
    { month: 'May', value: 1800 },
    { month: 'Jun', value: 2000 }
  ];
  
  // Mock SERP features for the selected keyword
  const mockSerpFeatures = [
    { name: 'Featured Snippet', present: true },
    { name: 'People Also Ask', present: true },
    { name: 'Knowledge Panel', present: false },
    { name: 'Top Stories', present: false },
    { name: 'Images', present: true },
    { name: 'Videos', present: false }
  ];
  
  // Mock competitor data for the selected keyword
  const mockCompetitors = [
    { name: 'Competitor A', position: 1, change: 0 },
    { name: 'Competitor B', position: 2, change: 1 },
    { name: 'Competitor C', position: 3, change: -1 },
    { name: 'Your Site', position: 12, change: 3 }
  ];
  
  // Mock related keywords
  const mockRelatedKeywords = [
    { keyword: `${keyword.keyword} guide`, volume: 720 },
    { keyword: `best ${keyword.keyword}`, volume: 580 },
    { keyword: `how to ${keyword.keyword}`, volume: 480 },
    { keyword: `${keyword.keyword} examples`, volume: 320 }
  ];
  
  const getIntentLabel = (intent: string) => {
    switch (intent) {
      case 'informational': return 'Informational';
      case 'commercial': return 'Commercial';
      case 'transactional': return 'Transactional';
      default: return 'Navigational';
    }
  };
  
  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      <div className="mb-4">
        <h2 className="font-medium text-xl">{keyword.keyword}</h2>
        <div className="flex items-center mt-2">
          <Badge 
            variant="outline" 
            className={`mr-2 ${
              keyword.intent === 'informational' ? 'bg-blue-100 text-blue-700 border-blue-300' :
              keyword.intent === 'commercial' ? 'bg-purple-100 text-purple-700 border-purple-300' :
              keyword.intent === 'transactional' ? 'bg-green-100 text-green-700 border-green-300' :
              'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            <div className="flex items-center">
              {renderIntentIcon(keyword.intent || 'navigational')}
              <span className="ml-1">{getIntentLabel(keyword.intent || 'navigational')}</span>
            </div>
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Flag className="h-4 w-4" />
            Flag
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Search Volume</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-medium">{keyword.volume?.toLocaleString() || '1,200'}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <BarChart2 className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-medium">{keyword.difficulty || '45'}/100</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-20">
            <div className="flex items-end justify-between h-full">
              {mockMonthlyData.map((month, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className="w-6 bg-primary/80 rounded-t"
                    style={{ 
                      height: `${(month.value / 2000) * 100}%`,
                      backgroundColor: i === mockMonthlyData.length - 1 ? '#8B5CF6' : undefined
                    }}
                  ></div>
                  <div className="text-xs mt-1 text-muted-foreground">{month.month}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-right text-muted-foreground">
            <span className="text-green-600">+16%</span> from last month
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">SERP Features</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {mockSerpFeatures.map((feature, i) => (
              <div 
                key={i} 
                className={`text-sm flex items-center rounded-md p-2 ${
                  feature.present ? 'bg-green-50 text-green-700' : 'bg-muted/30 text-muted-foreground'
                }`}
              >
                <div 
                  className={`h-2 w-2 rounded-full mr-2 ${
                    feature.present ? 'bg-green-500' : 'bg-muted-foreground'
                  }`}
                ></div>
                {feature.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Competitor Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {mockCompetitors.map((competitor, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between p-2 rounded-md ${
                  competitor.name === 'Your Site' ? 'bg-primary/10 font-medium' : ''
                }`}
              >
                <span>{competitor.name}</span>
                <div className="flex items-center">
                  <span className="mr-2">#{competitor.position}</span>
                  {competitor.change > 0 && (
                    <span className="text-green-600 text-xs">↑{competitor.change}</span>
                  )}
                  {competitor.change < 0 && (
                    <span className="text-red-600 text-xs">↓{Math.abs(competitor.change)}</span>
                  )}
                  {competitor.change === 0 && (
                    <span className="text-gray-600 text-xs">―</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Related Keywords</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {mockRelatedKeywords.map((relatedKw, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span>{relatedKw.keyword}</span>
                <span className="text-muted-foreground">{relatedKw.volume.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <Button variant="link" size="sm" className="mt-2 w-full text-center">
            View all related keywords
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Content Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="font-medium">Comprehensive Guide</div>
                <div className="text-xs text-muted-foreground">Create a detailed guide about {keyword.keyword}</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Target className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="font-medium">Feature Comparison</div>
                <div className="text-xs text-muted-foreground">Compare different {keyword.keyword} options</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <ExternalLink className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="font-medium">Case Studies</div>
                <div className="text-xs text-muted-foreground">Show real examples of {keyword.keyword} in action</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeywordContextPanel;
