const blogImages = import.meta.glob("../assets/images/*.{webp,png}", {
  eager: true,
  query: "?url",
  import: "default",
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
    id: "personal-loan-online-eligibility-check-apply",
    title: "पर्सनल लोन ऑनलाइन: पात्रता जांचें और आवेदन करें",
    category: "",
    categoryName: "पर्सनल लोन",
    date: "January 15, 2026",
    author: "फाइनेंस सपोर्ट टीम",
    excerpt:
      "क्या आप अपने व्यक्तिगत खर्चों के लिए वित्तीय सहायता की तलाश कर रहे हैं? पात्र उपयोगकर्ताओं के लिए पर्सनल लोन के विकल्प उपलब्ध हो सकते हैं।",
    imageFile: "f7a6e02f955c0cd3233399c4aee632adcf319c83.png",
    content: {
      sections: [
        {
          heading: "पर्सनल लोन ऑफर 2026",
          text: "क्या आप अपने व्यक्तिगत खर्चों के लिए वित्तीय सहायता की तलाश कर रहे हैं? पात्र उपयोगकर्ताओं के लिए पर्सनल लोन के विकल्प उपलब्ध हो सकते हैं। पात्रता आय, क्रेडिट प्रोफाइल, रोजगार की स्थिति, ऋणदाता के नियमों और लोन चुकाने की क्षमता जैसे कारकों पर निर्भर करती है।\n\nउपयोगकर्ता ऑनलाइन उपलब्ध लोन ऑफर देख सकते हैं, महत्वपूर्ण जानकारी की तुलना कर सकते हैं और संबंधित ऋणदाता या वित्तीय सेवा प्रदाता के माध्यम से आवेदन की प्रक्रिया आगे बढ़ा सकते हैं।",
        },
        {
          heading: "पर्सनल लोन के लिए Scroll करें 💰👇",
          text: "पर्सनल लोन क्यों चुनें?\n\nऑनलाइन आवेदन: आसान डिजिटल प्रक्रिया के माध्यम से आवेदन करें।\n\nलोन राशि के विकल्प: उपलब्ध लोन राशि ऋणदाता की पात्रता शर्तों पर निर्भर करती है।\n\nलचीला पुनर्भुगतान: उपलब्ध विकल्पों में से उपयुक्त लोन अवधि चुनें।\n\nत्वरित पात्रता जांच: देखें कि आप उपलब्ध लोन ऑफर के लिए पात्र हो सकते हैं या नहीं।\n\nकम दस्तावेज़ी प्रक्रिया: आवश्यक दस्तावेज़ ऋणदाता के अनुसार अलग-अलग हो सकते हैं।",
        },
        {
          heading: "अपनी पर्सनल लोन पात्रता जांचें",
          text: "अपनी प्रोफाइल और पात्रता के आधार पर उपलब्ध पर्सनल लोन विकल्प देखें।\n\nलोन की राशि, ब्याज दर, अवधि, प्रोसेसिंग फीस, मंजूरी और राशि का वितरण ऋणदाता की शर्तों, क्रेडिट मूल्यांकन और पात्रता मानदंडों पर निर्भर करता है।\n\nउपलब्ध ऑफर चुनें और आगे की जानकारी देखें।",
        },
        {
          heading: "आवेदन कैसे करें",
          text: "Continue बटन पर क्लिक करें।\n\nउपलब्ध लोन या वित्तीय ऑफर देखें।\n\nअपनी आवश्यकता के अनुसार उपयुक्त ऑफर चुनें।\n\nब्याज दर, फीस, अवधि और पुनर्भुगतान की शर्तें ध्यान से पढ़ें।\n\nऋणदाता की आवेदन और सत्यापन प्रक्रिया पूरी करें।\n\nमंजूरी ऋणदाता की पात्रता और क्रेडिट जांच के अधीन है।\n\nनोट: लोन की मंजूरी और राशि का वितरण सुनिश्चित नहीं है। ब्याज दर, लोन राशि, प्रोसेसिंग फीस और पुनर्भुगतान की शर्तें ऋणदाता तथा आवेदक की प्रोफाइल के अनुसार अलग-अलग हो सकती हैं।",
        },
        {
          heading: "लोन लेने से पहले इन बातों की जांच करें",
          text: "पर्सनल लोन के लिए आवेदन करने से पहले वार्षिक ब्याज दर, प्रोसेसिंग शुल्क, लोन अवधि, मासिक EMI, लेट पेमेंट शुल्क और अन्य लागू नियमों को ध्यान से समझें।\n\nकेवल उतनी ही राशि उधार लें, जिसे आप आसानी से चुका सकें।",
        },
        {
          heading: "डिजिटल सुरक्षा",
          text: "हमेशा विश्वसनीय ऋणदाता और सुरक्षित वेबसाइट के माध्यम से ही आवेदन करें। अपना OTP, UPI PIN, कार्ड PIN या बैंकिंग पासवर्ड किसी अनजान व्यक्ति के साथ साझा न करें।\n\nऑफर स्वीकार करने से पहले ऋणदाता की पहचान सत्यापित करें और लोन एग्रीमेंट को ध्यान से पढ़ें।",
        },
        {
          heading: "जिम्मेदारी से लोन लें",
          text: "पर्सनल लोन योजनाबद्ध या अचानक आने वाले खर्चों को संभालने में मदद कर सकता है, लेकिन इसकी EMI आपके मासिक बजट के अनुसार होनी चाहिए।\n\nनिर्णय लेने से पहले अलग-अलग ऑफर की तुलना करें और कुल चुकाई जाने वाली राशि को अच्छी तरह समझें।",
        },
        {
          heading: "अक्सर पूछे जाने वाले सवाल",
          text: "",
          faqs: [
            {
              question: "क्या मैं पर्सनल लोन के लिए ऑनलाइन आवेदन कर सकता हूं?",
              answer: "हां। कई ऋणदाता ऑनलाइन पर्सनल लोन आवेदन की सुविधा देते हैं। पात्रता और उपलब्धता संबंधित ऋणदाता की शर्तों पर निर्भर करती है।"
            },
            {
              question: "मुझे कितना लोन मिल सकता है?",
              answer: "पात्र लोन राशि आपकी आय, क्रेडिट हिस्ट्री, मौजूदा वित्तीय दायित्वों और ऋणदाता की नीतियों पर निर्भर करती है।"
            },
            {
              question: "क्या लोन की मंजूरी निश्चित है?",
              answer: "नहीं। प्रत्येक आवेदन पात्रता जांच, दस्तावेज़ सत्यापन और ऋणदाता की मंजूरी के अधीन होता है।"
            },
            {
              question: "किन दस्तावेज़ों की आवश्यकता हो सकती है?",
              answer: "ऋणदाता पहचान प्रमाण, पता प्रमाण, आय से संबंधित दस्तावेज़, बैंक स्टेटमेंट या अन्य सत्यापन दस्तावेज़ मांग सकता है।"
            }
          ]
        },
        {
          heading: "अस्वीकरण",
          text: "इस वेबसाइट पर दी गई जानकारी केवल सामान्य जानकारी के उद्देश्य से है। इसे वित्तीय सलाह या लोन मिलने की गारंटी नहीं माना जाना चाहिए।\n\nलोन की मंजूरी, लोन राशि, ब्याज दर, प्रोसेसिंग शुल्क, अवधि और राशि का वितरण पूरी तरह संबंधित ऋणदाता द्वारा पात्रता और क्रेडिट मूल्यांकन के आधार पर निर्धारित किया जाता है।\n\nकिसी भी वित्तीय उत्पाद को स्वीकार करने से पहले उपयोगकर्ताओं को सभी नियम और शर्तें ध्यान से पढ़नी चाहिए।\n\nविज्ञापन संबंधी खुलासा: यह वेबसाइट थर्ड-पार्टी वित्तीय सेवा प्रदाताओं के प्रायोजित विज्ञापन या प्रमोशनल ऑफर दिखा सकती है। उपयोगकर्ताओं द्वारा कुछ विज्ञापनों या ऑफर के साथ इंटरैक्ट करने पर हमें मुआवजा या कमीशन प्राप्त हो सकता है।",
        },
      ],
    },
  },
  // {
  //   id: "airtel-free-recharge-plan-claim-your-unlimited-data-today",
  //   title: "Free Rewards Program: Earn Mobile Recharge via Offers",
  //   category: "",
  //   categoryName: "Customer Management",
  //   date: "May 07, 2026",
  //   author: "Lead Management Center",
  //   excerpt: "Learn how free digital rewards and mobile recharge offers work.",
  //   imageFile: "00011.webp",
  //   content: {
  //     sections: [
  //       {
  //         heading: "Airtel Special Offers 2026",
  //         text: "Discover the latest Airtel promotional offers and rewards programs available in 2026.",
  //       },
  //       {
  //         heading: "Free Recharge",
  //         text: "Learn about legitimate free recharge programs through partner offers and promotional campaigns.",
  //       },
  //       {
  //         heading: "Top Ways to Get Rewards",
  //         text: "Explore various methods to earn rewards through surveys, offers, and promotional activities.",
  //       },
  //       {
  //         heading: "Digital Safety & Best Practices",
  //         text: "Stay safe online while participating in reward programs and promotional offers.",
  //       },
  //       {
  //         heading: "Value for Money",
  //         text: "Understand how reward programs can provide value when used responsibly.",
  //       },
  //     ],
  //   },
  // },
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
  image: blogImages["../assets/images/" + imageFile],
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
