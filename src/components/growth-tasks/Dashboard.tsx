
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Award, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Task, TaskCategory } from '@/data/growthTasks';

interface GrowthTasksDashboardProps {
  taskCategories: TaskCategory[];
  tasks: Task[];
}

const GrowthTasksDashboard: React.FC<GrowthTasksDashboardProps> = ({ taskCategories, tasks }) => {
  // Get tasks in progress (for demo, just assume 1-2 tasks)
  const inProgressTasks = [tasks[0]];
  
  // Recently completed tasks
  const completedTasks = [tasks[1]];
  
  // Featured tasks
  const featuredTasks = tasks.slice(0, 2);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Growth Tasks</h1>
        <p className="text-muted-foreground mt-2">
          Step-by-step optimization workflows to improve your store's performance
        </p>
      </div>
      
      {/* In Progress Tasks */}
      {inProgressTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Continue Where You Left Off</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inProgressTasks.map(task => (
              <Card key={task.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50">In Progress</Badge>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>2/5 steps completed</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to="/tasks/active">
                      Continue Task
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Task Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Optimization Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {taskCategories.map(category => (
            <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{category.description}</CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/tasks/discovery">
                    Browse Tasks
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Featured Tasks */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recommended Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTasks.map(task => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {task.timeEstimate}
                  </div>
                  <div className="flex items-center">
                    <Award size={14} className="mr-1" />
                    {task.impact} impact
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to={`/tasks/discovery`}>
                    Start Task
                    <Zap size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recently Completed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedTasks.map(task => (
              <Card key={task.id} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-600">Completed</Badge>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-1 text-green-500" />
                      Completed 2 days ago
                    </div>
                    <Button variant="link" className="p-0 h-auto">View Results</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthTasksDashboard;
