
export const growthTasks = {
  "taskCategories": [
    {
      "id": "product-optimization",
      "name": "Product Optimization",
      "description": "Improve individual product pages for better visibility and conversion"
    },
    {
      "id": "collection-optimization",
      "name": "Collection Optimization",
      "description": "Enhance collection pages to drive more traffic and engagement"
    },
    {
      "id": "technical-seo",
      "name": "Technical SEO",
      "description": "Fix technical issues that may be affecting your store's search performance"
    },
    {
      "id": "content-creation",
      "name": "Content Creation",
      "description": "Create new content to target valuable keywords and answer customer questions"
    }
  ],
  "tasks": [
    {
      "id": "optimize-product-description",
      "categoryId": "product-optimization",
      "title": "Optimize Product Description",
      "description": "Improve a product description to target relevant keywords and increase conversion",
      "difficulty": "medium",
      "timeEstimate": "15-20 minutes",
      "impact": "high",
      "completionRate": "78%",
      "steps": [
        {
          "id": "research-keywords",
          "title": "Research Keywords",
          "description": "Identify the main keywords to target in your product description"
        },
        {
          "id": "write-introduction",
          "title": "Write Compelling Introduction",
          "description": "Create an attention-grabbing opening that includes primary keywords"
        },
        {
          "id": "highlight-features",
          "title": "Highlight Key Features",
          "description": "List product features and benefits with secondary keywords"
        },
        {
          "id": "add-specs",
          "title": "Add Technical Specifications",
          "description": "Include relevant product details and specifications"
        },
        {
          "id": "create-call-to-action",
          "title": "Create Call-to-Action",
          "description": "Add a persuasive closing that encourages purchase"
        }
      ]
    },
    {
      "id": "add-product-faq",
      "categoryId": "content-creation",
      "title": "Add Product FAQs",
      "description": "Create a FAQ section to address common customer questions and improve SEO",
      "difficulty": "easy",
      "timeEstimate": "10-15 minutes",
      "impact": "medium",
      "completionRate": "85%",
      "steps": [
        {
          "id": "identify-questions",
          "title": "Identify Common Questions",
          "description": "Research the most frequently asked questions about your product"
        },
        {
          "id": "draft-answers",
          "title": "Draft Clear Answers",
          "description": "Write concise, helpful answers to each question"
        },
        {
          "id": "implement-schema",
          "title": "Implement FAQ Schema",
          "description": "Add proper schema markup to your FAQ section"
        },
        {
          "id": "review-formatting",
          "title": "Review Formatting",
          "description": "Ensure the FAQ section is well-formatted and easy to read"
        }
      ]
    }
  ],
  "demoKeywords": [
    {
      "keyword": "scandinavian coffee table",
      "volume": 2900,
      "difficulty": "medium",
      "currentRanking": 12,
      "relevance": "high",
      "opportunity": "excellent"
    },
    {
      "keyword": "oak coffee table",
      "volume": 5400,
      "difficulty": "high",
      "currentRanking": 28,
      "relevance": "high",
      "opportunity": "good"
    },
    {
      "keyword": "minimalist furniture",
      "volume": 8200,
      "difficulty": "high",
      "currentRanking": null,
      "relevance": "medium",
      "opportunity": "potential"
    },
    {
      "keyword": "modern living room furniture",
      "volume": 12000,
      "difficulty": "very high",
      "currentRanking": null,
      "relevance": "medium",
      "opportunity": "challenging"
    }
  ],
  "demoPages": [
    {
      "id": "p1",
      "type": "product",
      "title": "Scandinavian Oak Coffee Table",
      "url": "/products/scandinavian-oak-coffee-table",
      "completenessScore": 65,
      "lastUpdated": "2025-02-15T09:45:00Z"
    },
    {
      "id": "p2",
      "type": "product",
      "title": "Minimalist Desk Lamp",
      "url": "/products/minimalist-desk-lamp",
      "completenessScore": 78,
      "lastUpdated": "2025-03-05T14:30:00Z"
    },
    {
      "id": "c1",
      "type": "collection",
      "title": "Living Room Furniture",
      "url": "/collections/living-room",
      "completenessScore": 45,
      "lastUpdated": "2025-01-20T11:15:00Z"
    },
    {
      "id": "c2",
      "type": "collection",
      "title": "Home Office",
      "url": "/collections/home-office",
      "completenessScore": 60,
      "lastUpdated": "2025-02-28T16:20:00Z"
    }
  ]
};

export type TaskCategory = {
  id: string;
  name: string;
  description: string;
};

export type TaskStep = {
  id: string;
  title: string;
  description: string;
};

export type Task = {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  difficulty: string;
  timeEstimate: string;
  impact: string;
  completionRate: string;
  steps: TaskStep[];
};

export type Keyword = {
  keyword: string;
  volume: number;
  difficulty: string;
  currentRanking: number | null;
  relevance: string;
  opportunity: string;
};

export type Page = {
  id: string;
  type: string;
  title: string;
  url: string;
  completenessScore: number;
  lastUpdated: string;
};
