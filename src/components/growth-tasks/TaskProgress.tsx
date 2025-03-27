
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Send, MessageSquare } from "lucide-react";
import { Task, Page } from '@/data/growthTasks';
import { Input } from '@/components/ui/input';

interface TaskProgressProps {
  task: Task;
  selectedPage: Page;
  selectedKeywords: string[];
  onBack: () => void;
  onComplete: () => void;
}

const TaskProgress: React.FC<TaskProgressProps> = ({ 
  task, 
  selectedPage, 
  selectedKeywords, 
  onBack, 
  onComplete 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');
  
  const currentStep = task.steps[currentStepIndex];
  const totalSteps = task.steps.length;
  const progress = (completedSteps.length / totalSteps) * 100;
  
  const handleCompleteStep = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      onBack();
    }
  };
  
  const isLastStep = currentStepIndex === totalSteps - 1;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">4</div>
          <h1 className="text-2xl font-bold">{task.title}</h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-11">
          Optimizing <span className="font-medium">{selectedPage.title}</span> with keywords: 
          <span className="font-medium ml-1">{selectedKeywords.join(', ')}</span>
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Overall Progress</span>
          <span>{completedSteps.length}/{totalSteps} steps</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Steps sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Task Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {task.steps.map((step, index) => (
                  <li 
                    key={step.id}
                    className={`p-3 cursor-pointer ${
                      index === currentStepIndex ? 'bg-blue-50' : ''
                    } ${
                      completedSteps.includes(step.id) ? 'text-muted-foreground' : ''
                    } hover:bg-muted/20`}
                    onClick={() => setCurrentStepIndex(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 mr-2">
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border ${
                            index === currentStepIndex ? 'border-blue-500 bg-blue-100' : 'border-muted-foreground'
                          }`}>
                            {index === currentStepIndex && (
                              <div className="w-2 h-2 rounded-full bg-blue-500 m-0.5"></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          completedSteps.includes(step.id) ? 'line-through' : ''
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Step {currentStepIndex + 1}: {currentStep.title}</CardTitle>
              <CardDescription>{currentStep.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="instructions">
                <TabsList className="mb-4">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="example">Example</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions">
                  <div className="prose prose-sm max-w-none">
                    <p>To complete this step, you need to:</p>
                    <ul>
                      <li>Review your current content on the page</li>
                      <li>Identify opportunities to include your target keywords: <strong>{selectedKeywords.join(', ')}</strong></li>
                      <li>Ensure the content is well-structured and easy to read</li>
                      <li>Check that the content addresses customer needs and questions</li>
                    </ul>
                    <p>When you're ready, mark this step as complete and move to the next step.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="example">
                  <div className="prose prose-sm max-w-none">
                    <p><strong>Example Optimization:</strong></p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p><strong>Original:</strong> "Our coffee table is made from high-quality wood."</p>
                      <p><strong>Optimized:</strong> "Our <mark>Scandinavian coffee table</mark> is crafted from premium <mark>oak</mark>, bringing a touch of <mark>minimalist</mark> elegance to your <mark>modern living room</mark>."</p>
                    </div>
                    <p className="mt-2">Notice how the optimized version naturally incorporates multiple target keywords while providing more specific and valuable information.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="tips">
                  <div className="prose prose-sm max-w-none">
                    <p><strong>Pro Tips:</strong></p>
                    <ul>
                      <li>Don't sacrifice readability for keyword inclusion. Always prioritize the user experience.</li>
                      <li>Use keywords in the first paragraph where possible, but only if it flows naturally.</li>
                      <li>Consider using related terms and synonyms, not just exact matches.</li>
                      <li>Break up large blocks of text with subheadings that include keywords when relevant.</li>
                      <li>Add any questions you have for our AI assistant in the chat panel below.</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* AI Assistant section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare size={18} className="mr-2 text-blue-500" />
                AI Assistant
              </CardTitle>
              <CardDescription>
                Ask questions or get help with completing this step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 rounded-lg p-4 mb-4 h-60 overflow-y-auto">
                <div className="flex mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    AI
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 max-w-[85%]">
                    <p className="text-sm">
                      I'm here to help you optimize <strong>{selectedPage.title}</strong> with your selected keywords. What would you like assistance with?
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-3">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[85%]">
                    <p className="text-sm">
                      Can you analyze my current page and suggest improvements?
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center ml-2 flex-shrink-0">
                    You
                  </div>
                </div>
                
                <div className="flex mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    AI
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 max-w-[85%]">
                    <p className="text-sm">
                      I've analyzed your <strong>{selectedPage.title}</strong> page and found several opportunities for improvement:
                    </p>
                    <ul className="text-sm list-disc pl-5 mt-2">
                      <li>The product title doesn't include "Scandinavian" which is a high-value keyword</li>
                      <li>The description mentions "wood" generically instead of specifying "oak"</li>
                      <li>You could add a section about how this piece fits in a "modern living room"</li>
                      <li>Consider adding a FAQ section to address common questions and improve SEO</li>
                    </ul>
                    <p className="text-sm mt-2">
                      Would you like me to draft some specific content suggestions for any of these areas?
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <Input 
                  placeholder="Ask the AI assistant..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="mr-2"
                />
                <Button type="submit" size="icon">
                  <Send size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePreviousStep}>
          <ChevronLeft size={16} className="mr-1" />
          {currentStepIndex === 0 ? "Back to Pages" : "Previous Step"}
        </Button>
        
        <div className="flex gap-3">
          {!isLastStep && (
            <Button variant="outline" onClick={() => setCurrentStepIndex(currentStepIndex + 1)}>
              Skip Step
            </Button>
          )}
          <Button 
            variant={isLastStep ? "default" : "default"}
            onClick={handleCompleteStep}
          >
            {completedSteps.includes(currentStep.id) ? (
              <>
                {isLastStep ? "Complete Task" : "Next Step"}
                <ChevronRight size={16} className="ml-1" />
              </>
            ) : (
              <>
                <Clock size={16} className="mr-1" />
                Mark as Complete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
