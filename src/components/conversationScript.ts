import { RichContent } from "./ChatMessage";

export interface ScriptStep {
  type: "pause" | "user" | "ai";
  content?: RichContent[];
  /** ms typing indicator for AI, or hold time for pause */
  delay: number;
  /** ms per character for user typing (default 60) */
  typingSpeed?: number;
  /** ms to hold after this AI message before next step (replaces click-to-advance) */
  holdAfter?: number;
}

const conversationScript: ScriptStep[] = [
  // — Emma slide: 20s (audio plays during this)
  { type: "pause", delay: 20000 },

  // — Dashboard visible ~23s–35s = 12s
  { type: "pause", delay: 12000 },

  // — Cluttered tabs ~35s–46s = 11s (narrator talks about too many tabs, multitasking)
  { type: "pause", delay: 14000 },

  // — Welcome screen ~46s–53s = 7s (narrator: "That's where AI Analyst... start with a question")
  { type: "pause", delay: 12000 },

  // — Act 1: User types "How has today been going so far?" ~53s–57s (4s, 31 chars → ~130ms/char)
  {
    type: "user",
    content: [{ type: "text", value: "How has today been going so far?" }],
    delay: 0,
    typingSpeed: 130,
  },
  // AI typing ~57s–61s (4s), response visible ~61s, hold until ~73s (12s)
  {
    type: "ai",
    content: [
      {
        type: "text",
        value:
          "Here's a summary of today's call activity so far:\n\n• **Total Calls:** 1,847\n• **Answered:** 1,643\n• **Abandoned:** 128\n• **Answer Rate:** 89%\n• **Avg Handle Time:** 5 min 26 sec\n• **CSAT (live):** 4.3/5\n\nThe Billing queue saw a brief spike around 11am — handle times jumped to 7 minutes before settling back down. Worth watching if it recurs this afternoon.\n\nOverall, you're in good shape heading into the second half of the day.",
      },
    ],
    delay: 4000,
    holdAfter: 12000,
  },

  // — Act 2: User types "Where is most of today's call volume coming from?" ~73s–80s (7s, 49 chars → ~140ms/char)
  {
    type: "user",
    content: [{ type: "text", value: "Where is most of today's call volume coming from?" }],
    delay: 0,
    typingSpeed: 140,
  },
  // AI typing ~80s–84s (4s), response visible ~84s, hold until ~94s (10s)
  {
    type: "ai",
    content: [
      {
        type: "text",
        value:
          "Here's the breakdown of today's call volume by source:\n\n• **Outbound:** 851 calls (46%)\n• **Internal:** 462 calls (25%)\n• **Inbound:** 332 calls (18%)\n• **Transfers:** 202 calls (11%)\n\nThe outbound spike is largely driven by the Q1 retention campaign — that team has been running at high capacity since Monday.\n\nAs more data comes in this afternoon, I can break this down further by specific queues, campaigns, or agent groups. Just ask!",
      },
    ],
    delay: 4000,
    holdAfter: 7000,
  },

  // — Act 3: User types "Summarize this week's performance." ~94s–100s (6s, 34 chars → ~175ms/char)
  {
    type: "user",
    content: [{ type: "text", value: "Summarize this week's performance." }],
    delay: 0,
    typingSpeed: 175,
  },
  // AI typing ~100s–105s (5s), response part 1 at ~105s
  {
    type: "ai",
    content: [
      {
        type: "text",
        value:
          "Here's the big picture for this week:\n\n• **Total Calls:** 8,412 (+11% vs last week)\n• **Average Answer Rate:** 87.6% (-1.4% vs target)\n• **Average Handle Time:** 5 min 48 seconds (+22s vs last week)\n• **Weekly CSAT:** 4.1/5 (Stable)",
      },
    ],
    delay: 5000,
  },
  // AI continuation part 2 ~108s, hold until ~126s (end of narration) then summary
  {
    type: "ai",
    content: [
      {
        type: "text",
        value:
          "**Key Highlights:**\n\n• 📈 **Q1 Retention Campaign:** Driving +34% outbound volume with high contact rates\n• ⚠️ **Billing Queue:** Answer rate dropped to 74%, below 85% SLA — needs attention\n• ✅ **Sales Team:** Best performing queue at 93% answer rate\n• 📉 **Handle Time:** Up 22 seconds, linked to new product questions\n• 👥 **Staffing:** 2 agents returned from leave Wednesday, capacity improving\n\nThe main area to watch is the Billing queue — it's the only group consistently below SLA this week. Everything else is healthy.\n\nInstead of reviewing multiple daily reports, you now have the full picture in one conversation. Want me to dig into any of these areas?",
      },
    ],
    delay: 3000,
    holdAfter: 14000,
  },
];

export default conversationScript;
