
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Award, Zap, Users } from "lucide-react";
import { Task, TaskCategory } from '@/data/growthTasks';

interface TaskSelectorProps {
  taskCategories: TaskCategory[];
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-orange-100 text-orange-800'
};

const impactColors: Record<string, string> = {
  low: 'text-muted-foreground',
  medium: 'text-blue-600',
  high: 'text-purple-600'
};

const TaskSelector: React.FC<TaskSelectorProps> = ({ taskCategories, tasks, onSelectTask }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">1</div>
          <h1 className="text-2xl font-bold">Choose a Task</h1>
        </div>
        <p className="text-muted-foreground mt-2 ml-11">
          Select an optimization task to improve your store's performance
        </p>
      </div>
      
      <Tabs defaultValue={taskCategories[0].id} className="mb-6">
        <TabsList className="mb-6">
          {taskCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {taskCategories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tasks.filter(task => task.categoryId === category.id).map(task => (
                <Card 
                  key={task.id} 
                  className="cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => onSelectTask(task)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge className={difficultyColors[task.difficulty] || ''}>
                        {task.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {task.timeEstimate}
                      </div>
                      <div className="flex items-center">
                        <Award size={14} className={`mr-1 ${impactColors[task.impact] || ''}`} />
                        <span className={impactColors[task.impact] || ''}>{task.impact} impact</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {task.completionRate} completion rate
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {task.tags && task.tags?.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <Button className="flex items-center gap-1" onClick={() => onSelectTask(task)}>
                        <Zap size={16} />
                        Start Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TaskSelector;
