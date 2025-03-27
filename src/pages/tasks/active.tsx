
import React from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import TaskItem from "@/components/TaskItem";

const ActiveTasks = () => {
  // For demo purposes, we'll just use the first task as "active"
  const activeTasks = [growthTasks.tasks[0]];
  
  return (
    <Layout title="Active Tasks">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Active Tasks</h1>
          <p className="text-muted-foreground mt-2">
            Continue with your in-progress optimization tasks
          </p>
        </div>
        
        {activeTasks.length > 0 ? (
          <div className="grid gap-6">
            {activeTasks.map(task => (
              <TaskItem 
                key={task.id}
                title={task.title}
                description={task.description}
                progress={40}
                impact={task.impact as "low" | "medium" | "high"} 
                onClick={() => console.log("Continue task", task.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">You don't have any active tasks</p>
              <Button onClick={() => window.location.href = "/tasks/discovery"}>
                Discover New Tasks
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ActiveTasks;
