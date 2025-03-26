
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ListOrdered, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ImplementationPage = () => {
  return (
    <Layout title="Implementation Guide">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Component Implementation Guide</h1>
          <p className="text-muted-foreground">
            Learn how to implement our storefront components on your site with these step-by-step instructions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Section (Left) */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Tutorial
                </CardTitle>
                <CardDescription>
                  Visual walkthrough of the implementation process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4 overflow-hidden relative">
                  {/* Placeholder for video - in a real implementation this would be an actual video */}
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Video className="h-4 w-4" /> Play Tutorial
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm">Tutorial Contents:</h3>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Setting up your environment</li>
                      <li>• Adding the component script</li>
                      <li>• Customizing appearance</li>
                      <li>• Testing and troubleshooting</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Duration:</h3>
                    <p className="text-sm text-muted-foreground">12 minutes</p>
                  </div>
                  <Button className="w-full">Download Video</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our support team is available to assist with any implementation challenges.
                </p>
                <Button variant="outline" className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>

          {/* Step-by-Step Guide (Right) */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListOrdered className="h-5 w-5" />
                  Step-by-Step Implementation
                </CardTitle>
                <CardDescription>
                  Follow these instructions to implement components on your storefront
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="standard" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="standard">Standard Installation</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Configuration</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="standard" className="space-y-6 pt-4">
                    {/* Step 1 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          1
                        </div>
                        <h3 className="font-semibold text-lg">Add the Component Script</h3>
                      </div>
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-3">
                          Add the following script tag to the <code>&lt;head&gt;</code> section of your store's theme file:
                        </p>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                          <code>{`<script src="https://cdn.risify.io/components/v1/loader.js" async defer></script>`}</code>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Step 2 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          2
                        </div>
                        <h3 className="font-semibold text-lg">Configure Your Component</h3>
                      </div>
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-3">
                          Add a configuration block before the script to customize how your component appears:
                        </p>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                          <code>{`<script>
  window.RisifyConfig = {
    store: "your-store-id",
    components: ["faq-accordion", "related-products"],
    theme: "light",
    placement: "automatic"
  }
</script>`}</code>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Step 3 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          3
                        </div>
                        <h3 className="font-semibold text-lg">Add Placement Markers (Optional)</h3>
                      </div>
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-3">
                          If you want precise control over component placement, add data attributes to your HTML:
                        </p>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                          <code>{`<div data-risify-component="faq-accordion"></div>
<div data-risify-component="related-products"></div>`}</code>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Step 4 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          4
                        </div>
                        <h3 className="font-semibold text-lg">Test Your Implementation</h3>
                      </div>
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-3">
                          Save your changes and view your store to confirm components are rendering correctly.
                          If components don't appear, check browser console for any error messages.
                        </p>
                        <Button className="mt-2">
                          <span>View Component Status</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Advanced API Configuration</h3>
                      <p className="text-muted-foreground">
                        For developers who need more control, our JavaScript API provides extended functionality:
                      </p>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <code>{`// Initialize with custom event handlers
const risify = new Risify({
  store: "your-store-id",
  debug: true,
  onLoad: (component) => {
    console.log(\`\${component} loaded successfully\`);
  },
  onError: (error) => {
    console.error("Component error:", error);
  }
});

// Manually render components
risify.render("faq-accordion", {
  container: "#faq-section",
  data: {
    title: "Product Questions",
    maxItems: 10
  }
});`}</code>
                      </div>
                      
                      <h3 className="font-semibold mt-6">Custom Styling</h3>
                      <p className="text-muted-foreground">
                        Override default styles with your own CSS variables:
                      </p>
                      <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <code>{`:root {
  --risify-primary-color: #4a6cf7;
  --risify-font-family: 'Your-Font', sans-serif;
  --risify-border-radius: 8px;
  --risify-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`}</code>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline">
                Download Implementation Guide
              </Button>
              <Button>
                <span>View Documentation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImplementationPage;
