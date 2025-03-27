
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
  
  // Add more dummy content to the tasks array
  const extendedTasks = [
    ...tasks,
    {
      id: "optimize-url-structure",
      categoryId: "technical-seo",
      title: "Optimize URL Structure",
      description: "Improve your URL structure for better SEO and user experience",
      difficulty: "medium",
      timeEstimate: "30-45 minutes",
      impact: "medium",
      completionRate: "65%",
      steps: []
    },
    {
      id: "improve-product-images",
      categoryId: "product-optimization",
      title: "Improve Product Images",
      description: "Enhance product images for better conversion rates",
      difficulty: "easy",
      timeEstimate: "20-30 minutes",
      impact: "high",
      completionRate: "82%",
      steps: []
    },
    {
      id: "create-collection-descriptions",
      categoryId: "collection-optimization",
      title: "Create Collection Descriptions",
      description: "Write SEO-friendly descriptions for your collection pages",
      difficulty: "easy",
      timeEstimate: "15-20 minutes",
      impact: "medium",
      completionRate: "75%",
      steps: []
    },
    {
      id: "implement-schema-markup",
      categoryId: "technical-seo",
      title: "Implement Schema Markup",
      description: "Add schema markup to improve search results appearance",
      difficulty: "hard",
      timeEstimate: "45-60 minutes",
      impact: "high",
      completionRate: "52%",
      steps: []
    },
    {
      id: "create-buying-guide",
      categoryId: "content-creation",
      title: "Create Product Buying Guide",
      description: "Create a comprehensive buying guide to educate customers",
      difficulty: "medium",
      timeEstimate: "40-50 minutes",
      impact: "medium",
      completionRate: "68%",
      steps: []
    },
    {
      id: "optimize-meta-descriptions",
      categoryId: "technical-seo",
      title: "Optimize Meta Descriptions",
      description: "Improve your meta descriptions to increase click-through rates",
      difficulty: "easy",
      timeEstimate: "25-35 minutes",
      impact: "medium",
      completionRate: "79%",
      steps: []
    }
  ];
  
  const filteredTasks = activeCategory === "all" 
    ? extendedTasks 
    : extendedTasks.filter(task => task.categoryId === activeCategory);
  
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
                      variant="outline"
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
