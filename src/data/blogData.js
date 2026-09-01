const blogImages = import.meta.glob('../assets/images/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const categories = [
  {
    id: "customer-management",
    name: "Customer Management",
    slug: "customer-management",
  },
  {
    id: "sales-automation",
    name: "Sales Automation",
    slug: "sales-automation",
  },
  { id: "business-growth", name: "Business Growth", slug: "business-growth" },
  { id: "crm-solutions", name: "CRM Solutions", slug: "crm-solutions" },
];

const rawBlogPosts = [
  {
    id: "airtel-free-recharge-plan-claim-your-unlimited-data-today",
    title: "Free Rewards Program: Earn Mobile Recharge via Offers",
    category: "",
    categoryName: "Customer Management",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt: "Learn how free digital rewards and mobile recharge offers work.",
    imageFile: "00011.webp",
    content: {
      sections: [
        {
          heading: "Airtel Special Offers 2026",
          text: "Discover the latest Airtel promotional offers and rewards programs available in 2026.",
        },
        {
          heading: "Free Recharge",
          text: "Learn about legitimate free recharge programs through partner offers and promotional campaigns.",
        },
        {
          heading: "Top Ways to Get Rewards",
          text: "Explore various methods to earn rewards through surveys, offers, and promotional activities.",
        },
        {
          heading: "Digital Safety & Best Practices",
          text: "Stay safe online while participating in reward programs and promotional offers.",
        },
        {
          heading: "Value for Money",
          text: "Understand how reward programs can provide value when used responsibly.",
        },
      ],
    },
  },
  {
    id: "customer-management-software-modern-teams",
    title: "Customer Management Software for Modern Teams",
    category: "customer-management",
    categoryName: "Customer Management",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "Learn how customer management platforms help businesses improve organization, communication, and customer satisfaction.",
    imageFile: "00012.webp",
    content: {
      sections: [
        {
          heading: "Why Customer Management is Essential",
          text: "Customer management software helps businesses organize customer information, monitor interactions, and improve overall service quality.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Key Benefits",
          text: "Centralized Records: Store all customer details in one secure location.\n\nImproved Communication: Track conversations and follow-ups easily.\n\nEnhanced Productivity: Reduce manual work with automated workflows.",
        },
        {
          heading: "Conclusion",
          text: "Customer management platforms help businesses improve customer relationships while streamlining daily operations.",
        },
      ],
    },
  },
  {
    id: "best-customer-tracking-solutions-businesses",
    title: "Best Customer Tracking Solutions for Businesses",
    category: "customer-management",
    categoryName: "Customer Management",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "Explore customer tracking tools that help companies improve engagement and retention.",
    imageFile: "00005.webp",
    content: {
      sections: [
        {
          heading: "Customer Tracking Overview",
          text: "Modern customer tracking solutions help businesses monitor customer behavior and preferences.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Tracking Features",
          text: "Behavior Analytics\nEngagement Metrics\nCustomer Journey Mapping",
        },
        {
          heading: "Conclusion",
          text: "Implementing customer tracking improves business decision-making and customer satisfaction.",
        },
      ],
    },
  },
  {
    id: "customer-relationship-strategies-crm-software",
    title: "Customer Relationship Strategies with CRM Software",
    category: "customer-management",
    categoryName: "Customer Management",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt: "Discover how CRM software enhances customer engagement.",
    imageFile: "00008.webp",
    content: {
      sections: [
        {
          heading: "Building Better Customer Relationships",
          text: "CRM software provides tools to build and maintain strong customer relationships.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "CRM Advantages",
          text: "Better communication tools\nCustomer history tracking\nPersonalized engagement",
        },
        {
          heading: "Conclusion",
          text: "CRM systems are essential for modern customer relationship management.",
        },
      ],
    },
  },
  {
    id: "sales-automation-tools-faster-lead-conversion",
    title: "Sales Automation Tools for Faster Lead Conversion",
    category: "sales-automation",
    categoryName: "Sales Automation",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "Learn how sales automation helps businesses improve lead conversion and productivity.",
    imageFile: "00006.webp",
    content: {
      sections: [
        {
          heading: "What is Sales Automation?",
          text: "Sales automation streamlines repetitive tasks and improves sales team efficiency.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Key Features",
          text: "Automated follow-ups\nLead scoring\nEmail campaign automation",
        },
        {
          heading: "Conclusion",
          text: "Sales automation tools significantly improve conversion rates and team productivity.",
        },
      ],
    },
  },
  {
    id: "crm-automation-solutions-sales-teams",
    title: "CRM Automation Solutions for Sales Teams",
    category: "sales-automation",
    categoryName: "Sales Automation",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "Explore modern automation features that improve sales team performance.",
    imageFile: "00003.webp",
    content: {
      sections: [
        {
          heading: "Modern CRM Automation",
          text: "CRM automation eliminates manual tasks and allows sales teams to focus on closing deals.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Main Advantages",
          text: "Time savings\nImproved accuracy\nBetter lead management",
        },
        {
          heading: "Conclusion",
          text: "Automation is key to modern sales success.",
        },
      ],
    },
  },
  {
    id: "lead-automation-strategies-business-growth",
    title: "Lead Automation Strategies for Business Growth",
    category: "sales-automation",
    categoryName: "Sales Automation",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "See how automated lead management strategies help businesses scale faster.",
    imageFile: "00007.webp",
    content: {
      sections: [
        {
          heading: "Automating Lead Management",
          text: "Lead automation helps businesses capture, nurture, and convert leads more efficiently.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Benefits of Lead Automation",
          text: "Faster response times\nImproved lead quality\nScalable processes",
        },
        {
          heading: "Conclusion",
          text: "Lead automation is essential for sustainable business growth.",
        },
      ],
    },
  },
  {
    id: "business-growth-strategies-crm-platforms",
    title: "Business Growth Strategies Using CRM Platforms",
    category: "business-growth",
    categoryName: "Business Growth",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt: "Learn how CRM platforms drive long-term business expansion.",
    imageFile: "00014.webp",
    content: {
      sections: [
        {
          heading: "CRM and Business Expansion",
          text: "CRM platforms provide the foundation for sustainable business growth strategies.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Growth Benefits",
          text: "Data-driven decisions\nImproved customer retention\nScalable infrastructure",
        },
        {
          heading: "Conclusion",
          text: "CRM platforms are critical tools for growing businesses.",
        },
      ],
    },
  },
  {
    id: "crm-software-supports-company-growth",
    title: "How CRM Software Supports Company Growth",
    category: "business-growth",
    categoryName: "Business Growth",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt: "Understand how CRM technology enables business expansion.",
    imageFile: "00002.webp",
    content: {
      sections: [
        {
          heading: "Growing with CRM Technology",
          text: "CRM software provides infrastructure for managing growing customer bases.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Important Features",
          text: "Scalability\nAutomation\nAnalytics",
        },
        {
          heading: "Conclusion",
          text: "CRM technology supports businesses at every growth stage.",
        },
      ],
    },
  },
  {
    id: "increasing-revenue-lead-management-systems",
    title: "Increasing Revenue with Lead Management Systems",
    category: "business-growth",
    categoryName: "Business Growth",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "Discover how lead management systems boost revenue and profitability.",
    imageFile: "00004.webp",
    content: {
      sections: [
        {
          heading: "The Role of Lead Management",
          text: "Lead management systems help businesses maximize revenue from their sales pipeline.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Revenue-Boosting Features",
          text: "Lead prioritization\nConversion tracking\nPipeline analytics",
        },
        {
          heading: "Conclusion",
          text: "Effective lead management directly impacts bottom-line revenue.",
        },
      ],
    },
  },
  {
    id: "best-crm-solutions-growing-businesses",
    title: "Best CRM Solutions for Growing Businesses",
    category: "crm-solutions",
    categoryName: "CRM Solutions",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt: "Compare top CRM solutions designed for business growth.",
    imageFile: "00009.webp",
    content: {
      sections: [
        {
          heading: "Choosing the Right CRM Solution",
          text: "Selecting the right CRM is crucial for growing businesses.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Main Features",
          text: "User-friendly interface\nIntegration capabilities\nCustomization options",
        },
        {
          heading: "Conclusion",
          text: "The right CRM solution accelerates business growth.",
        },
      ],
    },
  },
  {
    id: "cloud-crm-solutions-modern-companies",
    title: "Cloud CRM Solutions for Modern Companies",
    category: "crm-solutions",
    categoryName: "CRM Solutions",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt: "Explore cloud-based CRM benefits for modern organizations.",
    imageFile: "00013.webp",
    content: {
      sections: [
        {
          heading: "Benefits of Cloud CRM",
          text: "Cloud CRM solutions offer flexibility, scalability, and accessibility.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Core Features",
          text: "Anywhere access\nAutomatic updates\nCost efficiency",
        },
        {
          heading: "Conclusion",
          text: "Cloud CRM is the future of customer relationship management.",
        },
      ],
    },
  },
  {
    id: "affordable-crm-platforms-small-businesses",
    title: "Affordable CRM Platforms for Small Businesses",
    category: "crm-solutions",
    categoryName: "CRM Solutions",
    date: "May 07, 2026",
    author: "Lead Management Center",
    excerpt:
      "Discover budget-friendly CRM solutions perfect for small businesses looking to improve customer relationships.",
    imageFile: "00010.webp",
    content: {
      sections: [
        {
          heading: "Why Small Businesses Need CRM",
          text: "Small businesses need affordable CRM platforms to manage customer relationships, track leads, and grow efficiently without breaking the bank.",
        },
        {
          heading: "Free Car Accessories",
          text: "जीतने के लिए Scroll करें 🚗 👇",
        },
        {
          heading: "Top Affordable CRM Options",
          text: "Budget-friendly platforms\nEasy setup and training\nScalable as you grow\nEssential features included",
        },
        {
          heading: "Conclusion",
          text: "Affordable CRM platforms help small businesses compete with larger companies while staying within budget.",
        },
      ],
    },
  },
];

export const blogPosts = rawBlogPosts.map(({ imageFile, ...post }) => ({
  ...post,
  image: blogImages['../assets/images/' + imageFile],
}));

export const getBlogPost = (slug) => {
  return blogPosts.find((post) => post.id === slug);
};

export const getBlogsByCategory = (categoryId) => {
  return blogPosts.filter((post) => post.category === categoryId);
};

export const getCategoryBySlug = (slug) => {
  return categories.find((cat) => cat.slug === slug);
};
