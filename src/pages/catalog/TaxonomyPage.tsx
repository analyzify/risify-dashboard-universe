
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle, TrendingUp, Info, ChevronRight } from "lucide-react";
import { useTaxonomyPage } from "@/hooks/useTaxonomyPage";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TaxonomyPage = () => {
  const { 
    taxonomyHealth, 
    stats, 
    actionItems,
    recentUpdates,
    attributeCoverage
  } = useTaxonomyPage();

  // Helper function to get health score color
  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  // Helper function to get impact badge color
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return "bg-red-500 hover:bg-red-600";
      case 'medium': return "bg-amber-500 hover:bg-amber-600";
      case 'low': return "bg-blue-500 hover:bg-blue-600";
      default: return "bg-slate-500 hover:bg-slate-600";
    }
  };

  return (
    <Layout title="Taxonomy Management">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Health Score */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Taxonomy Health</CardTitle>
            <CardDescription>Overall taxonomy quality score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{taxonomyHealth}%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${taxonomyHealth * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <Progress 
                value={taxonomyHealth} 
                className="w-full" 
                style={{ 
                  "--progress-color": getHealthColor(taxonomyHealth)
                } as React.CSSProperties} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Stats</CardTitle>
            <CardDescription>Taxonomy mapping statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Products Mapped:</span>
                <span className="font-medium">{stats.productsMapped}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Products Unmapped:</span>
                <span className="font-medium text-amber-600">{stats.productsUnmapped}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Categories Used:</span>
                <span className="font-medium">{stats.categoriesUsed}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Attribute Coverage:</span>
                <span className="font-medium">{stats.attributeCoverage}%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Attribute Coverage */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Attribute Coverage</CardTitle>
            <CardDescription>Key product attributes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={attributeCoverage}
                  margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Coverage']}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {attributeCoverage.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.value > 80 ? '#22c55e' : entry.value > 50 ? '#f59e0b' : '#ef4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Action Items */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Action Items</CardTitle>
              <CardDescription>Recommended taxonomy improvements</CardDescription>
            </div>
            <Button size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {actionItems.map((item, index) => (
                <li key={index} className="flex flex-col space-y-2 pb-3 border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.title}</span>
                    <Badge variant="default" className={getImpactColor(item.impact)}>
                      {item.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Fix Now
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Updates</CardTitle>
            <CardDescription>Shopify taxonomy changes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentUpdates.map((update, index) => (
                <li key={index} className="flex space-x-3 pb-3 border-b last:border-0">
                  <div className="flex-shrink-0 pt-1">
                    {update.type === 'important' ? (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Info className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{update.title}</h4>
                    <p className="text-xs text-muted-foreground">{update.description}</p>
                    <span className="text-xs text-muted-foreground">{update.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TaxonomyPage;
