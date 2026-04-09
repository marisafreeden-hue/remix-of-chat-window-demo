import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import goLogo from "@/assets/go-logo.png";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";

interface IntroScreenProps {
  visible: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Teal blur orb */}
          <div className="absolute -top-[200px] -left-[100px] w-[500px] h-[500px] rounded-full bg-[hsl(180,60%,50%)]/20 blur-[120px]" />
          {/* Purple blur orb */}
          <div className="absolute -bottom-[150px] -right-[100px] w-[600px] h-[600px] rounded-full bg-[hsl(270,60%,55%)]/20 blur-[140px]" />
          {/* Small teal accent */}
          <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] rounded-full bg-[hsl(185,55%,50%)]/15 blur-[80px]" />
          {/* Small purple accent */}
          <div className="absolute bottom-[25%] left-[10%] w-[250px] h-[250px] rounded-full bg-[hsl(280,50%,50%)]/12 blur-[90px]" />
          <motion.img
            src={broadvoiceLogo}
            alt="Broadvoice"
            className="h-10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.img
            src={goLogo}
            alt="Go"
            className="h-16 rounded-lg mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.h1
            className="text-2xl font-bold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            GoEngage Voice
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            Product Preview
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
