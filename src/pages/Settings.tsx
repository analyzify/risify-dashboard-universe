
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/settings/account");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout title="Settings">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8">
          <SettingsIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Settings</h2>
          <p className="text-muted-foreground">
            Redirecting to Account Settings...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
