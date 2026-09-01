import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BlogCard from '../components/BlogCard';
import Sidebar from '../components/Sidebar';
import AdUnit from '../components/AdUnit';
import { getBlogsByCategory, getCategoryBySlug } from '../data/blogData';
import './Category.css';

const Category = () => {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return (
      <div className="container">
        <div className="error">
          <h1>Category Not Found</h1>
          <p>The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const posts = getBlogsByCategory(category.id);

  return (
    <>
      <Helmet>
        <title>{category.name} | Finvexa</title>
        <meta name="description" content={`Explore ${category.name} articles on Finvexa. Latest news, insights, and expert guides.`} />
        <link rel="canonical" href={`https://finvexa.com/category/${categorySlug}`} />
      </Helmet>

      <div className="category-page">
        <div className="container">
          <AdUnit slot="TOP" />

          <div className="category-layout">
            <div className="main-content-area">
              <h1 className="page-title">{category.name}</h1>

              {posts.length > 0 ? (
                <>
                  <div className="blog-grid">
                    {posts.slice(0, 3).map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {posts.length > 3 && <AdUnit slot="MIDDLE_1" />}

                  <div className="blog-grid">
                    {posts.slice(3).map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-posts">
                  <p>No posts found in this category.</p>
                </div>
              )}

              <AdUnit slot="BOTTOM" />
            </div>

            <Sidebar />
          </div>

          <div className="disclaimer-section">
            <h2>DISCLAIMER</h2>
            <p>
              The information provided on Finvexa is for general informational and educational purposes only. It is not
              a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have regarding a medical condition.
            </p>

            <h2>ADVERTISER DISCLOSURE</h2>
            <p>
              This website is supported by third-party advertising and promotional programs. Some links and rewards mentioned are
              sponsored content from our partners. All participation in external offers is voluntary and subject to the terms of the
              respective providers.
            </p>

            <h2>EDITORIAL NOTE</h2>
            <p>
              While we strive to keep our health tips and blog information accurate and up-to-date, wellness trends and scientific
              research evolve quickly. Details such as eligibility for rewards or specific health benefits should be verified with the original
              source or a certified professional.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
