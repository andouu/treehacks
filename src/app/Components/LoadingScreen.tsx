"use client";
import { motion } from "motion/react";
import { LoadingIndicator } from "./LoadingIndicator";

export const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-screen flex flex-col justify-center items-center">
      <LoadingIndicator />
      <motion.span
        className="text-sm text-neutral-400"
        initial={{ display: "none" }}
        animate={{ display: "block" }}
        transition={{ delay: 5 }}
      >
        Sorry! This is taking longer than expected. Please check your
        connection.
      </motion.span>
    </div>
  );
};
