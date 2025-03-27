
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    id: "business-info",
    title: "Business Information",
    description: "Tell us about your business and what you do."
  },
  {
    id: "products",
    title: "Product Information",
    description: "Add details about your products and services."
  },
  {
    id: "brand",
    title: "Brand Guidelines",
    description: "Define your brand identity and values."
  },
  {
    id: "marketing",
    title: "Marketing Strategy",
    description: "Outline your marketing approach and channels."
  },
  {
    id: "completion",
    title: "Completion",
    description: "You're all set up and ready to go!"
  }
];

const SetupWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    mainProducts: "",
    targetAudience: "",
    brandValues: "",
    brandVoice: "",
    marketingChannels: []
  });
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the wizard
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    // In a real app, this would save the data to a backend
    navigate("/content/knowledge-base");
  };
  
  const handleSkip = () => {
    // Skip to the next step without saving
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Knowledge Base Setup</h1>
        <p className="text-muted-foreground">
          Complete the following steps to set up your AI Knowledge Base
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6 mb-2">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </p>
      </div>
      
      {/* Step Content */}
      <Card className="mb-6 animate-fade-in">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input 
                  id="businessName" 
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Enter your business name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select 
                  value={formData.businessType}
                  onValueChange={(value) => handleInputChange("businessType", value)}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="service">Service-based</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what your business does"
                  rows={4}
                />
              </div>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mainProducts">Main Products/Services</Label>
                <Textarea 
                  id="mainProducts" 
                  value={formData.mainProducts}
                  onChange={(e) => handleInputChange("mainProducts", e.target.value)}
                  placeholder="List your main products or services"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea 
                  id="targetAudience" 
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  placeholder="Describe your ideal customers"
                  rows={4}
                />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandValues">Brand Values</Label>
                <Textarea 
                  id="brandValues" 
                  value={formData.brandValues}
                  onChange={(e) => handleInputChange("brandValues", e.target.value)}
                  placeholder="What are your brand's core values?"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brandVoice">Brand Voice & Tone</Label>
                <Textarea 
                  id="brandVoice" 
                  value={formData.brandVoice}
                  onChange={(e) => handleInputChange("brandVoice", e.target.value)}
                  placeholder="Describe your brand's voice and tone"
                  rows={4}
                />
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Marketing Channels</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Social Media", "Email", "SEO", "Content Marketing", "Paid Ads", "Influencers"].map((channel) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={channel.toLowerCase().replace(" ", "-")}
                        checked={formData.marketingChannels.includes(channel)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInputChange("marketingChannels", [...formData.marketingChannels, channel]);
                          } else {
                            handleInputChange(
                              "marketingChannels", 
                              formData.marketingChannels.filter(c => c !== channel)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={channel.toLowerCase().replace(" ", "-")}>{channel}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
              <p className="text-muted-foreground">
                Your Knowledge Base is now set up with your business information.
                You can continue to add more documents and information to build out your knowledge base.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 0 && currentStep < steps.length - 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : currentStep === 0 ? (
            <Button variant="outline" asChild>
              <Link to="/content/knowledge-base">Cancel</Link>
            </Button>
          ) : (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
          
          <div className="flex space-x-2">
            {currentStep < steps.length - 1 && (
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            )}
            
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetupWizard;
