import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex justify-center items-center w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, duration: 1 }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #ddd6fe",
          borderTopColor: "#4c1d95",
          borderRadius: "50%",
        }}
      ></div>
    </motion.div>
  );
};

export default LoadingSpinner;
