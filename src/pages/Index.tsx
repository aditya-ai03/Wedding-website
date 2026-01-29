import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import WeddingHeader from "@/components/WeddingHeader";
import EventsTimeline from "@/components/EventsTimeline";
import WeddingFooter from "@/components/WeddingFooter";
import background2 from "@/assets/background_2.png";
import ganeshIcon from "@/assets/ganesh_icon.png";
import banner from "@/assets/banner_1.png"

const Index = () => {
  const [showEnvelope, setShowEnvelope] = useState(() => {
    return !sessionStorage.getItem("envelopeShown");
  });

  const handleEnvelopeComplete = () => {
    setShowEnvelope(false);
    sessionStorage.setItem("envelopeShown", "true");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showEnvelope ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeAnimation onComplete={handleEnvelopeComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-white"
          >
           <div className="flex flex-col items-center px-4 md:px-8 ">
              {/* BACKGROUND WRAPPER — IMPORTANT */}
              <div
                className="
                  w-full flex justify-center
                  bg-no-repeat bg-top
                  bg-[length:100%_auto]
                  md:bg-cover
                "
                style={{ backgroundImage: `url(${background2})` }}
              >
                {/* CARD CONTENT */}
                <motion.div
                  className="
                    w-[100%] max-w-md
                    overflow-hidden
                    rounded-t-[150px]
                    md:w-full md:max-w-none
                    md:rounded-none md:pt-10
                  "
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                 <div className="md:-mt-48">
                   <WeddingHeader />
                 </div>

                  {/* DATE */}
                  <section className="text-center px-4 md:px-8 py-6">
                    <div className="flex justify-center gap-4 md:gap-16">
                      <img src={banner} alt="" className="md:w-100 md:h-40" />
                    </div>

                    <div className="flex justify-center my-4">
                      <img
                        src={ganeshIcon}
                        alt="Ganesh"
                        className="w-16 h-16 md:w-20 md:h-20 opacity-60"
                      />
                    </div>
                  </section>

                  {/* INTRO */}
                  <section className="px-6 md:px-12 pb-6 text-center">
                    <p className="font-lora text-sm mb-4">
                      As we begin this new chapter of our lives, we’re
                      incredibly grateful to celebrate our wedding in Udaipur
                      with the people who mean the most to us. Your love,
                      blessings, and presence truly mean everything, and we’re
                      honoured to share these moments with you.
                    </p>
                    <p className="font-lora text-sm">
                      We met in October 2023 at a Diwali party, and from there,
                      everything seemed to fall into place. We were civilly
                      married in May 2025, and now, in October 2026, we’re
                      coming together in Udaipur for the grand finale: a
                      celebration with all of you, filled with colour,
                      tradition, and joy.
                    </p>
                  </section>
                  <div className="flex justify-center py-6">
                    <a
                      href="/rsvp"
                      className="btn-rsvp border border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      RSVP
                    </a>
                  </div>

                  {/* EVENTS TIMELINE — NOW INSIDE BACKGROUND */}
                  <EventsTimeline />

                  <WeddingFooter />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
