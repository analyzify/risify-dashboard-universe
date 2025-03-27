
import React from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import GrowthTasksDashboard from "@/components/growth-tasks/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Search, Zap, CheckCircle, ArrowRight } from "lucide-react";
import TaskItem from "@/components/TaskItem";

const Tasks = () => {
  const navigate = useNavigate();
  
  // For demo purposes
  const activeTasks = [growthTasks.tasks[0]];
  const completedTasks = [growthTasks.tasks[1]];
  
  return (
    <Layout title="Growth Tasks">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Growth Tasks</h1>
            <p className="text-muted-foreground mt-2">
              Step-by-step optimization workflows to improve your store's performance
            </p>
          </div>
          <Button onClick={() => navigate("/tasks/discovery")}>
            Find New Tasks
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Zap size={18} className="mr-2 text-blue-500" />
                Active Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeTasks.length}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">In progress</p>
                <Button variant="ghost" size="sm" className="h-8 px-2" 
                  onClick={() => navigate("/tasks/active")}>
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle size={18} className="mr-2 text-green-500" />
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedTasks.length}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">This month</p>
                <Button variant="ghost" size="sm" className="h-8 px-2" 
                  onClick={() => navigate("/tasks/completed")}>
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp size={18} className="mr-2 text-purple-500" />
                Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">+24%</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">Traffic growth</p>
                <Button variant="ghost" size="sm" className="h-8 px-2" 
                  onClick={() => navigate("/tasks/results")}>
                  View Results <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="active" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeTasks.length > 0 ? (
              <div className="grid gap-4">
                {activeTasks.map(task => (
                  <TaskItem 
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    progress={40}
                    impact={task.impact as "low" | "medium" | "high"} 
                    onClick={() => navigate("/tasks/active")}
                  />
                ))}
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => navigate("/tasks/active")}
                >
                  View All Active Tasks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any active tasks</p>
                  <Button onClick={() => navigate("/tasks/discovery")}>
                    Find New Tasks to Start
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedTasks.length > 0 ? (
              <div className="grid gap-4">
                {completedTasks.map(task => (
                  <TaskItem 
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    completed={true}
                    impact={task.impact as "low" | "medium" | "high"} 
                    onClick={() => navigate("/tasks/completed")}
                  />
                ))}
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => navigate("/tasks/completed")}
                >
                  View All Completed Tasks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't completed any tasks yet</p>
                  <Button onClick={() => navigate("/tasks/discovery")}>
                    Find Tasks to Complete
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tasks;
