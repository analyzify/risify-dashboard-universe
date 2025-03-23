
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/search/position-tracking");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout title="Search & Visibility">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8">
          <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Search & Visibility Hub</h2>
          <p className="text-muted-foreground">
            Redirecting to Position Tracking...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
