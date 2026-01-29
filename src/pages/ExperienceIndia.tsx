import { motion } from 'framer-motion';
import WeddingHeader from '@/components/WeddingHeader';
import WeddingFooter from '@/components/WeddingFooter';
import ExploreIndiaSection from '@/components/ExploreIndiaSection';
import background2 from '@/assets/background_2.png';
import MobilePageWrapper from '@/components/MobilePageWrapper';
import { useIsMobile } from '@/hooks/use-mobile';

const ExperienceIndia = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobilePageWrapper>
        <motion.div
          className="w-[95%] max-w-md overflow-hidden rounded-t-[150px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WeddingHeader activeNav="Experience India" useTopLogo={true} />

          <div className="px-4 md:px-8">
            <ExploreIndiaSection />
          </div>

          <WeddingFooter />
        </motion.div>
      </MobilePageWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex flex-col items-center py-4 px-4 md:px-8">
        {/* Main Card Container */}
        <motion.div
          className="w-[90%] max-w-md mx-auto rounded-t-[150px] overflow-hidden shadow-2xl md:w-full md:max-w-none md:rounded-none md:mt-0 md:pt-10 md:clip-none"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            backgroundImage: `url(${background2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          {/* Header Section */}
          <WeddingHeader activeNav="Experience India" useTopLogo={true} />

          {/* Experience India Section */}
          <div className="px-4 md:px-8">
            <ExploreIndiaSection />
          </div>

          {/* Footer */}
          <WeddingFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceIndia;
