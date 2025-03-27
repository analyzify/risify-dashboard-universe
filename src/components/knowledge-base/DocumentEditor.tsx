
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Eye, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

// Import the knowledge base data
import knowledgeBaseData from "@/data/knowledgeBase.json";

interface FormValues {
  [key: string]: string | string[];
}

const DocumentEditor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const documentId = searchParams.get("document");
  const categoryId = searchParams.get("category") || "";
  const isEdit = searchParams.get("edit") === "true";
  const [activeTab, setActiveTab] = useState(isEdit ? "edit" : "preview");
  
  // Find the document if we have a document ID
  const document = documentId 
    ? knowledgeBaseData.categories
        .flatMap(cat => cat.documents)
        .find(doc => doc.id === documentId)
    : null;
  
  // Find the template based on the document ID or use a default one
  const template = document
    ? knowledgeBaseData.templates.find(t => t.id === document.id)
    : categoryId
      ? knowledgeBaseData.templates.find(t => t.category === categoryId)
      : null;
  
  const category = categoryId
    ? knowledgeBaseData.categories.find(cat => cat.id === categoryId)
    : document
      ? knowledgeBaseData.categories.find(cat => 
          cat.documents.some(doc => doc.id === documentId)
        )
      : null;
  
  const [formValues, setFormValues] = useState<FormValues>({});
  
  useEffect(() => {
    // Pre-populate form if editing an existing document
    if (document && template) {
      const initialValues: FormValues = {};
      template.sections.forEach(section => {
        if (section.type === "text-list") {
          initialValues[section.title] = [""];
        } else {
          initialValues[section.title] = "";
        }
      });
      setFormValues(initialValues);
    }
  }, [document, template]);
  
  const handleInputChange = (sectionTitle: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [sectionTitle]: value
    }));
  };
  
  const handleListItemChange = (sectionTitle: string, index: number, value: string) => {
    setFormValues(prev => {
      const currentList = Array.isArray(prev[sectionTitle]) ? [...prev[sectionTitle] as string[]] : [""];
      currentList[index] = value;
      return {
        ...prev,
        [sectionTitle]: currentList
      };
    });
  };
  
  const addListItem = (sectionTitle: string) => {
    setFormValues(prev => {
      const currentList = Array.isArray(prev[sectionTitle]) ? [...prev[sectionTitle] as string[]] : [];
      return {
        ...prev,
        [sectionTitle]: [...currentList, ""]
      };
    });
  };
  
  const removeListItem = (sectionTitle: string, index: number) => {
    setFormValues(prev => {
      const currentList = Array.isArray(prev[sectionTitle]) ? [...prev[sectionTitle] as string[]] : [];
      if (currentList.length > 1) {
        currentList.splice(index, 1);
        return {
          ...prev,
          [sectionTitle]: currentList
        };
      }
      return prev;
    });
  };
  
  const handleSave = () => {
    // This would normally save to a backend
    // For the MVP, we'll just show a success message and navigate back
    alert("Document saved successfully!");
    navigate(`/content/knowledge-base/${category?.id}`);
  };
  
  if (!template || !category) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Document Not Found</h2>
        <p className="text-muted-foreground mb-4">The document template you're looking for doesn't exist.</p>
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
            <BreadcrumbLink asChild>
              <Link to={`/content/knowledge-base/${category.id}`}>{category.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {document ? document.title : `New ${template.title}`}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Document Header */}
      <div>
        <h1 className="text-2xl font-bold">
          {document ? document.title : `New ${template.title}`}
        </h1>
        <p className="text-muted-foreground mt-1">{template.description}</p>
      </div>

      {/* Edit/Preview Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit" className="flex items-center">
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </TabsTrigger>
        </TabsList>
        
        {/* Edit Content */}
        <TabsContent value="edit" className="space-y-4 mt-4">
          {template.sections.map((section, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {section.type === "textarea" && (
                  <Textarea 
                    placeholder={`Enter ${section.title.toLowerCase()}`}
                    value={formValues[section.title] as string || ""}
                    onChange={(e) => handleInputChange(section.title, e.target.value)}
                    className="min-h-[100px]"
                  />
                )}
                
                {section.type === "select" && section.options && (
                  <Select 
                    value={formValues[section.title] as string || ""}
                    onValueChange={(value) => handleInputChange(section.title, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Select ${section.title.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {section.options.map((option, optIdx) => (
                        <SelectItem key={optIdx} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {section.type === "text-list" && (
                  <div className="space-y-2">
                    {Array.isArray(formValues[section.title]) ? 
                      (formValues[section.title] as string[]).map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2">
                          <Input 
                            value={item}
                            onChange={(e) => handleListItemChange(section.title, itemIdx, e.target.value)}
                            placeholder={`Item ${itemIdx + 1}`}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => removeListItem(section.title, itemIdx)}
                            disabled={(formValues[section.title] as string[]).length <= 1}
                          >
                            -
                          </Button>
                        </div>
                      )) : (
                        <div className="flex gap-2">
                          <Input 
                            value=""
                            onChange={(e) => handleListItemChange(section.title, 0, e.target.value)}
                            placeholder="Item 1"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            disabled={true}
                          >
                            -
                          </Button>
                        </div>
                      )
                    }
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addListItem(section.title)}
                      className="w-full"
                    >
                      + Add Item
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Preview Content */}
        <TabsContent value="preview" className="space-y-4 mt-4">
          {template.sections.map((section, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.type === "textarea" && (
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">
                      {formValues[section.title] as string || "No content provided"}
                    </p>
                  </div>
                )}
                
                {section.type === "select" && (
                  <div className="font-medium">
                    {formValues[section.title] as string || "Not selected"}
                  </div>
                )}
                
                {section.type === "text-list" && (
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(formValues[section.title]) && (formValues[section.title] as string[]).length > 0 ? 
                      (formValues[section.title] as string[])
                        .filter(item => item.trim() !== "")
                        .map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        )) : (
                        <li className="text-muted-foreground">No items added</li>
                      )
                    }
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      
      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/content/knowledge-base/${category.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Document
        </Button>
      </div>
    </div>
  );
};

export default DocumentEditor;
