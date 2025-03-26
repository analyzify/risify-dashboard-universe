
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Link2Off, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import MetricCard from "./MetricCard";
import AuditTable from "./AuditTable";

const StoreAuditDashboard = () => {
  // Mock data for demonstration
  const auditData = {
    brokenLinks: {
      count: 12,
      trend: "up" as const,
      change: 3,
      details: [
        { location: "/products/summer-dress", issue: "Broken product image link", impact: "high" as const, status: "open" as const },
        { location: "/collections/winter", issue: "Link to unavailable product", impact: "medium" as const, status: "open" as const },
        { location: "/blog/skincare-tips", issue: "Broken external resource link", impact: "low" as const, status: "fixed" as const }
      ]
    },
    schemaErrors: {
      count: 8,
      trend: "down" as const,
      change: 2,
      details: [
        { location: "/products/face-serum", issue: "Missing product schema price", impact: "high" as const, status: "open" as const },
        { location: "/collections/bestsellers", issue: "Invalid collection schema", impact: "medium" as const, status: "open" as const },
        { location: "/about-us", issue: "Incorrect organization schema", impact: "low" as const, status: "fixed" as const }
      ]
    },
    metaIssues: {
      count: 15,
      trend: "up" as const,
      change: 4,
      details: [
        { location: "/products/hair-oil", issue: "Duplicate meta title with /products/hair-serum", impact: "high" as const, status: "open" as const },
        { location: "/collections/new-arrivals", issue: "Missing meta description", impact: "medium" as const, status: "open" as const },
        { location: "/blog/hair-care", issue: "Meta title too long (> 60 chars)", impact: "medium" as const, status: "open" as const }
      ]
    },
    pageSpeeds: {
      count: 6,
      trend: "down" as const,
      change: 2,
      details: [
        { location: "/products/face-mask", issue: "LCP > 4s on mobile", impact: "high" as const, status: "open" as const },
        { location: "/collections", issue: "CLS > 0.1 on desktop", impact: "medium" as const, status: "open" as const },
        { location: "/homepage", issue: "FID > 300ms on mobile", impact: "high" as const, status: "fixed" as const }
      ]
    }
  };

  const totalIssues = auditData.brokenLinks.count + auditData.schemaErrors.count + auditData.metaIssues.count + auditData.pageSpeeds.count;
  const highImpactIssues = 9; // Mock data - count of high impact issues
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Store Audit Results</h2>
          <p className="text-muted-foreground">
            Analyze and fix issues to improve your store's SEO and user experience
          </p>
        </div>
        <Card className="p-2">
          <div className="flex items-center gap-4">
            <div className="text-center px-4">
              <div className="text-2xl font-bold">{totalIssues}</div>
              <div className="text-xs text-muted-foreground">Total Issues</div>
            </div>
            <div className="text-center px-4 border-l">
              <div className="text-2xl font-bold">{highImpactIssues}</div>
              <div className="text-xs text-muted-foreground">High Impact</div>
            </div>
            <div className="text-center px-4 border-l">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold">73%</span>
              </div>
              <div className="text-xs text-muted-foreground">Health Score</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Broken Links"
          value={auditData.brokenLinks.count}
          trend={auditData.brokenLinks.trend}
          change={auditData.brokenLinks.change}
          icon={<Link2Off className="h-4 w-4" />}
          description="Links that lead to non-existent pages"
        />
        <MetricCard
          title="Schema Errors"
          value={auditData.schemaErrors.count}
          trend={auditData.schemaErrors.trend}
          change={auditData.schemaErrors.change}
          icon={<AlertTriangle className="h-4 w-4" />}
          description="Issues with structured data markup"
        />
        <MetricCard
          title="Meta Title/Desc Issues"
          value={auditData.metaIssues.count}
          trend={auditData.metaIssues.trend}
          change={auditData.metaIssues.change}
          icon={<FileText className="h-4 w-4" />}
          description="Duplicate, missing or oversized meta tags"
        />
        <MetricCard
          title="Page Speed Issues"
          value={auditData.pageSpeeds.count}
          trend={auditData.pageSpeeds.trend}
          change={auditData.pageSpeeds.change}
          icon={<AlertCircle className="h-4 w-4" />}
          description="Pages with poor performance metrics"
        />
      </div>

      <Tabs defaultValue="broken-links" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="broken-links">Broken Links</TabsTrigger>
          <TabsTrigger value="schema-errors">Schema Errors</TabsTrigger>
          <TabsTrigger value="meta-issues">Meta Issues</TabsTrigger>
          <TabsTrigger value="page-speeds">Page Speed</TabsTrigger>
        </TabsList>
        <TabsContent value="broken-links">
          <Card>
            <CardHeader>
              <CardTitle>Broken Links</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditTable data={auditData.brokenLinks.details} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schema-errors">
          <Card>
            <CardHeader>
              <CardTitle>Schema Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditTable data={auditData.schemaErrors.details} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meta-issues">
          <Card>
            <CardHeader>
              <CardTitle>Meta Title & Description Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditTable data={auditData.metaIssues.details} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="page-speeds">
          <Card>
            <CardHeader>
              <CardTitle>Page Speed Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditTable data={auditData.pageSpeeds.details} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreAuditDashboard;
