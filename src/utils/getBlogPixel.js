import BLOG_PIXELS from "../config/blogPixels";

export const getBlogPixelConfig = (blog) => {
  try {
    const key = blog?.pixelKey || blog?.category || blog?.slug;
    if (!key) return null;

    const config = BLOG_PIXELS[key];
    if (!config?.enabled || !config.pixelId) return null;
    return config;
  } catch {
    return null;
  }
};

const getBlogPixel = (blog) => getBlogPixelConfig(blog)?.pixelId || null;

export default getBlogPixel;