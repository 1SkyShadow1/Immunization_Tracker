import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "#007bff",
        }}
      />
    </div>
  );
};

export default LoadingScreen;