
import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MarketingStrategy = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-orange-100 text-orange-700">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Marketing Strategy</CardTitle>
            <CardDescription>Marketing channels and campaigns</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between border-b pb-2">
            <span>Marketing Channels</span>
            <span className="text-green-600">Complete</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span>Campaign Calendar</span>
            <span className="text-yellow-600">In Progress</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span>Content Strategy</span>
            <span className="text-red-600">Not Started</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span>KPIs & Metrics</span>
            <span className="text-red-600">Not Started</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link to="/content/knowledge-base/marketing-strategy">
            View Documents <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketingStrategy;
