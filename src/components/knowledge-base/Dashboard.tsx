
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  Building2, 
  Palette, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Headphones,
  PieChart,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CompletionIndicator from "./CompletionIndicator";

// Import the knowledge base data
import knowledgeBaseData from "@/data/knowledgeBase.json";

const iconMap: Record<string, React.ReactNode> = {
  "Building2": <Building2 className="h-5 w-5" />,
  "Palette": <Palette className="h-5 w-5" />,
  "ShoppingBag": <ShoppingBag className="h-5 w-5" />,
  "TrendingUp": <TrendingUp className="h-5 w-5" />,
  "Users": <Users className="h-5 w-5" />,
  "HeadphonesIcon": <Headphones className="h-5 w-5" />
};

const Dashboard = () => {
  const { overview, categories } = knowledgeBaseData;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Knowledge Base Overview</CardTitle>
          <CardDescription>
            Your central repository for business, brand, and product information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32">
                <PieChart className="h-32 w-32 text-muted stroke-[1.5]" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{overview.completionScore}%</span>
                  <span className="text-xs text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Recent Updates
                </h3>
                <div className="space-y-2">
                  {overview.recentUpdates.slice(0, 3).map((update, index) => (
                    <div key={index} className="flex justify-between text-sm border-b border-muted pb-2">
                      <span className="font-medium">{update.category}</span>
                      <span className="text-muted-foreground">
                        {format(new Date(update.updatedAt), "MMM d, yyyy")} by {update.user}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/content/knowledge-base/setup">Setup Wizard</Link>
            </Button>
            <Button>Add Document</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Categories Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Knowledge Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-md text-primary">
                      {iconMap[category.icon] || <Building2 className="h-5 w-5" />}
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <CompletionIndicator percentage={category.completionPercentage} />
                <p className="text-sm mt-2">
                  <span className="text-muted-foreground">{category.documents.length} documents</span>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link to={`/content/knowledge-base/${category.id}`}>
                    View Documents
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
