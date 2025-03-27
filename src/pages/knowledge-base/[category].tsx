
import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import CategoryView from "@/components/knowledge-base/CategoryView";
import knowledgeBaseData from "@/data/knowledgeBase.json";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the category to get its name for the title
  const category = knowledgeBaseData.categories.find(cat => cat.id === categoryId);
  
  return (
    <>
      <Helmet>
        <title>{category?.name || "Category"} | Knowledge Base | Risify</title>
      </Helmet>
      <Layout title={category?.name || "Category"}>
        <CategoryView />
      </Layout>
    </>
  );
};

export default CategoryPage;
