import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import './NonCategoryBlogLinks.css';

const NonCategoryBlogLinks = ({ currentPostId }) => {
  const posts = blogPosts.filter((post) => !post.category && post.id !== currentPostId);
  if (!posts.length) return null;

  return (
    <nav className="non-category-blog-nav" aria-labelledby="non-category-blog-title">
      <h3 id="non-category-blog-title" className="non-category-blog-heading">More loan guides</h3>
      <div className="non-category-blog-grid">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="non-category-blog-card">
            <img src={post.image} alt="" loading="lazy" />
            <span>{post.categoryName}</span>
            <strong>{post.title}</strong>
            <small>Read full guide <span aria-hidden="true">→</span></small>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NonCategoryBlogLinks;
