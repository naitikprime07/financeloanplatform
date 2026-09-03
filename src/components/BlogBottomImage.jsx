import personalLoanImg from '../assets/blogBottomImages/personalLoan.svg';
import aadharPeLoanImg from '../assets/blogBottomImages/aadharPeLoan.svg';
import carLoanImg from '../assets/blogBottomImages/carLoan.svg';
import goldLoanImg from '../assets/blogBottomImages/goldLoan.svg';
import studentLoanImg from '../assets/blogBottomImages/studentLoan.svg';
import homeLoanImg from '../assets/blogBottomImages/homeLoan.svg';
import './BlogBottomImage.css';

const blogImageMap = {
  'personal-loan-online-eligibility-check-apply': personalLoanImg,
  'aadhaarpe-loan-online-eligibility-check-apply': aadharPeLoanImg,
  'car-loan-check-offers-apply-online': carLoanImg,
  'gold-loan-check-offers-apply-online': goldLoanImg,
  'student-loan-education-finance-options': studentLoanImg,
  'home-loan-housing-finance-options': homeLoanImg,
};

const BlogBottomImage = ({ postId, imageRef }) => {
  const imageSrc = blogImageMap[postId];

  if (!imageSrc) {
    return null;
  }

  return (
    <div className="blog-bottom-image">
      <img ref={imageRef} src={imageSrc} alt="Loan information" loading="lazy" />
    </div>
  );
};

export default BlogBottomImage;
