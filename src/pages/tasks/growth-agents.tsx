
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Settings, Play, Clock, CheckCircle } from "lucide-react";

const GrowthAgents = () => {
  const agents = [
    {
      id: "product-optimizer",
      name: "Product Page Optimizer",
      description: "Automatically optimizes your product pages for better SEO and conversion",
      status: "active",
      tasksCompleted: 12,
      lastRun: "2 days ago",
    },
    {
      id: "content-creator",
      name: "SEO Content Creator",
      description: "Creates SEO-optimized content for your products and collections",
      status: "inactive",
      tasksCompleted: 5,
      lastRun: "2 weeks ago",
    },
    {
      id: "keyword-monitor",
      name: "Keyword Position Monitor",
      description: "Tracks your keyword positions and alerts you of significant changes",
      status: "paused",
      tasksCompleted: 24,
      lastRun: "5 days ago",
    }
  ];
  
  return (
    <Layout title="Growth Agents">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Growth Agents</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered automation that continuously optimizes your store
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <Card key={agent.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center">
                    <Bot size={18} className="mr-2 text-blue-500" />
                    {agent.name}
                  </CardTitle>
                  <Badge className={
                    agent.status === "active" ? "bg-green-100 text-green-800" :
                    agent.status === "paused" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    {agent.tasksCompleted} tasks completed
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Last run: {agent.lastRun}
                  </div>
                </div>
                <div className="flex gap-2">
                  {agent.status === "active" ? (
                    <Button variant="outline" className="flex-1">
                      <Settings size={16} className="mr-1" />
                      Configure
                    </Button>
                  ) : (
                    <Button className="flex-1">
                      <Play size={16} className="mr-1" />
                      Activate
                    </Button>
                  )}
                  <Button variant={agent.status === "active" ? "default" : "outline"} className="flex-1">
                    View Results
                  </Button>
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
