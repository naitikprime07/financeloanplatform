import { NavLink, useParams } from 'react-router-dom';
import { categories, getBlogPost } from '../data/blogData';
import './Sidebar.css';

const CategoryArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Sidebar = () => {
  const { slug: blogSlug } = useParams();
  const currentBlog = blogSlug ? getBlogPost(blogSlug) : null;
  const currentBlogCategory = currentBlog?.category || '';

  return (
    <aside className="sidebar" aria-label="Category navigation">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <nav className="category-list">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `category-item${isActive ? ' active' : ''}`}
          >
            <span>Home</span>
            <CategoryArrow />
          </NavLink>
          {categories.map((category) => {
            const matchesBlogCategory = currentBlogCategory === category.slug;
            return (
              <NavLink
                key={category.id}
                to={`/category/${category.slug}`}
                aria-current={matchesBlogCategory ? 'page' : undefined}
                className={({ isActive }) =>
                  `category-item${isActive || matchesBlogCategory ? ' active' : ''}`
                }
              >
                <span>{category.name}</span>
                <CategoryArrow />
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;