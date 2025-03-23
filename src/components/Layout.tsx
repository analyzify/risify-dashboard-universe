
import React from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ className, children, title }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />
        <main className={cn(
          "flex-1 overflow-auto p-6 animate-fade-in",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
