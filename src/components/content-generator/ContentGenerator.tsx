
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Edit, Clipboard, Save, RefreshCw, Send, MessageSquare } from 'lucide-react';
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const CONTENT_TYPES = [
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'Create compelling product descriptions that convert'
  },
  {
    id: 'collection-description',
    name: 'Collection Description',
    description: 'Write engaging introductions for your product collections'
  },
  {
    id: 'meta-data',
    name: 'Meta Title & Description',
    description: 'Generate SEO-optimized page metadata'
  },
  {
    id: 'faq',
    name: 'FAQs',
    description: 'Create frequently asked questions and answers'
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Draft blog content related to your products'
  },
  {
    id: 'about-us',
    name: 'About Us',
    description: 'Create compelling company information'
  }
];

// Demo data
const DEMO_PRODUCTS = [
  { id: 'p1', title: 'Scandinavian Oak Coffee Table' },
  { id: 'p2', title: 'Minimalist Desk Lamp' },
  { id: 'p3', title: 'Organic Cotton Throw Pillow' },
  { id: 'p4', title: 'Ceramic Serving Bowl Set' }
];

const DEMO_COLLECTIONS = [
  { id: 'c1', title: 'Living Room' },
  { id: 'c2', title: 'Home Office' },
  { id: 'c3', title: 'Kitchen & Dining' },
  { id: 'c4', title: 'Bedroom Essentials' }
];

