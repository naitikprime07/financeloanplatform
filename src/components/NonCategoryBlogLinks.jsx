import { Link } from "react-router-dom";
import { blogPosts, getBlogLanguage, orderBlogsByPriority } from "../data/blogData";
import { getCurrentBlog } from "../config/siteConfig";
import "./NonCategoryBlogLinks.css";

import personalLoanBtn from "../assets/buttons/personalLoan.svg";
import aadhaarLoanBtn from "../assets/buttons/aadharPeLoan.svg";
import carLoanBtn from "../assets/buttons/carLoan.svg";
import goldLoanBtn from "../assets/buttons/goldLoan.svg";
import studentLoanBtn from "../assets/buttons/studentLoan.svg";
import homeLoanBtn from "../assets/buttons/homeLoan.svg";
import ePersonalLoanBtn from "../assets/buttons/e_personalLoan.svg";
import eAadhaarLoanBtn from "../assets/buttons/e_aadharPeLoan.svg";
import eCarLoanBtn from "../assets/buttons/e_carLoan.svg";
import eGoldLoanBtn from "../assets/buttons/e_goldLoan.svg";
import eStudentLoanBtn from "../assets/buttons/e_studentLoan.svg";
import eHomeLoanBtn from "../assets/buttons/e_homeLoan.svg";

const buttonMap = {
  "personal-loan-online-eligibility-check-apply": personalLoanBtn,
  "aadhaarpe-loan-online-eligibility-check-apply": aadhaarLoanBtn,
  "car-loan-check-offers-apply-online": carLoanBtn,
  "gold-loan-check-offers-apply-online": goldLoanBtn,
  "student-loan-education-finance-options": studentLoanBtn,
  "home-loan-housing-finance-options": homeLoanBtn,
  "personal-loan-online-check-eligibility-apply": ePersonalLoanBtn,
  "aadhaarpe-loan-online-check-eligibility-apply": eAadhaarLoanBtn,
  "car-loan-explore-financing-next-car": eCarLoanBtn,
  "gold-loan-explore-options-against-gold": eGoldLoanBtn,
  "student-loan-explore-education-financing": eStudentLoanBtn,
  "home-loan-explore-financing-dream-home": eHomeLoanBtn,
};

const NonCategoryBlogLinks = ({
  currentPostId,
  onGuideClick,
  rewardStatus,
  activeTargetSlug,
}) => {
  const aadhaarBlogs = [
    "aadhaarpe-loan-online-eligibility-check-apply", // Hindi
    "aadhaarpe-loan-online-check-eligibility-apply"  // English
  ];

  if (!aadhaarBlogs.includes(currentPostId)) return null;

  const currentPost = blogPosts.find((post) => post.id === currentPostId);
  const currentLanguage = getBlogLanguage(currentPost);
  const posts = orderBlogsByPriority(blogPosts.filter(
    (post) =>
      !post.category &&
      post.id !== currentPostId &&
      getBlogLanguage(post) === currentLanguage,
  ), getCurrentBlog());

  if (!posts.length) return null;

  const unavailable = rewardStatus === "failed";
  const disabled = Boolean(onGuideClick) && !unavailable && rewardStatus !== "ready";

  const handleClick = (event, postId) => {
    if (!onGuideClick) return;
    event.preventDefault();
    if (disabled) return;
    onGuideClick(postId);
  };

  return (
    <nav className="non-category-blog-nav" aria-label="Loan guides">
      <div className="non-category-blog-grid">
        {posts.map((post) => {
          const isActive = activeTargetSlug === post.id;
          return (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className={`non-category-blog-card${disabled ? " is-disabled" : ""}${isActive ? " is-active" : ""}`}
              onClick={(event) => handleClick(event, post.id)}
              aria-disabled={disabled}
              aria-busy={isActive}
              tabIndex={disabled ? -1 : undefined}
            >
              <img src={buttonMap[post.id]} alt={post.categoryName} loading="lazy" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NonCategoryBlogLinks;
