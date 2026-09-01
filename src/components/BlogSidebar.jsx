import { Link } from 'react-router-dom';
import AdUnit from './AdUnit';
import { blogPosts } from '../data/blogData';
import './BlogSidebar.css';

const BlogSidebar = ({ currentPostId }) => {
  const trendingPosts = blogPosts.filter((post) => post.id !== currentPostId).slice(0, 4);
  return <aside className="blog-sidebar" aria-label="Trending articles and advertisement">
    <section className="blog-sidebar-card">
      <div className="blog-sidebar-heading"><span>Popular stories</span><h2>Trending Now</h2></div>
      <div className="blog-sidebar-list">{trendingPosts.map((post,index)=><Link key={post.id} to={`/blog/${post.id}`} className="blog-sidebar-item">
        <span className="trending-number">{String(index+1).padStart(2,'0')}</span><img src={post.image} alt="" loading="lazy"/><div><span>{post.categoryName}</span><h3>{post.title}</h3><small>{post.date}</small></div>
      </Link>)}</div>
    </section>
    <div className="blog-sidebar-ad"><AdUnit slot="BLOG_SIDEBAR"/></div>
  </aside>;
};
export default BlogSidebar;
