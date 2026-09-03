import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import "./NonCategoryBlogLinks.css";

import personalLoanBtn from "../assets/buttons/personalLoan.svg";
import aadhaarLoanBtn from "../assets/buttons/aadharPeLoan.svg";
import carLoanBtn from "../assets/buttons/carLoan.svg";
import goldLoanBtn from "../assets/buttons/goldLoan.svg";
import studentLoanBtn from "../assets/buttons/studentLoan.svg";
import homeLoanBtn from "../assets/buttons/homeLoan.svg";

const buttonMap = {
  "personal-loan-online-eligibility-check-apply": personalLoanBtn,
  "aadhaarpe-loan-online-eligibility-check-apply": aadhaarLoanBtn,
  "car-loan-check-offers-apply-online": carLoanBtn,
  "gold-loan-check-offers-apply-online": goldLoanBtn,
  "student-loan-education-finance-options": studentLoanBtn,
  "home-loan-housing-finance-options": homeLoanBtn,
};

const NonCategoryBlogLinks = ({ currentPostId }) => {
  const posts = blogPosts.filter(
    (post) => !post.category && post.id !== currentPostId,
  );
  if (!posts.length) return null;

  return (
    <nav
      className="non-category-blog-nav"
      aria-labelledby="non-category-blog-title"
    >
      <h3 id="non-category-blog-title" className="non-category-blog-heading">
        More loan guides
      </h3>
      <div className="non-category-blog-grid">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="non-category-blog-card"
          >
            <img
              src={buttonMap[post.id]}
              alt={post.categoryName}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NonCategoryBlogLinks;
