import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import envelopeImg from '@/assets/envelope_1.png';
import logoStamp from '@/assets/logo_stamp.png';
import background1 from '@/assets/background_1.png';

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

const EnvelopeAnimation = ({ onComplete }: EnvelopeAnimationProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (!isOpening) {
      setIsOpening(true);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  };

  // Floating hearts positions
  const hearts = [
    { left: '5%', top: '20%', delay: 0, size: 'w-6 h-6' },
    { left: '8%', top: '40%', delay: 0.5, size: 'w-8 h-8' },
    { left: '3%', top: '60%', delay: 1, size: 'w-5 h-5' },
    { left: '10%', top: '75%', delay: 1.5, size: 'w-7 h-7' },
    { left: '6%', top: '55%', delay: 0.8, size: 'w-4 h-4' },
    { left: '12%', top: '30%', delay: 1.2, size: 'w-6 h-6' },
    { left: '2%', top: '85%', delay: 0.3, size: 'w-5 h-5' },
  ];

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center cursor-pointer overflow-hidden"
      style={{
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleClick}
    >
      {/* Floating Hearts on the left */}
      <AnimatePresence>
        {!isOpening && hearts.map((heart, index) => (
          <motion.div
            key={index}
            className={`absolute ${heart.size}`}
            style={{ 
              left: heart.left, 
              top: heart.top,
              color: 'hsl(350, 60%, 75%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              y: [0, -15, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Envelope Container */}
      <div className="relative w-[85vw] max-w-[450px] md:max-w-[500px]" style={{ perspective: '1500px' }}>
        
        {/* Envelope with Flap as single unit */}
        <motion.div
          className="relative w-full"
          animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main envelope body */}
          <img 
            src={envelopeImg} 
            alt="Envelope" 
            className="w-full h-auto"
          />
          
          {/* Wax Seal - positioned on the envelope flap */}
          <motion.div
            className="absolute w-20 h-20 md:w-28 md:h-28 z-30"
            style={{
              top: '30%',
              left: '40%',
              transform: 'translateX(-50%)',
            }}
            animate={isOpening ? {
              scale: [1, 1.3, 0],
              opacity: [1, 1, 0],
              y: [0, -30, -80],
              rotate: [0, 10, -20],
            } : {
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            whileHover={!isOpening ? { 
              scale: 1.15,
            } : {}}
          >
            <motion.img 
              src={logoStamp} 
              alt="Wax Seal" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(180, 140, 60, 0.5))',
              }}
              animate={!isOpening ? {
                filter: [
                  "drop-shadow(0 4px 12px rgba(180, 140, 60, 0.4))",
                  "drop-shadow(0 4px 25px rgba(212, 168, 85, 0.7))",
                  "drop-shadow(0 4px 12px rgba(180, 140, 60, 0.4))",
                ],
              } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Click hint text */}
        <AnimatePresence>
          {!isOpening && (
            <motion.p
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-primary font-lora text-sm tracking-wide whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Click to open
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Fade out overlay */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'hsl(187, 30%, 82%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopeAnimation;
