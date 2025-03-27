
import React from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Edit, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import CompletionIndicator from "./CompletionIndicator";

// Import the knowledge base data
import knowledgeBaseData from "@/data/knowledgeBase.json";

const CategoryView = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the selected category
  const category = knowledgeBaseData.categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Category Not Found</h2>
        <p className="text-muted-foreground mb-4">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/content/knowledge-base">Back to Knowledge Base</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/content/knowledge-base">Knowledge Base</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>
        <Button className="self-start" asChild>
          <Link to={`/content/knowledge-base/editor?category=${category.id}`}>
            <Plus className="mr-2 h-4 w-4" /> Add Document
          </Link>
        </Button>
      </div>
      
      {/* Completion Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Category Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <CompletionIndicator 
            percentage={category.completionPercentage} 
            size="lg" 
          />
        </CardContent>
      </Card>

      {/* Document List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Documents</h2>
        {category.documents.length === 0 ? (
          <Card className="text-center p-6">
            <p className="text-muted-foreground mb-4">No documents yet. Get started by adding your first document.</p>
            <Button asChild>
              <Link to={`/content/knowledge-base/editor?category=${category.id}`}>
                <Plus className="mr-2 h-4 w-4" /> Add Document
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.documents.map((document) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-3">{document.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {format(new Date(document.lastUpdated), "MMM d, yyyy")}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/content/knowledge-base/editor?document=${document.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Link>
                  </Button>
                  <Button variant="secondary" size="sm" asChild>
                    <Link to={`/content/knowledge-base/editor?document=${document.id}&edit=true`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
