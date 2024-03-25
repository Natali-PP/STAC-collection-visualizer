// Layout.js
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };

    const handleComplete = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <motion.div
      key={router.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative  overflow-hidden"
    >
      {children}
      {isAnimating && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default Layout;
