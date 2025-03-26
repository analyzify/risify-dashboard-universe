
import React, { createContext, useContext, useState } from 'react';

type ComponentActivationContextType = {
  isDialogOpen: boolean;
  activeComponent: string | null;
  openActivationDialog: (componentName: string) => void;
  closeActivationDialog: () => void;
  storeAuditResults?: {
    brokenLinks: number;
    schemaErrors: number;
    metaIssues: number;
    healthScore: number;
  };
};

const ComponentActivationContext = createContext<ComponentActivationContextType>({
  isDialogOpen: false,
  activeComponent: null,
  openActivationDialog: () => {},
  closeActivationDialog: () => {},
});

export const ComponentActivationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Mock audit results
  const storeAuditResults = {
    brokenLinks: 12,
    schemaErrors: 8,
    metaIssues: 15,
    healthScore: 73
  };

  const openActivationDialog = (componentName: string) => {
    setActiveComponent(componentName);
    setIsDialogOpen(true);
  };

  const closeActivationDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setActiveComponent(null), 300); // Clear after animation
  };

  return (
    <ComponentActivationContext.Provider
      value={{
        isDialogOpen,
        activeComponent,
        openActivationDialog,
        closeActivationDialog,
        storeAuditResults,
      }}
    >
      {children}
    </ComponentActivationContext.Provider>
  );
};

export const useComponentActivation = () => useContext(ComponentActivationContext);
