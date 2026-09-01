import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import AdUnit from '../components/AdUnit';
import { getBlogPost, blogPosts } from '../data/blogData';
import { BLOG_VIEW_EVENT_NAME, useBlogViewTracking } from '../tracking';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  useBlogViewTracking(post);

  if (!post) {
    return (
      <div className="container">
        <div className="error">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Finvexa</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Finvexa`} />
        <meta property="og:description" content={post.excerpt} />
        <link rel="canonical" href={`https://finvexa.com/blog/${slug}`} />
        <script type="application/json" data-event-name={BLOG_VIEW_EVENT_NAME}>
          {JSON.stringify({
            event: BLOG_VIEW_EVENT_NAME,
            blog_slug: post.id,
            blog_title: post.title,
            blog_category: post.categoryName || post.category,
          })}
        </script>
      </Helmet>

      <div className="blog-detail-page">
        <div className="container">
          <div className="blog-detail-layout">
            <article className="blog-detail-content">
              <div className="blog-detail-header">
                <div className="blog-category-badge">{post.categoryName}</div>
                <h1 className="blog-detail-title">{post.title}</h1>
                <div className="blog-detail-meta">
                  <span className="blog-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    {post.author}
                  </span>
                  <span className="blog-meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {post.date}
                  </span>
                </div>
              </div>

              <div className="blog-detail-image">
                <img src={post.image} alt={post.title} />
              </div>

              <AdUnit slot="TOP" />

              <div className="blog-detail-body">
                {post.content.sections.map((section, index) => (
                  <div key={index} className="blog-section">
                    <h2>{section.heading}</h2>
                    {section.heading === 'Free Car Accessories' ? (
                      <div className="special-offer-box">
                        <p className="offer-text">जीतने के लिए Scroll करें 🚗 👇</p>
                        <a
                          href="#claim-reward"
                          className="claim-button"
                          onClick={(e) => e.preventDefault()}
                        >
                          Claim Car Reward 🚗
                        </a>
                        <p className="offer-disclaimer">VIEW T&C CONTINUE</p>
                      </div>
                    ) : (
                      <div className="blog-text">
                        {section.text.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    {index === 1 && <AdUnit slot="MIDDLE_1" />}
                    {index === 3 && <AdUnit slot="MIDDLE_2" />}
                    {index === 5 && <AdUnit slot="MIDDLE_3" size="native" />}
                  </div>
                ))}
              </div>

              <AdUnit slot="BOTTOM" />

              {relatedPosts.length > 0 && (
                <div className="trending-section">
                  <h3>Trending Now</h3>
                  <div className="trending-list">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="trending-item">
                        <img src={relatedPost.image} alt={relatedPost.title} />
                        <div className="trending-content">
                          <h4>{relatedPost.title}</h4>
                          <span className="trending-date">{relatedPost.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
            </article>

            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
