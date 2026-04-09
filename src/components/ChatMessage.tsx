import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";

export type RichContent =
  | { type: "text"; value: string }
  | { type: "bar-chart"; title: string; data: { name: string; value: number; color?: string }[] }
  | { type: "line-chart"; title: string; data: { name: string; value: number }[] }
  | { type: "area-chart"; title: string; data: { name: string; value: number }[] }
  | { type: "pie-chart"; title: string; data: { name: string; value: number }[] }
  | { type: "table"; title: string; headers: string[]; rows: string[][] }
  | { type: "metric-cards"; cards: { label: string; value: string; change?: string; positive?: boolean }[] }
  | { type: "progress-bars"; title: string; items: { label: string; value: number; target: number }[] };

interface ChatMessageProps {
  role: "ai" | "user";
  content: RichContent[];
  isTyping?: boolean;
}

const CHART_COLORS = [
  "hsl(201, 73%, 42%)",  // #1f6eac
  "hsl(184, 64%, 54%)",  // #38bdcd
];

const RichBlock: React.FC<{ block: RichContent }> = ({ block }) => {
  switch (block.type) {
    case "text": {
      // Simple markdown: **bold** and bullet points
      const rendered = block.value.split('\n').map((line, li) => {
        const parts = line.split(/(\*\*.*?\*\*)/g).map((part, pi) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pi} className="font-semibold">{part.slice(2, -2)}</strong>;
          }
          return <span key={pi}>{part}</span>;
        });
        return (
          <span key={li}>
            {li > 0 && <br />}
            {parts}
          </span>
        );
      });
      return <div className="text-sm leading-relaxed">{rendered}</div>;
    }

    case "metric-cards":
      return (
        <div className="grid grid-cols-2 gap-2.5 my-3">
          {block.cards.map((c, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-muted/50 border border-border/80 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/80 font-semibold">{c.label}</p>
              <p className="text-xl font-extrabold text-foreground leading-tight">{c.value}</p>
              {c.change && (
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.positive ? "bg-emerald-500" : "bg-red-400"}`} />
                  <p className={`text-[11px] font-medium ${c.positive ? "text-emerald-600" : "text-red-500"}`}>
                    {c.change}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "bar-chart":
      return (
        <div className="my-2">
          <p className="text-xs font-semibold text-foreground mb-2">{block.title}</p>
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={block.data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(220,10%,50%)" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(220,10%,50%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {block.data.map((_, i) => (
                    <Cell key={i} fill={block.data[i]?.color || CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case "line-chart":
      return (
        <div className="my-2">
          <p className="text-xs font-semibold text-foreground mb-2">{block.title}</p>
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={block.data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(220,10%,50%)" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(220,10%,50%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3, fill: CHART_COLORS[0] }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case "area-chart":
      return (
        <div className="my-2">
          <p className="text-xs font-semibold text-foreground mb-2">{block.title}</p>
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={block.data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(220,10%,50%)" />
                <YAxis tick={{ fontSize: 9 }} stroke="hsl(220,10%,50%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={2} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case "pie-chart":
      return (
        <div className="my-2">
          <p className="text-xs font-semibold text-foreground mb-2">{block.title}</p>
          <div className="h-36 w-full flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={block.data} dataKey="value" cx="50%" cy="50%" outerRadius={55} innerRadius={30}>
                  {block.data.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1">
              {block.data.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-muted-foreground">{d.name}: {d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "table":
      return (
        <div className="my-2 overflow-x-auto">
          <p className="text-xs font-semibold text-foreground mb-2">{block.title}</p>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left py-1.5 px-2 font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="py-1.5 px-2 text-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "progress-bars":
      return (
        <div className="my-2">
          <p className="text-xs font-semibold text-foreground mb-2">{block.title}</p>
          <div className="space-y-2.5">
            {block.items.map((item, i) => {
              const pct = Math.min((item.value / item.target) * 100, 100);
              const isBelow = item.value < item.target;
              return (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-medium ${isBelow ? "text-red-500" : "text-emerald-600"}`}>
                      {item.value}% / {item.target}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: isBelow ? "hsl(0, 70%, 55%)" : "hsl(160, 50%, 45%)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isTyping }) => {
  if (role === "user") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-md bg-chat-user text-chat-user-text text-sm">
          {content.map((b, i) => b.type === "text" ? <span key={i}>{b.value}</span> : null)}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#1f6eac" }}>
         <Sparkles className="w-4 h-4" />
       </div>
      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md bg-chat-ai border border-border text-sm text-foreground shadow-sm space-y-1">
        {isTyping ? (
          <div className="flex gap-1.5 py-1">
            <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
          </div>
        ) : (
          content.map((block, i) => <RichBlock key={i} block={block} />)
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