const ContentGenerator = () => {
  const [activeTab, setActiveTab] = useState<string>("templates");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [generationParams, setGenerationParams] = useState({
    tone: 'default', // Uses brand voice by default
    length: 2, // Medium
    keywords: ''
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your Content Agent. How can I help you with content creation today?'
    }
  ]);
  
  const handleTypeSelect = (type: any) => {
    setSelectedType(type);
    setCurrentStep(2);
  };
  
  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setCurrentStep(3);
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Demo generated content based on selection
      let content = '';
      
      if (selectedType.id === 'product-description' && selectedItem) {
        content = `Experience the perfect blend of form and function with our ${selectedItem.title}. Crafted with attention to detail, this piece combines Scandinavian design principles with sustainable materials to create a statement piece for your home.

The natural wood grain adds warmth to any room, while the clean lines and minimalist silhouette ensure it complements a variety of interior styles. Each piece is carefully finished to highlight the beauty of the materials.

Features:
- Sustainably sourced materials
- Durable construction for everyday use
- Timeless design that adapts to changing trends
- Easy assembly with included tools

Complete your space with the ${selectedItem.title} and enjoy the perfect balance of beauty and practicality.`;
      } else if (selectedType.id === 'collection-description' && selectedItem) {
        content = `Transform your ${selectedItem.title} with our curated collection of thoughtfully designed pieces. Each item is selected to complement one another while maintaining its unique character and quality.

Our ${selectedItem.title} collection blends functionality with aesthetic appeal, creating spaces that feel both personal and purposeful. From statement pieces to subtle accents, every item contributes to a cohesive design language.

Explore our ${selectedItem.title} collection and discover how the right combination of furniture, lighting, and accessories can transform your space into a sanctuary of style and comfort.`;
      } else if (selectedType.id === 'meta-data' && selectedItem) {
        content = `Title: ${selectedItem.title} | Premium Home Furnishings & Decor | Your Brand

Description: Discover our ${selectedItem.title.toLowerCase()} - thoughtfully designed, sustainably crafted, and built to last. Free shipping on orders over $50. Shop now and transform your space.`;
      } else if (selectedType.id === 'faq' && selectedItem) {
        content = `Q: What materials are used in the ${selectedItem.title}?
A: Our ${selectedItem.title} is crafted using sustainably sourced materials, including solid oak and eco-friendly finishes. All materials meet or exceed industry standards for quality and environmental responsibility.

Q: What are the dimensions of the ${selectedItem.title}?
A: The ${selectedItem.title} measures 47" W x 24" D x 18" H, making it ideal for standard living spaces. For custom dimensions, please contact our customer service team.

Q: How do I care for my ${selectedItem.title}?
A: To maintain the beauty of your ${selectedItem.title}, simply dust regularly with a soft, dry cloth. For deeper cleaning, use a mild wood cleaner applied with a damp cloth, followed by a dry cloth. Avoid direct sunlight and heat sources to prevent damage.

Q: Is assembly required for the ${selectedItem.title}?
A: Yes, some assembly is required. Each piece comes with detailed instructions and all necessary hardware. Assembly typically takes 30-45 minutes and requires only basic tools.`;
      } else if (selectedType.id === 'blog-post') {
        content = `# 5 Ways to Transform Your Living Space for the New Season

As we transition into a new season, it's the perfect time to refresh your living spaces. Small changes can make a significant impact on how your home feels and functions. Here are five simple ways to transform your space without a complete renovation:

## 1. Rotate Your Textiles

Swapping out textiles is one of the easiest ways to update your space. Consider changing throw pillows, blankets, and even rugs to reflect the season. For spring and summer, opt for lighter fabrics and colors; for fall and winter, incorporate richer tones and heavier materials like wool or velvet.

## 2. Rearrange Your Furniture

Sometimes, all you need is a new perspective. Rearranging your furniture can completely transform the flow and feel of a room. Try positioning your sofa away from the wall or changing the orientation of your dining table. Use the opportunity to deep clean those hard-to-reach areas.

## 3. Introduce Natural Elements

Bringing nature indoors creates a refreshing, vibrant atmosphere. Add seasonal plants or flowers to breathe life into your space. For a low-maintenance option, consider dried botanicals or high-quality artificial plants.

## 4. Update Your Lighting

Lighting dramatically affects how we experience a space. Layer different sources: ambient lighting for general illumination, task lighting for specific activities, and accent lighting to highlight architectural features or artwork. Consider swapping out lampshades or adding string lights for a cozy touch.

## 5. Curate Thoughtful Vignettes

Create small, curated displays throughout your home using items you already own. Group objects of varying heights, textures, and materials to create visually interesting arrangements on coffee tables, mantels, or shelves. This is also a great way to showcase seasonal items or meaningful mementos.

Remember, transforming your space doesn't need to be expensive or time-consuming. Often, the most impactful changes come from thoughtful, intentional adjustments that enhance how you experience your home every day.`;
      } else if (selectedType.id === 'about-us') {
        content = `# Our Story

Founded in 2015, our journey began with a simple belief: high-quality, thoughtfully designed home furnishings should be accessible to everyone. What started as a small collection of handcrafted pieces has evolved into a comprehensive home decor brand trusted by thousands of customers across the country.

## Our Philosophy

We believe your home should be a reflection of you—your experiences, values, and aspirations. Each piece in our collection is designed with this philosophy in mind, blending timeless design principles with contemporary sensibilities to create products that enhance your daily life.

## Our Commitment to Sustainability

Environmental responsibility is at the core of everything we do. From sourcing sustainable materials to implementing eco-friendly manufacturing processes and minimizing packaging waste, we're committed to reducing our ecological footprint at every step.

## Our Design Approach

Our in-house design team draws inspiration from global design traditions, natural elements, and the evolving ways people live and work. We focus on creating pieces that are not only beautiful but functional and durable, designed to grow with you through life's various chapters.

## Our Community

We're proud to have built a community of homeowners, designers, and enthusiasts who share our passion for thoughtful living spaces. Through our blog, social media channels, and events, we foster connections and share ideas that celebrate the art of creating a home.

Thank you for being part of our story. We're excited to be part of yours.`;
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
      setCurrentStep(4);
      toast.success("Content generated successfully!");
    }, 1500);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard!");
  };

  const handleSaveContent = () => {
    // In a real app, this would save to the store
    toast.success("Content saved to store!");
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: chatMessage }]);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Add bot response
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `I've noted your request for "${chatMessage}". Based on your Knowledge Base, I can help with this. Would you like me to draft some content focusing on specific aspects of your brand or products?` 
      }]);
    }, 1000);
    
    setChatMessage('');
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTENT_TYPES.map((type) => (
              <Card 
                key={type.id} 
                className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                onClick={() => handleTypeSelect(type)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{type.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{type.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        );
        
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Select a {selectedType.id === 'product-description' ? 'Product' : 
                      selectedType.id === 'collection-description' ? 'Collection' : 
                      selectedType.id === 'meta-data' ? 'Page, Product or Collection' :
                      selectedType.id === 'faq' ? 'Product or Topic' : 'Topic'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(selectedType.id === 'product-description' || selectedType.id === 'meta-data' || selectedType.id === 'faq' ? 
                DEMO_PRODUCTS : 
                DEMO_COLLECTIONS).map((item) => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                  onClick={() => handleItemSelect(item)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {(selectedType.id === 'blog-post' || selectedType.id === 'about-us') && (
              <Card className="mt-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                    onClick={() => handleItemSelect({ id: 'custom', title: selectedType.id === 'blog-post' ? 'Seasonal Home Decor' : 'Company Story' })}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{selectedType.id === 'blog-post' ? 'Seasonal Home Decor' : 'Company Story'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {selectedType.id === 'blog-post' 
                      ? 'Create a blog post about seasonal home decoration ideas' 
                      : 'Generate an about us page that tells your company story'}
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            <div className="mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back to Content Types
              </Button>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Generation Options</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tone of Voice</Label>
                <Select 
                  value={generationParams.tone}
                  onValueChange={(value) => setGenerationParams({...generationParams, tone: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Brand Voice (from Knowledge Base)</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="luxury">Luxury & Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Content Length</Label>
                  <span className="text-sm text-muted-foreground">
                    {generationParams.length === 1 ? 'Short' : 
                     generationParams.length === 2 ? 'Medium' : 'Long'}
                  </span>
                </div>
                <Slider 
                  min={1} 
                  max={3} 
                  step={1}
                  value={[generationParams.length]}
                  onValueChange={(value) => setGenerationParams({...generationParams, length: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Keywords to Include (optional)</Label>
                <Textarea 
                  placeholder="Enter keywords separated by commas"
                  value={generationParams.keywords}
                  onChange={(e) => setGenerationParams({...generationParams, keywords: e.target.value})}
                />
              </div>
              
              <Button onClick={handleGenerate} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content
              </Button>

              <div className="mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Selection
                </Button>
              </div>
            </div>
          </>
        );
        
      case 4:
        return (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Generated Content</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyContent}>
                  <Clipboard className="mr-1 h-4 w-4" />
                  Copy
                </Button>
                <Button size="sm" onClick={handleSaveContent}>
                  <Save className="mr-1 h-4 w-4" />
                  Save to Store
                </Button>
              </div>
            </div>
            
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  {isGenerating ? (
                    <div className="flex flex-col justify-center items-center py-12 space-y-4">
                      <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-muted-foreground">Generating content...</p>
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">
                      {generatedContent}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Create Another
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit & Customize
              </Button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl animate-fade-in">
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Content Templates</TabsTrigger>
          <TabsTrigger value="chat">Chat with Content Agent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Create Content</h1>
            <p className="text-muted-foreground mt-1">
              Create professional, on-brand content powered by your Knowledge Base
            </p>
          </div>
          
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-1 text-center text-sm mb-2">
              <div className={cn("text-xs sm:text-sm", currentStep >= 1 ? "text-foreground font-medium" : "text-muted-foreground")}>Choose Type</div>
              <div className={cn("text-xs sm:text-sm", currentStep >= 2 ? "text-foreground font-medium" : "text-muted-foreground")}>Select Content</div>
              <div className={cn("text-xs sm:text-sm", currentStep >= 3 ? "text-foreground font-medium" : "text-muted-foreground")}>Options</div>
              <div className={cn("text-xs sm:text-sm", currentStep >= 4 ? "text-foreground font-medium" : "text-muted-foreground")}>Review</div>
            </div>
            
            <Progress value={(currentStep / 4) * 100} className="h-2" />
            
            <div className="flex justify-between mt-1.5">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                    step <= currentStep 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
          
          {renderStepContent()}
        </TabsContent>
        
        <TabsContent value="chat" className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">CHAT with CONTENT AGENT</h1>
            <h2 className="text-lg text-muted-foreground">for your custom needs</h2>
          </div>
          
          <Card className="h-[500px] flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 mt-4">
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex max-w-[80%] p-3 rounded-lg",
                    message.role === 'user' 
                      ? "ml-auto bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full gap-2">
                <Textarea 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask the Content Agent for any type of content..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendChatMessage();
                    }
                  }}
                />
                <Button onClick={handleSendChatMessage} size="icon" className="h-auto">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to use the Content Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>💡 <strong>Ask for specific content</strong> - "Write a product description for a leather wallet"</p>
              <p>💡 <strong>Refine content</strong> - "Make it more premium sounding and emphasize craftsmanship"</p>
              <p>💡 <strong>Generate variations</strong> - "Give me 3 different headline options for this blog post"</p>
              <p>💡 <strong>Fix content issues</strong> - "Rewrite this to fix grammar and improve flow"</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentGenerator;
