
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, ArrowRight, Search, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define extended task type that includes both possible properties
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
  
  // For demo purposes, we'll use the first task as "active" and the second as "completed"
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
      </div>
    </Layout>
  );
};

export default Tasks;
