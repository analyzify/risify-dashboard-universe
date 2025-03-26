
import React, { createContext, useContext, useState } from 'react';

type ComponentActivationContextType = {
  isDialogOpen: boolean;
  activeComponent: string | null;
  openActivationDialog: (componentName: string) => void;
  closeActivationDialog: () => void;
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
      }}
    >
      {children}
    </ComponentActivationContext.Provider>
  );
};

export const useComponentActivation = () => useContext(ComponentActivationContext);
