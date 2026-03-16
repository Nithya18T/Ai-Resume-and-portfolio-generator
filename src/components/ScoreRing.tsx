import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  size?: number;
  label?: string;
  color?: "primary" | "accent" | "warning";
}

export function ScoreRing({ score, size = 120, label, color = "primary" }: ScoreRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colorMap = {
    primary: "stroke-primary",
    accent: "stroke-accent",
    warning: "stroke-warning",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={6}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={colorMap[color]}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-display font-bold text-foreground">{score}%</span>
      </div>
      {label && <span className="text-sm text-muted-foreground font-medium">{label}</span>}
    </div>
  );
}
