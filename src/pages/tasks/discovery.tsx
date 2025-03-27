
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TaskDiscovery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const { taskCategories, tasks } = growthTasks;
  
  const filteredTasks = activeCategory === "all" 
    ? tasks 
    : tasks.filter(task => task.categoryId === activeCategory);
  
  const handleSelectTask = (task) => {
    toast({
      title: "Task Selected",
      description: `${task.title} has been added to your tasks.`,
    });
    navigate("/tasks");
  };
  
  return (
    <Layout title="Task Discovery">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Task Discovery</h1>
          <p className="text-muted-foreground mt-2">
            Find optimization tasks for your store
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Badge 
              key="all"
              variant={activeCategory === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory("all")}
            >
              All Tasks
            </Badge>
            {taskCategories.map(category => (
              <Badge 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => {
            const category = taskCategories.find(c => c.id === task.categoryId);
            return (
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
                  
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary" className="w-fit">
                      {category?.name}
                    </Badge>
                    
                    <Button 
                      className="w-full mt-2"
                      onClick={() => handleSelectTask(task)}
                    >
                      Use Template
                      <Zap size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TaskDiscovery;
