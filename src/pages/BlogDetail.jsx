import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogSidebar from "../components/BlogSidebar";
import AdUnit from "../components/AdUnit";
import BlogRewardedAd from "../components/BlogRewardedAd";
import { getBlogPost, blogPosts } from "../data/blogData";
import { BLOG_VIEW_EVENT_NAME, useBlogViewTracking } from "../tracking";
import "./BlogDetail.css";

const renderSectionText = (text) =>
  text.split("\n\n").map((block, index) => {
    const lines = block.split("\n").filter(Boolean);
    if (lines.length > 1)
      return (
        <ul key={index}>
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      );
    return <p key={index}>{block}</p>;
  });

const renderHeadingWithAnimatedEmojis = (heading) => {
  const emojiRegex = /([\p{Emoji_Presentation}\p{Emoji}\uFE0F]+)/gu;
  const parts = heading.split(emojiRegex);
  return parts.map((part, i) => {
    if (emojiRegex.test(part)) {
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: "bounceEmoji 1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

const BlogDetail = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const [copied, setCopied] = useState(false);
  useBlogViewTracking(post);

  const articleIndex = post
    ? blogPosts.findIndex((item) => item.id === post.id)
    : -1;
  const previousPost = articleIndex > 0 ? blogPosts[articleIndex - 1] : null;
  const nextPost =
    articleIndex >= 0 && articleIndex < blogPosts.length - 1
      ? blogPosts[articleIndex + 1]
      : null;
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const sameCategory = blogPosts.filter(
      (item) => item.id !== post.id && item.category === post.category,
    );
    const remaining = blogPosts.filter(
      (item) => item.id !== post.id && !sameCategory.includes(item),
    );
    return [...sameCategory, ...remaining].slice(0, 3);
  }, [post]);

  if (!post)
    return (
      <div className="container">
        <div className="blog-error">
          <span>404</span>
          <h1>Article not found</h1>
          <p>The article may have moved or is no longer available.</p>
          <Link to="/">Return to latest stories</Link>
        </div>
      </div>
    );

  const articleUrl = `${window.location.origin}/blog/${post.id}`;
  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: articleUrl,
        });
      } catch {
        /* User cancelled. */
      }
      return;
    }
    await navigator.clipboard?.writeText(articleUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Finvexa</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Finvexa`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
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
          <AdUnit key={`${post.id}-blog-top`} slot="MIDDLE_1" className="blog-top-ad" />
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            {post.category && (
              <>
                <Link to={`/category/${post.category}`}>
                  {post.categoryName}
                </Link>
                <span>/</span>
              </>
            )}
            <span>{post.title}</span>
          </nav>
          <div className="blog-detail-layout">
            <article className="blog-detail-content">
              <header className="blog-detail-header">
                <Link
                  className="blog-category-badge"
                  to={post.category ? `/category/${post.category}` : "/"}
                >
                  {post.categoryName}
                </Link>
                <h1 className="blog-detail-title">{post.title}</h1>
                <p className="blog-detail-lead">{post.excerpt}</p>
                <div className="blog-detail-meta">
                  <span className="blog-meta-avatar" aria-hidden="true">
                    {post.author.charAt(0)}
                  </span>
                  <span>
                    <strong>{post.author}</strong>
                    <small>Author</small>
                  </span>
                  <span className="meta-divider" />
                  <span>
                    <strong>{post.date}</strong>
                    <small>Published</small>
                  </span>
                  <button
                    type="button"
                    className="share-button"
                    onClick={shareArticle}
                    aria-label="Share this article"
                  >
                    {copied ? "Link copied" : "Share article"}
                  </button>
                </div>
              </header>

              <figure className="blog-detail-image">
                <img
                  src={post.image}
                  alt={post.title}
                  width="1200"
                  height="675"
                  fetchPriority="high"
                />
                <figcaption>{post.title}</figcaption>
              </figure>
              <div className="blog-detail-body"
              >
                {post.content.sections.map((section, index) => (
                  <section key={section.heading} className="blog-section">
                    <h2
                      className={
                        section.heading.includes("Scroll Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š")
                          ? "scroll-heading"
                          : ""
                      }
                    >
                      {section.heading.includes("Scroll Ã Â¤â€¢Ã Â¤Â°Ã Â¥â€¡Ã Â¤â€š")
                        ? renderHeadingWithAnimatedEmojis(section.heading)
                        : section.heading}
                    </h2>
                    {section.text && (
                      <div className="blog-text">
                        {renderSectionText(section.text)}
                      </div>
                    )}
                    {section.details && (
                      <div className="rewards-details">
                        <h3 className="rewards-title">
                          Top Ways to Get Rewards
                        </h3>
                        {section.details.map((item, i) => (
                          <details key={i} className="reward-item">
                            <summary>
                              <strong>{item.title}</strong>
                            </summary>
                            <p>{item.description}</p>
                          </details>
                        ))}
                      </div>
                    )}
                    {section.faqs && (
                      <div className="faq-section">
                        {section.faqs.map((faq, i) => (
                          <details key={i} className="faq-item">
                            <summary>
                              <strong>{faq.question}</strong>
                            </summary>
                            <p>{faq.answer}</p>
                          </details>
                        ))}
                      </div>
                    )}
                    {index === 1 && <BlogRewardedAd key={`rewarded-${post.id}`} post={post} />}
                    {index === 3 && <AdUnit key={`${post.id}-middle-2`} slot="MIDDLE_2" />}
                    {index === 5 && <AdUnit key={`${post.id}-middle-3`} slot="MIDDLE_3" />}
                  </section>
                ))}
              </div>

              <div className="article-tags">
                <span>Topics</span>
                <Link to={post.category ? `/category/${post.category}` : "/"}>
                  {post.categoryName}
                </Link>
                <span>Business insights</span>
                <span>Finvexa guides</span>
              </div>
              <div className="article-share">
                <div>
                  <strong>Was this article helpful?</strong>
                  <p>Share it with someone who may find it useful.</p>
                </div>
                <button type="button" onClick={shareArticle}>
                  {copied ? "Copied!" : "Share"}
                </button>
              </div>
              <nav
                className="article-navigation"
                aria-label="Article navigation"
              >
                {previousPost ? (
                  <Link to={`/blog/${previousPost.id}`}>
                    <small>Previous article</small>
                    <strong>{previousPost.title}</strong>
                  </Link>
                ) : (
                  <span />
                )}
                {nextPost ? (
                  <Link className="next" to={`/blog/${nextPost.id}`}>
                    <small>Next article</small>
                    <strong>{nextPost.title}</strong>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>

              <section className="related-section">
                <div className="section-heading">
                  <div>
                    <span>Keep reading</span>
                    <h2>Recommended for you</h2>
                  </div>
                  <Link to="/">View all articles</Link>
                </div>
                <div className="related-grid">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.id}
                      to={`/blog/${item.id}`}
                      className="related-card"
                    >
                      <img src={item.image} alt="" loading="lazy" />
                      <div>
                        <span>{item.categoryName}</span>
                        <h3>{item.title}</h3>
                        <small>{item.date}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <aside className="article-disclosures">
                <h2>Editorial information</h2>
                <div>
                  <section>
                    <h3>Disclaimer</h3>
                    <p>
                      Finvexa provides general informational and educational
                      content. Verify important financial or business decisions
                      with an appropriately qualified professional.
                    </p>
                  </section>
                  <section>
                    <h3>Advertiser disclosure</h3>
                    <p>
                      This website is supported by advertising. Advertising
                      relationships do not change our commitment to clear,
                      useful editorial content.
                    </p>
                  </section>
                </div>
              </aside>
            </article>
            <BlogSidebar currentPostId={post.id} />
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogDetail;

