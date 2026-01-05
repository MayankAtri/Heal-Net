import { motion } from 'framer-motion';
import { memo } from 'react';

// Optimized page transition with reduced animations for better performance
const PageTransition = memo(({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -10,
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.3,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';

export default PageTransition;
