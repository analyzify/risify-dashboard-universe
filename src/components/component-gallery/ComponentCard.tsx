
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComponentCardProps {
  title: string;
  description: string;
  isActive: boolean;
  onUse: () => void;
}

const ComponentCard = ({ title, description, isActive, onUse }: ComponentCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {isActive ? (
              <Badge variant="outline" className="gap-1 bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                <Check className="h-3 w-3" />
                Active
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 bg-transparent text-muted-foreground hover:bg-transparent">
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant={isActive ? "outline" : "default"} 
          size="sm" 
          onClick={onUse}
        >
          {isActive ? "Configure" : "Use"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
