import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent";
  onClick?: () => void;
}

export function GlassCard({ children, className = "", variant = "default", onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`rounded-lg p-6 ${variant === "accent" ? "glass-card-accent" : "glass-card"} ${className}`}
    >
      {children}
    </motion.div>
  );
}
