import { useEffect, useState } from 'react';
import AdUnit from './AdUnit';

const DesktopSideAds = () => {
  const [isWideDesktop, setIsWideDesktop] = useState(
    () => window.matchMedia('(min-width: 1536px)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1536px)');
    const update = () => setIsWideDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  if (!isWideDesktop) return null;

  return (
    <>
      <div className="desktop-side-ad desktop-side-ad-left">
        <AdUnit slot="SIDE_LEFT" size="vertical" />
      </div>
      <div className="desktop-side-ad desktop-side-ad-right">
        <AdUnit slot="SIDE_RIGHT" size="vertical" />
      </div>
    </>
  );
};

export default DesktopSideAds;