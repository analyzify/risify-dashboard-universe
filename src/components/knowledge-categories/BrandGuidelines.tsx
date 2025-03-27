
import React from "react";
import { Link } from "react-router-dom";
import { Palette, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BrandGuidelines = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-purple-100 text-purple-700">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Brand Guidelines</CardTitle>
            <CardDescription>Brand identity and visual elements</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between border-b pb-2">
            <span>Brand Values</span>
            <span className="text-green-600">Complete</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span>Visual Identity</span>
            <span className="text-green-600">Complete</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span>Voice & Tone</span>
            <span className="text-yellow-600">In Progress</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span>Logo Guidelines</span>
            <span className="text-red-600">Not Started</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link to="/content/knowledge-base/brand-guidelines">
            View Documents <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrandGuidelines;
