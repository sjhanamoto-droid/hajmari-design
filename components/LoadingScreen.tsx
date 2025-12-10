import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 2.5, duration: 0.8 } }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-[0.2em] text-brand-dark">
          SJ
        </h1>
        <div className="w-12 h-[1px] bg-brand-accent mx-auto my-4"></div>
        <p className="text-xs tracking-widest text-gray-500 uppercase">
          Design & Photography
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;