
import React, { useState } from 'react';
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import TaskSelector from '@/components/growth-tasks/TaskSelector';
import KeywordSelector from '@/components/growth-tasks/KeywordSelector';
import PageSelector from '@/components/growth-tasks/PageSelector';
import TaskProgress from '@/components/growth-tasks/TaskProgress';
import type { Task, Page } from '@/data/growthTasks';

const TaskDiscoveryPage = () => {
  const [workflowStep, setWorkflowStep] = useState<'select-task' | 'select-keywords' | 'select-page' | 'in-progress'>('select-task');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setWorkflowStep('select-keywords');
  };

  const handleSelectKeywords = (keywords: string[]) => {
    setSelectedKeywords(keywords);
    setWorkflowStep('select-page');
  };

  const handleSelectPage = (page: Page) => {
    setSelectedPage(page);
    setWorkflowStep('in-progress');
  };

  const handleBackToTasks = () => {
    setWorkflowStep('select-task');
  };

  const handleBackToKeywords = () => {
    setWorkflowStep('select-keywords');
  };

  const handleTaskComplete = () => {
    // In a real app, this would save the completion status
    // For the demo, just go back to the tasks selection
    setWorkflowStep('select-task');
    setSelectedTask(null);
    setSelectedKeywords([]);
    setSelectedPage(null);
  };

  return (
    <Layout title="Task Discovery">
      {workflowStep === 'select-task' && (
        <TaskSelector 
          taskCategories={growthTasks.taskCategories}
          tasks={growthTasks.tasks}
          onSelectTask={handleSelectTask}
        />
      )}

      {workflowStep === 'select-keywords' && selectedTask && (
        <KeywordSelector 
          keywords={growthTasks.demoKeywords}
          onBack={handleBackToTasks}
          onContinue={handleSelectKeywords}
        />
      )}

      {workflowStep === 'select-page' && selectedTask && (
        <PageSelector 
          pages={growthTasks.demoPages}
          selectedKeywords={selectedKeywords}
          onBack={handleBackToKeywords}
          onContinue={handleSelectPage}
        />
      )}

      {workflowStep === 'in-progress' && selectedTask && selectedPage && (
        <TaskProgress 
          task={selectedTask}
          selectedPage={selectedPage}
          selectedKeywords={selectedKeywords}
          onBack={() => setWorkflowStep('select-page')}
          onComplete={handleTaskComplete}
        />
      )}
    </Layout>
  );
};

export default TaskDiscoveryPage;
