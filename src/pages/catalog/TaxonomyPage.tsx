
import React from "react";
import Layout from "@/components/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { 
  ArrowUpRight, 
  Lightbulb, 
  AlertTriangle, 
  Clock, 
  Tag, 
  Info, 
  CheckCircle2 
} from "lucide-react";
import { useTaxonomyPage } from "@/hooks/useTaxonomyPage";

const TaxonomyPage = () => {
  const { 
    taxonomyHealth, 
    stats, 
    actionItems, 
    recentUpdates,
    attributeCoverage
  } = useTaxonomyPage();

  return (
    <Layout title="Taxonomy Management">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Taxonomy Health Score</CardTitle>
            <CardDescription>
              Overall percentage of products properly mapped to Shopify's taxonomy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {taxonomyHealth < 60 ? 'Needs Improvement' : 
                   taxonomyHealth < 80 ? 'Good' : 'Excellent'}
                </span>
                <span className="text-2xl font-bold">{taxonomyHealth}%</span>
              </div>
              <Progress 
                value={taxonomyHealth} 
                className="h-2"
                style={{
                  background: 'rgb(239, 239, 239)',
                  '--progress-color': taxonomyHealth < 60 ? '#f97316' : 
                                      taxonomyHealth < 80 ? '#3b82f6' : '#22c55e'
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Stats</CardTitle>
            <CardDescription>Overview of your taxonomy coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Products Mapped
                </span>
                <span className="font-medium">{stats.productsMapped}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Products Unmapped
                </span>
                <span className="font-medium">{stats.productsUnmapped}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Categories Used
                </span>
                <span className="font-medium">{stats.categoriesUsed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="h-4 w-4" /> Attribute Coverage
                </span>
                <span className="font-medium">{stats.attributeCoverage}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Attribute Coverage</CardTitle>
            <CardDescription>
              Percentage of products with key attributes completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  coverage: { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                  target: { theme: { light: "#E5E7EB", dark: "#374151" } },
                }}
              >
                <BarChart
                  data={attributeCoverage}
                  margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Attribute
                                </span>
                                <span className="font-bold text-sm">
                                  {payload[0].payload.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Coverage
                                </span>
                                <span className="font-bold text-sm">
                                  {payload[0].value}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-coverage)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Action Items</CardTitle>
            <CardDescription>
              Prioritized tasks to improve your taxonomy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actionItems.map((item, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {item.impact}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Estimated impact on taxonomy health</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Shopify Taxonomy Updates</CardTitle>
            <CardDescription>
              Latest changes that might affect your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <Alert key={index} className="flex items-start">
                  <div className="mr-2 mt-1">
                    {update.type === 'important' ? 
                      <AlertTriangle className="h-4 w-4 text-amber-500" /> : 
                      <Clock className="h-4 w-4 text-blue-500" />
                    }
                  </div>
                  <div>
                    <AlertTitle className="text-sm font-medium mb-1">
                      {update.title}
                    </AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground">
                      {update.description}
                      <div className="mt-1 text-xs text-muted-foreground">
                        {update.date}
                      </div>
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TaxonomyPage;
