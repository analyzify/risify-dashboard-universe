
import React from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import DocumentEditor from "@/components/knowledge-base/DocumentEditor";
import knowledgeBaseData from "@/data/knowledgeBase.json";

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  
  const documentId = searchParams.get("document");
  const categoryId = searchParams.get("category");
  
  // Find the document or template to get title
  const document = documentId 
    ? knowledgeBaseData.categories
        .flatMap(cat => cat.documents)
        .find(doc => doc.id === documentId)
    : null;
    
  const template = document
    ? knowledgeBaseData.templates.find(t => t.id === document.id)
    : categoryId
      ? knowledgeBaseData.templates.find(t => t.category === categoryId)
      : null;
  
  const pageTitle = document
    ? `Edit ${document.title}`
    : template
      ? `New ${template.title}`
      : "Document Editor";
  
  return (
    <>
      <Helmet>
        <title>{pageTitle} | Knowledge Base | Risify</title>
      </Helmet>
      <Layout title={pageTitle}>
        <DocumentEditor />
      </Layout>
    </>
  );
};

export default EditorPage;
