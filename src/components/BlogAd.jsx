import AdUnit from "./AdUnit";

const BlogAd = ({ slot, placement, className = "" }) => {
  // Use horizontal ad format for poster placement to match wide image
  const adSize = placement === "poster" ? "blog-horizontal" : "blog-normal";

  return (
    <div className={`blog-ad-frame blog-ad-frame--${placement}`.trim()}>
      <AdUnit
        slot={slot}
        size={adSize}
        className={`blog-normal-ad blog-normal-ad--${placement} ${className}`.trim()}
      />
    </div>
  );
};

export default BlogAd;