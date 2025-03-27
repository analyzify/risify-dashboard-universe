import React, { useState } from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, ArrowRight, Search, BarChart, Sparkles, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExtendedTask {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  difficulty: string;
  timeEstimate: string;
  impact: string;
  completionRate: string;
  tags?: string[];
  steps: {
    id: string;
    title: string;
    description: string;
  }[];
  status: string;
  progress?: number;
  completedDate?: string;
}

const Tasks = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const allTasks: ExtendedTask[] = [
    { ...growthTasks.tasks[0], status: "active", progress: 40 },
    { ...growthTasks.tasks[1], status: "completed", completedDate: "2 days ago" }
  ];

  const filteredTasks = allTasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getImpactBadgeClass = (impact) => {
    switch(impact) {
      case "low": return "bg-blue-50 text-blue-600";
      case "medium": return "bg-amber-50 text-amber-600";
      case "high": return "bg-green-50 text-green-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };
  
  const handleCreateTask = (taskTitle) => {
    toast({
      title: "Task Created",
      description: `"${taskTitle}" has been added to your tasks.`,
    });
  };
  
  return (
    <Layout title="Tasks">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your optimization tasks
            </p>
          </div>
          <Button onClick={() => navigate("/tasks/discovery")}>
            Find New Tasks
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {filteredTasks.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Time Estimate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => {
                    const category = growthTasks.taskCategories.find(c => c.id === task.categoryId);
                    return (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          {task.status === "active" ? (
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-blue-500" />
                              <div className="flex flex-col">
                                <span>In Progress</span>
                                {task.progress !== undefined && (
                                  <span className="text-xs text-muted-foreground">{task.progress}% completed</span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <div className="flex flex-col">
                                <span>Completed</span>
                                {task.completedDate && (
                                  <span className="text-xs text-muted-foreground">{task.completedDate}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{category?.name}</TableCell>
                        <TableCell>
                          <Badge className={getImpactBadgeClass(task.impact)}>
                            {task.impact}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.timeEstimate}</TableCell>
                        <TableCell className="text-right">
                          {task.status === "active" ? (
                            <Button variant="outline" size="sm" onClick={() => console.log("Continue task")}>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => console.log("View results")}>
                              View Results
                              <BarChart className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No tasks match your search</p>
              <Button onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Continue where you left off</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-2 border-l-blue-400 bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{growthTasks.tasks[0].title}</h4>
                  <Badge variant="outline" className="text-xs bg-blue-50/50 text-blue-600 font-normal">
                    In Progress
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2.5 line-clamp-2">
                  {growthTasks.tasks[0].description}
                </p>
                <div className="mb-2.5">
                  <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                    <span>Progress</span>
                    <span>2/5 steps</span>
                  </div>
                  <Progress value={40} className="h-1.5" />
                </div>
                <Button size="sm" variant="ghost" className="w-full h-8 text-xs justify-center border border-muted hover:bg-accent mt-1" onClick={() => console.log("Continue task")}>
                  Continue
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-l-2 border-l-amber-400 bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">Optimize Collection Page</h4>
                  <Badge variant="outline" className="text-xs bg-amber-50/50 text-amber-600 font-normal">
                    Just Started
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2.5 line-clamp-2">
                  Improve your collection page structure and content for better navigation and SEO
                </p>
                <div className="mb-2.5">
                  <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                    <span>Progress</span>
                    <span>1/6 steps</span>
                  </div>
                  <Progress value={16} className="h-1.5" />
                </div>
                <Button size="sm" variant="ghost" className="w-full h-8 text-xs justify-center border border-muted hover:bg-accent mt-1" onClick={() => console.log("Continue task")}>
                  Continue
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-l-2 border-l-purple-400 bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">Implement Schema Markup</h4>
                  <Badge variant="outline" className="text-xs bg-purple-50/50 text-purple-600 font-normal">
                    Not Started
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2.5 line-clamp-2">
                  Add structured data to your product pages to enhance search results appearance
                </p>
                <div className="mb-2.5">
                  <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                    <span>Progress</span>
                    <span>0/4 steps</span>
                  </div>
                  <Progress value={0} className="h-1.5" />
                </div>
                <Button size="sm" variant="ghost" className="w-full h-8 text-xs justify-center border border-muted hover:bg-accent mt-1" onClick={() => console.log("Start task")}>
                  Start
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            AI suggested tasks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/30 hover:bg-card/50 transition-colors border-dashed border-muted-foreground/20">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="font-medium text-xs">Optimize Product Descriptions</h4>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50/30 text-emerald-600 font-normal px-1.5 py-0">
                    High Impact
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  Create unique, SEO-friendly product descriptions to improve conversion rates.
                </p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-full h-7 text-xs justify-center border border-muted hover:bg-accent"
                  onClick={() => handleCreateTask("Optimize Product Descriptions")}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Create Task
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 hover:bg-card/50 transition-colors border-dashed border-muted-foreground/20">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="font-medium text-xs">Setup Internal Linking Strategy</h4>
                  <Badge variant="outline" className="text-[10px] bg-amber-50/30 text-amber-600 font-normal px-1.5 py-0">
                    Medium Impact
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  Develop a strategic internal linking plan to improve site structure and SEO.
                </p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-full h-7 text-xs justify-center border border-muted hover:bg-accent"
                  onClick={() => handleCreateTask("Setup Internal Linking Strategy")}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Create Task
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 hover:bg-card/50 transition-colors border-dashed border-muted-foreground/20">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="font-medium text-xs">Improve Mobile Page Speed</h4>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50/30 text-emerald-600 font-normal px-1.5 py-0">
                    High Impact
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  Optimize images and reduce code bloat to improve mobile page loading times.
                </p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-full h-7 text-xs justify-center border border-muted hover:bg-accent"
                  onClick={() => handleCreateTask("Improve Mobile Page Speed")}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Create Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
