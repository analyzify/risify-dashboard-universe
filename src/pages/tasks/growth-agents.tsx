
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Play, Clock, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GrowthAgents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  
  const agentCategories = [
    {
      id: "page-optimization",
      name: "Page Optimization"
    },
    {
      id: "content-creation",
      name: "Content Creation"
    },
    {
      id: "monitoring",
      name: "Monitoring & Alerts"
    }
  ];
  
  const agents = [
    {
      id: "product-optimizer",
      categoryId: "page-optimization",
      name: "Product Page Optimizer",
      description: "Automatically optimizes your product pages for better SEO and conversion",
      timeEstimate: "Runs weekly",
      impact: "high",
      status: "active"
    },
    {
      id: "collection-optimizer",
      categoryId: "page-optimization",
      name: "Collection Page Optimizer",
      description: "Optimizes collection pages for better visibility and user experience",
      timeEstimate: "Runs weekly",
      impact: "medium",
      status: "inactive"
    },
    {
      id: "content-creator",
      categoryId: "content-creation",
      name: "SEO Content Creator",
      description: "Creates SEO-optimized content for your products and collections",
      timeEstimate: "Runs bi-weekly",
      impact: "high",
      status: "inactive"
    },
    {
      id: "blog-creator",
      categoryId: "content-creation",
      name: "Blog Post Generator",
      description: "Creates engaging blog posts about your products and industry",
      timeEstimate: "Runs monthly",
      impact: "medium",
      status: "inactive"
    },
    {
      id: "keyword-monitor",
      categoryId: "monitoring",
      name: "Keyword Position Monitor",
      description: "Tracks your keyword positions and alerts you of significant changes",
      timeEstimate: "Runs daily",
      impact: "medium",
      status: "paused"
    },
    {
      id: "competitor-tracker",
      categoryId: "monitoring",
      name: "Competitor Price Tracker",
      description: "Monitors competitor prices and alerts you of significant changes",
      timeEstimate: "Runs daily",
      impact: "high",
      status: "active"
    }
  ];
  
  const filteredAgents = activeCategory === "all" 
    ? agents 
    : agents.filter(agent => agent.categoryId === activeCategory);
  
  const handleActivateAgent = (agent) => {
    toast({
      title: "Agent Activated",
      description: `${agent.name} has been activated and will run on schedule.`,
    });
  };
  
  return (
    <Layout title="Growth Agents">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Growth Agents</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered automation that continuously optimizes your store
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
              All Agents
            </Badge>
            {agentCategories.map(category => (
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
          {filteredAgents.map(agent => (
            <Card key={agent.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center">
                    <Bot size={18} className="mr-2 text-primary" />
                    {agent.name}
                  </CardTitle>
                  <Badge variant={
                    agent.status === "active" ? "default" : 
                    agent.status === "paused" ? "secondary" : "outline"
                  }>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {agent.timeEstimate}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {agent.status === "active" ? (
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate("/tasks")}
                    >
                      View Results
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => handleActivateAgent(agent)}
                    >
                      Activate Agent
                      <Zap size={16} className="ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GrowthAgents;
