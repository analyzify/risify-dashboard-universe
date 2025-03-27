
import React from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Zap } from "lucide-react";

const TaskTemplates = () => {
  const { taskCategories, tasks } = growthTasks;
  
  return (
    <Layout title="Task Templates">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Task Templates</h1>
          <p className="text-muted-foreground mt-2">
            Browse and use pre-built task templates for your store optimization
          </p>
        </div>
        
        {taskCategories.map(category => (
          <div key={category.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks
                .filter(task => task.categoryId === category.id)
                .map(task => (
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
                      <Button className="w-full">
                        Use Template
                        <Zap size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TaskTemplates;
