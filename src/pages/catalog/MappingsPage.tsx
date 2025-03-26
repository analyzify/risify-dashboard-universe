
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "@/components/ui/link";
import { 
  Package, 
  Folder, 
  FileText, 
  Tag, 
  ChevronRight, 
  PlusCircle,
  ScanText
} from "lucide-react";

const MappingCard = ({ icon, title, description, href }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(href)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const MappingsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Layout title="Catalog Mappings">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Mappings</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>
          
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Mapping
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MappingCard
              icon={<Folder className="h-5 w-5" />}
              title="Collection to Taxonomy"
              description="Map your collections to Shopify's native categories for better discoverability."
              href="/catalog/mappings/collection-taxonomy"
            />
            
            <MappingCard
              icon={<Tag className="h-5 w-5" />}
              title="Vendor to Collection"
              description="Associate vendors with specific collections to organize your catalog."
              href="/catalog/mappings/vendor-collection"
            />
            
            <MappingCard
              icon={<FileText className="h-5 w-5" />}
              title="Product to Blog Post"
              description="Connect products with related blog content to drive engagement."
              href="/catalog/mappings/product-blog"
            />
            
            <MappingCard
              icon={<ScanText className="h-5 w-5" />}
              title="Custom Groups"
              description="Create custom groupings of collections, products, and pages."
              href="/catalog/mappings/custom-groups"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Create Mappings?</CardTitle>
              <CardDescription>Mappings help connect different parts of your store for better organization and discoverability.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium">Improved SEO</h3>
                  <p className="text-sm text-muted-foreground">Proper taxonomy connections help search engines better understand your product catalog.</p>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium">Enhanced Navigation</h3>
                  <p className="text-sm text-muted-foreground">Create logical paths for customers to explore your store and find products.</p>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium">Connected Content</h3>
                  <p className="text-sm text-muted-foreground">Link your products to relevant content and create a cohesive shopping experience.</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://help.shopify.com/manual/products/categorizing" target="_blank">
                    Learn More About Shopify Taxonomies
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Mappings</CardTitle>
              <CardDescription>Your recently created or modified mappings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">No recent mappings found. Start by creating a new mapping.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Mapping Suggestions</CardTitle>
              <CardDescription>AI-powered suggestions to improve your catalog organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Map "Summer Collection" to Seasonal Category</h3>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">This collection would benefit from being mapped to Shopify's Seasonal category.</p>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Connect "Eco-Friendly" products to sustainability blog</h3>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">15 products tagged as eco-friendly could be linked to your sustainability blog posts.</p>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Group "Featured Products" across collections</h3>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Create a custom group for products flagged as "featured" across different collections.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default MappingsPage;
