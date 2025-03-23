
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { CheckSquare } from "lucide-react";

const Tasks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tasks/discovery");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout title="Growth Tasks">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8">
          <CheckSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Growth Tasks Hub</h2>
          <p className="text-muted-foreground">
            Redirecting to Task Discovery...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
