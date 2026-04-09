import React from "react";
import { TrendingDown, Users, Clock, Monitor } from "lucide-react";

interface SuggestionCardProps {
  icon: React.ReactNode;
  label: string;
  text: string;
  onClick: (text: string) => void;
}

const iconMap = {
  performance: <TrendingDown className="w-5 h-5 text-accent-foreground" />,
  agents: <Users className="w-5 h-5 text-accent-foreground" />,
  trends: <Clock className="w-5 h-5 text-accent-foreground" />,
  csat: <Monitor className="w-5 h-5 text-accent-foreground" />,
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({ icon, label, text, onClick }) => (
  <button
    onClick={() => onClick(text)}
    className="flex items-start gap-3 w-full p-4 rounded-xl bg-suggestion border border-suggestion-border hover:bg-suggestion-hover hover:border-accent-foreground/20 transition-all duration-200 text-left group"
  >
    <div className="mt-0.5 p-1.5 rounded-lg bg-accent">{icon}</div>
    <div>
      <p className="text-sm font-semibold text-accent-foreground">{label}</p>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  </button>
);

export const suggestions = [
  {
    icon: iconMap.performance,
    label: "Performance",
    text: "Which queue had the lowest % answered yesterday, and why?",
  },
  {
    icon: iconMap.agents,
    label: "Agent Analysis",
    text: "Summarize this week's top 3 underperforming agents based on % answered and CSAT.",
  },
  {
    icon: iconMap.trends,
    label: "Trends",
    text: "Show me average handle time trends for the last 30 days",
  },
  {
    icon: iconMap.csat,
    label: "CSAT",
    text: "What's driving low customer satisfaction in the billing queue?",
  },
];

export default SuggestionCard;
