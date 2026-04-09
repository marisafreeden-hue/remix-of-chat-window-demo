import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import goLogo from "@/assets/go-logo.png";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";

interface EndScreenProps {
  visible: boolean;
  onReplay: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ visible, onReplay }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background blur orbs */}
          <div className="absolute inset-0 bg-white">
            <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px]" />
            <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[#1f6eac]/12 blur-[120px]" />
            <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[#38bdcd]/22 blur-[180px]" />
            <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[#38bdcd]/18 blur-[80px]" />
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/15 blur-[140px]" />
            <div className="absolute bottom-[5%] left-[15%] w-[350px] h-[350px] rounded-full bg-[#1f6eac]/8 blur-[100px]" />
            <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/12 blur-[140px]" />
          </div>
          <motion.img
            src={broadvoiceLogo}
            alt="Broadvoice"
            className="h-8 mb-5 relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.img
            src={goLogo}
            alt="Go"
            className="h-14 rounded-lg mb-3 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.h2
            className="text-xl font-bold text-foreground relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            That's AI Analyst
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground mt-1 text-center max-w-sm relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Your contact center data, answered instantly.
          </motion.p>
          <motion.button
            onClick={onReplay}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <RotateCcw className="w-4 h-4" />
            Replay Demo
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndScreen;
