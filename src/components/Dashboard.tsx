
import React from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Search,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import DashboardCard from "./DashboardCard";
import MetricsCard from "./MetricsCard";
import PerformanceChart from "./PerformanceChart";
import TaskItem from "./TaskItem";
import Button from "./Button";

const performanceData = [
  {
    name: "Jan",
    traffic: 1000,
    rankings: 20,
    conversions: 40,
  },
  {
    name: "Feb",
    traffic: 1200,
    rankings: 24,
    conversions: 45,
  },
  {
    name: "Mar",
    traffic: 1500,
    rankings: 28,
    conversions: 48,
  },
  {
    name: "Apr",
    traffic: 1300,
    rankings: 26,
    conversions: 52,
  },
  {
    name: "May",
    traffic: 1700,
    rankings: 31,
    conversions: 58,
  },
  {
    name: "Jun",
    traffic: 2000,
    rankings: 35,
    conversions: 62,
  },
  {
    name: "Jul",
    traffic: 2200,
    rankings: 37,
    conversions: 68,
  },
];

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Store Health Score"
          value="72"
          trend="up"
          change={12}
          icon={<TrendingUp className="h-4 w-4" />}
          animate="slide-up"
          delay={1}
        />
        <MetricsCard
          title="Total Traffic"
          value="24,512"
          trend="up"
          change={8}
          icon={<Users className="h-4 w-4" />}
          animate="slide-up"
          delay={2}
        />
        <MetricsCard
          title="Keywords Ranking"
          value="183"
          trend="up"
          change={15}
          icon={<Search className="h-4 w-4" />}
          animate="slide-up"
          delay={3}
        />
        <MetricsCard
          title="Conversion Rate"
          value="3.2%"
          trend="down"
          change={0.5}
          icon={<ShoppingCart className="h-4 w-4" />}
          animate="slide-up"
          delay={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          className="md:col-span-2"
          title="Performance Snapshot"
          icon={<LayoutDashboard className="h-4 w-4" />}
          action={
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                7d
              </Button>
              <Button variant="primary" size="sm">
                30d
              </Button>
              <Button variant="outline" size="sm">
                90d
              </Button>
            </div>
          }
          delay={5}
        >
          <PerformanceChart data={performanceData} height={280} />
        </DashboardCard>

        <DashboardCard
          title="Growth Tasks"
          icon={<CheckCircle2 className="h-4 w-4" />}
          action={
            <Button variant="link" size="sm" rightIcon={<ArrowUpRight className="h-3 w-3" />}>
              View All
            </Button>
          }
          delay={6}
        >
          <div className="space-y-3">
            <TaskItem
              title="Optimize Top 5 Products"
              description="Enhance product titles and descriptions with keywords."
              progress={60}
              impact="high"
            />
            <TaskItem
              title="Create FAQ Content"
              description="Add frequently asked questions to improve rankings."
              progress={25}
              impact="medium"
            />
            <TaskItem
              title="Fix Broken Links"
              description="Repair broken links to improve user experience."
              completed={true}
              impact="low"
            />
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Recent Activity"
          delay={7}
        >
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Task Completed</p>
                <p className="text-xs text-muted-foreground">
                  You've completed the "Fix Broken Links" task.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Ranking Improved</p>
                <p className="text-xs text-muted-foreground">
                  "Organic skin care" is now ranking on page 1.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 day ago
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">New Product Added</p>
                <p className="text-xs text-muted-foreground">
                  "Vitamin C Serum" has been added to your catalog.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 days ago
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Content Status"
          delay={8}
        >
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Content Creation Progress</p>
                <p className="text-xs text-muted-foreground">70%</p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-start p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Summer Collection Post</p>
                  <p className="text-xs text-muted-foreground">Published 3 days ago</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs">Live</span>
              </div>
              
              <div className="flex justify-between items-start p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Skincare Guide</p>
                  <p className="text-xs text-muted-foreground">Draft saved</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-600 text-xs">Draft</span>
              </div>
              
              <div className="flex justify-between items-start p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Product Comparison</p>
                  <p className="text-xs text-muted-foreground">AI generated, needs review</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">Review</span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
