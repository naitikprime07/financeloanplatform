const BLOG_PIXELS = {
  "personal-loan": {
    pixelId: (import.meta.env.VITE_PIXEL_PERSONAL_LOAN_ID || "").trim(),
    enabled: true,
    events: ["PageView"],
  },
};

export default BLOG_PIXELS;