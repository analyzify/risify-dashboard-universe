
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsGrid from "./MetricsGrid";
import { faqEngagementData, topBlogsData, blogSalesData, trafficSourcesData } from "./analyticsData";

const ContentAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Content Analytics</h2>
          <p className="text-muted-foreground">
            View engagement, traffic, and conversion metrics for your content
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="landing">Landing Pages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricsGrid 
              title="FAQ Engagement" 
              data={faqEngagementData} 
              valueKey="views"
              comparisonKey="previousViews"
              labelKey="question"
              valueFormatter={(value) => value.toLocaleString()}
            />
            
            <MetricsGrid 
              title="Top Blogs by Views" 
              data={topBlogsData}
              valueKey="views" 
              comparisonKey="previousViews"
              labelKey="title"
              valueFormatter={(value) => value.toLocaleString()}
            />
            
            <MetricsGrid 
              title="Blogs Bringing Sales" 
              data={blogSalesData}
              valueKey="revenue" 
              comparisonKey="previousRevenue"
              labelKey="title"
              valueFormatter={(value) => `NOK ${value.toLocaleString()}`}
            />
            
            <MetricsGrid 
              title="Sessions by Traffic Source" 
              data={trafficSourcesData}
              valueKey="sessions" 
              comparisonKey="previousSessions"
              labelKey="source"
              valueFormatter={(value) => value.toLocaleString()}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="blogs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricsGrid 
              title="Top Blogs by Views" 
              data={topBlogsData}
              valueKey="views" 
              comparisonKey="previousViews"
              labelKey="title"
              valueFormatter={(value) => value.toLocaleString()}
            />
            
            <MetricsGrid 
              title="Blogs Bringing Sales" 
              data={blogSalesData}
              valueKey="revenue" 
              comparisonKey="previousRevenue"
              labelKey="title"
              valueFormatter={(value) => `NOK ${value.toLocaleString()}`}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6">
          <MetricsGrid 
            title="FAQ Engagement" 
            data={faqEngagementData} 
            valueKey="views"
            comparisonKey="previousViews"
            labelKey="question"
            valueFormatter={(value) => value.toLocaleString()}
          />
        </TabsContent>
        
        <TabsContent value="landing" className="space-y-6">
          <MetricsGrid 
            title="Sessions by Landing Page" 
            data={trafficSourcesData}
            valueKey="sessions" 
            comparisonKey="previousSessions"
            labelKey="source"
            valueFormatter={(value) => value.toLocaleString()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAnalytics;
