
import React from "react";
import Layout from "@/components/Layout";
import { growthTasks } from '@/data/growthTasks';
import GrowthTasksDashboard from "@/components/growth-tasks/Dashboard";

const Tasks = () => {
  return (
    <Layout title="Growth Tasks">
      <GrowthTasksDashboard 
        taskCategories={growthTasks.taskCategories}
        tasks={growthTasks.tasks}
      />
    </Layout>
  );
};

export default Tasks;
