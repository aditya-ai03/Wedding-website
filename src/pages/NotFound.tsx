import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

import WeddingFooter from "@/components/WeddingFooter";
import WeddingHeader from "@/components/WeddingHeader";
import MobilePageWrapper from "@/components/MobilePageWrapper";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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
          <WeddingHeader activeNav="Home" useTopLogo={true} />

          <div className="px-6 py-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
            <p className="mb-6 text-lg text-muted-foreground">Oops! Page not found</p>
            <a href="/" className="text-primary underline hover:text-primary/90">
              Return to Home
            </a>
          </div>

          <WeddingFooter />
        </motion.div>
      </MobilePageWrapper>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
