
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  ShoppingCart, 
  Search, 
  FileText,
  Filter,
  BarChart2 
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

interface IntentAnalysisProps {
  keywords: any[];
  onSelectKeyword: (keyword: any) => void;
}

const IntentAnalysis: React.FC<IntentAnalysisProps> = ({ 
  keywords,
  onSelectKeyword
}) => {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  
  // Mock data for the intent distribution
  const intentData = [
    { name: 'Informational', value: 42, color: '#3B82F6' },
    { name: 'Commercial', value: 28, color: '#8B5CF6' },
    { name: 'Transactional', value: 18, color: '#10B981' },
    { name: 'Navigational', value: 12, color: '#6B7280' }
  ];
  
  // Content type suggestions based on intent
  const contentSuggestions = {
    'Informational': [
      { type: 'How-to Guide', description: 'Step-by-step instructions' },
      { type: 'FAQ Page', description: 'Frequently asked questions and answers' },
      { type: 'Explainer Article', description: 'Detailed information about concepts' }
    ],
    'Commercial': [
      { type: 'Buying Guide', description: 'Help users make purchase decisions' },
      { type: 'Comparison Page', description: 'Compare products or services' },
      { type: 'Review Content', description: 'Detailed product reviews' }
    ],
    'Transactional': [
      { type: 'Product Page', description: 'Showcase specific products' },
      { type: 'Landing Page', description: 'Conversion-focused pages' },
      { type: 'Pricing Page', description: 'Clear pricing information' }
    ],
    'Navigational': [
      { type: 'About Page', description: 'Company or brand information' },
      { type: 'Contact Page', description: 'Help users get in touch' },
      { type: 'Category Page', description: 'Organize your products or services' }
    ]
  };
  
  // Mock keywords by intent
  const keywordsByIntent = {
    'Informational': [
      { id: 'kw1', keyword: 'how to customize products', volume: 2400, difficulty: 37 },
      { id: 'kw2', keyword: 'product design ideas', volume: 1800, difficulty: 42 },
      { id: 'kw3', keyword: 'what is product customization', volume: 1200, difficulty: 28 }
    ],
    'Commercial': [
      { id: 'kw4', keyword: 'best product customization tools', volume: 1600, difficulty: 52 },
      { id: 'kw5', keyword: 'top customizable products', volume: 1300, difficulty: 45 },
      { id: 'kw6', keyword: 'custom product options', volume: 950, difficulty: 38 }
    ],
    'Transactional': [
      { id: 'kw7', keyword: 'buy custom products', volume: 890, difficulty: 61 },
      { id: 'kw8', keyword: 'product customization service', volume: 780, difficulty: 56 },
      { id: 'kw9', keyword: 'order personalized products', volume: 650, difficulty: 48 }
    ],
    'Navigational': [
      { id: 'kw10', keyword: 'product customization platform', volume: 580, difficulty: 34 },
      { id: 'kw11', keyword: 'custom product builder', volume: 420, difficulty: 29 },
      { id: 'kw12', keyword: 'personalization tool login', volume: 310, difficulty: 22 }
    ]
  };
  
  const renderIntentIcon = (intent: string) => {
    switch (intent) {
      case 'Informational':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'Commercial':
        return <ShoppingCart className="h-5 w-5 text-purple-500" />;
      case 'Transactional':
        return <BarChart2 className="h-5 w-5 text-green-500" />;
      case 'Navigational':
        return <Search className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };
  
  const renderIntentBadge = (intent: string) => {
    switch (intent) {
      case 'Informational':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">Informational</Badge>;
      case 'Commercial':
        return <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">Commercial</Badge>;
      case 'Transactional':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">Transactional</Badge>;
      case 'Navigational':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">Navigational</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Intent Analysis</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Filter Keywords
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Intent Distribution</CardTitle>
            <CardDescription>
              Understanding the intent behind keywords helps create targeted content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }} className="mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={intentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    onClick={(data) => setSelectedIntent(data.name)}
                  >
                    {intentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke={entry.color}
                        strokeWidth={selectedIntent === entry.name ? 2 : 0}
                        style={{ 
                          filter: selectedIntent === entry.name 
                            ? 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))' 
                            : 'none',
                          opacity: selectedIntent && selectedIntent !== entry.name 
                            ? 0.7 
                            : 1
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {intentData.map(intent => (
                <Button
                  key={intent.name}
                  variant={selectedIntent === intent.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedIntent(intent.name === selectedIntent ? null : intent.name)}
                  style={{
                    backgroundColor: selectedIntent === intent.name ? intent.color : undefined,
                    color: selectedIntent === intent.name ? 'white' : undefined,
                    borderColor: intent.color
                  }}
                >
                  {intent.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content Suggestions</CardTitle>
            <CardDescription>
              Recommended content types based on intent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedIntent ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {renderIntentIcon(selectedIntent)}
                  <span className="font-medium">{selectedIntent} Intent</span>
                </div>
                <ul className="space-y-3">
                  {contentSuggestions[selectedIntent as keyof typeof contentSuggestions].map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{suggestion.type}</div>
                        <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <Info className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Select an intent category from the chart to see content suggestions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {selectedIntent ? `${selectedIntent} Keywords` : 'Keywords by Intent'}
          </CardTitle>
          <CardDescription>
            {selectedIntent 
              ? `Keywords with ${selectedIntent.toLowerCase()} intent`
              : 'Select an intent type to filter keywords'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-2 px-4 text-left font-medium text-sm">Keyword</th>
                  <th className="py-2 px-4 text-left font-medium text-sm">Volume</th>
                  <th className="py-2 px-4 text-left font-medium text-sm">Difficulty</th>
                  <th className="py-2 px-4 text-left font-medium text-sm">Intent</th>
                </tr>
              </thead>
              <tbody>
                {(selectedIntent 
                  ? keywordsByIntent[selectedIntent as keyof typeof keywordsByIntent]
                  : Object.values(keywordsByIntent).flat().slice(0, 5)
                ).map((keyword, index) => {
                  const intent = Object.entries(keywordsByIntent).find(([_, keywords]) => 
                    keywords.some(k => k.id === keyword.id)
                  )?.[0] || 'Unknown';
                  
                  return (
                    <tr 
                      key={keyword.id} 
                      className={`border-b hover:bg-muted/50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                      onClick={() => onSelectKeyword(keyword)}
                    >
                      <td className="py-3 px-4">{keyword.keyword}</td>
                      <td className="py-3 px-4">{keyword.volume.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-12 rounded-full bg-gray-200">
                            <div 
                              className={`h-2 rounded-full ${
                                keyword.difficulty > 70 ? 'bg-red-500' : 
                                keyword.difficulty > 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${keyword.difficulty}%` }}
                            ></div>
                          </div>
                          <span>{keyword.difficulty}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {renderIntentBadge(
                          Object.entries(keywordsByIntent).find(([_, keywords]) => 
                            keywords.some(k => k.id === keyword.id)
                          )?.[0] || 'Unknown'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntentAnalysis;
