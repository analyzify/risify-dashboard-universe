
import React from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/TaskItem";

const CompletedTasks = () => {
  // For demo purposes, we'll just use the second task as "completed"
  const completedTasks = [growthTasks.tasks[1]];
  
  return (
    <Layout title="Completed Tasks">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Completed Tasks</h1>
          <p className="text-muted-foreground mt-2">
            Review your completed optimization tasks and their impact
          </p>
        </div>
        
        {completedTasks.length > 0 ? (
          <div className="grid gap-6">
            {completedTasks.map(task => (
              <TaskItem 
                key={task.id}
                title={task.title}
                description={task.description}
                completed={true}
                impact={task.impact as "low" | "medium" | "high"} 
                onClick={() => console.log("View completed task", task.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">You haven't completed any tasks yet</p>
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

export default CompletedTasks;
