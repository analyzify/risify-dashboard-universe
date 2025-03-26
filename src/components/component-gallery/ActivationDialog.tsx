
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useComponentActivation } from "@/hooks/useComponentActivation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ActivationDialog: React.FC = () => {
  const { isDialogOpen, activeComponent, closeActivationDialog } = useComponentActivation();

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeActivationDialog}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Activate {activeComponent}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="text-sm text-muted-foreground">
            Follow these steps to activate and use this component on your store:
          </div>
          
          <div className="space-y-4">
            {/* Step 1 */}
            <Card>
              <CardContent className="p-4 flex gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Activate the Meta Objects</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We will create an "{activeComponent}" meta object section in Shopify.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="self-center">
                  Activate
                </Button>
              </CardContent>
            </Card>
            
            {/* Step 2 */}
            <Card>
              <CardContent className="p-4 flex gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Activate the front end UI</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Go to Shopify "Theme Customize" to activate the component.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="self-center">
                  Instructions
                </Button>
              </CardContent>
            </Card>
            
            {/* Step 3 */}
            <Card>
              <CardContent className="p-4 flex gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Enter the data</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter component data either on Risify or Shopify.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="self-center">
                    Use Shopify
                  </Button>
                  <Button size="sm" className="self-center">
                    Use Risify
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={closeActivationDialog}>
              Cancel
            </Button>
            <Button className="gap-1.5">
              <Check className="h-4 w-4" />
              Confirm Activation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivationDialog;
