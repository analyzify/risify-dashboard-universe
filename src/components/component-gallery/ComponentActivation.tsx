
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

interface ComponentActivationProps {
  isOpen: boolean;
  onClose: () => void;
  componentName: string;
}

const ComponentActivation = ({ isOpen, onClose, componentName }: ComponentActivationProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Activate {componentName}
          </DialogTitle>
          <DialogDescription>
            Follow these steps to integrate this component into your Shopify store.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-primary">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Activate the Meta Objects</h4>
              <p className="text-sm text-muted-foreground">
                We will create an &quot;{componentName}&quot; meta object section in Shopify.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-primary">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Activate the Front-End UI</h4>
              <p className="text-sm text-muted-foreground">
                Activate the component from &quot;Theme Customize&quot; in your Shopify admin.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-primary">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Enter the Data</h4>
              <p className="text-sm text-muted-foreground">
                Enter your component data either here on Risify or directly in Shopify.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={onClose}>
            <Check className="h-4 w-4" />
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentActivation;
