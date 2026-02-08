import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-8xl font-display font-bold text-stone-200 dark:text-stone-800">404</h1>
        <h2 className="text-2xl font-display font-bold text-stone-900 dark:text-white mt-4 mb-2">Page Not Found</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
