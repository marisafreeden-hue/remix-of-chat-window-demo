// Centralized scene configuration — editable from the UI
export interface SceneConfig {
  id: string;
  title: string;
  description: string;
  durationFrames: number;
  /** Editable text fields for this scene */
  texts: { key: string; label: string; value: string }[];
  /** Editable bullet items */
  bullets?: { key: string; label: string; items: string[] }[];
  /** Chat dialogue lines */
  dialogue?: { role: "ai" | "caller" | "agent"; label: string; text: string }[];
  /** Metrics */
  metrics?: { label: string; value: string }[];
}

export const defaultSceneConfigs: SceneConfig[] = [
  {
    id: "opening",
    title: "1. Opening — Meet Rob",
    description: "Introduces Rob and sets up the call center context.",
    durationFrames: 330,
    texts: [
      { key: "headline", label: "Headline", value: "Meet Rob." },
      { key: "sub1", label: "Subtitle Line 1", value: "Call center manager for a multi-location" },
      { key: "sub2", label: "Subtitle Line 2", value: "veterinary clinic with 40 locations across the Midwest." },
      { key: "badge", label: "Badge Text", value: "40 Locations · One Call Center" },
    ],
  },
  {
    id: "problem",
    title: "2. The Problem — Repetitive Calls",
    description: "Shows that 35% of calls are routine and don't need a human.",
    durationFrames: 320,
    texts: [
      { key: "headline1", label: "Headline", value: "Every day, hundreds of calls…" },
      { key: "headline2", label: "Highlight", value: "but 35% are routine." },
      { key: "footer", label: "Footer", value: "Simple requests that don't require a human touch." },
    ],
    bullets: [
      {
        key: "examples",
        label: "Routine Call Examples",
        items: ["Vaccination records", "Schedule nail trim", "Basic inquiries"],
      },
    ],
  },
  {
    id: "contrast",
    title: "3. Emotional Contrast",
    description: "Shifts tone to show urgent moments that need immediate attention.",
    durationFrames: 260,
    texts: [
      { key: "line1", label: "Line 1", value: "Meanwhile, the moments that" },
      { key: "highlight", label: "Highlight", value: "really matter…" },
      { key: "line3", label: "Line 3", value: "need immediate attention." },
      { key: "scenario", label: "Scenario", value: '🐕 "My dog ate chocolate!"' },
      { key: "tagline", label: "Tagline", value: "High-value interactions matter most" },
    ],
  },
  {
    id: "solution",
    title: "4. Business Challenge + Solution",
    description: "Lists pain points then reveals GoEngage Voice as the solution.",
    durationFrames: 380,
    texts: [
      { key: "challenge_title", label: "Challenge Headline", value: "The challenge is real." },
      { key: "solution_pre", label: "Solution Lead-in", value: "So Rob chose" },
      { key: "product_name", label: "Product Name", value: "GoEngage Voice" },
      { key: "tagline", label: "Tagline", value: "AI-Powered Voice Automation" },
      { key: "desc1", label: "Description Line 1", value: "A simple, intelligent inbound voice agent" },
      { key: "desc2", label: "Description Line 2", value: "that connects directly to your CRM." },
    ],
    bullets: [
      {
        key: "challenges",
        label: "Pain Points",
        items: [
          "Hiring more agents is expensive",
          "Driving portal adoption is difficult",
          "Managing licenses adds more cost",
        ],
      },
    ],
  },
  {
    id: "demo_vaccination",
    title: "5. Demo — Vaccination Records",
    description: "Shows a routine call being handled by the AI agent with CRM lookup.",
    durationFrames: 350,
    texts: [],
    dialogue: [
      { role: "ai", label: "AI AGENT", text: "Hi! Thanks for calling Happy Paws Veterinary. How can I help you today?" },
      { role: "caller", label: "CALLER", text: "I need Snowball's vaccination records." },
      { role: "ai", label: "AI AGENT", text: "I found Snowball in your account. I'll email the records to your Gmail. Does that work?" },
      { role: "caller", label: "CALLER", text: "Yes." },
      { role: "ai", label: "AI AGENT", text: "Great — sent! Is there anything else I can help with?" },
    ],
  },
  {
    id: "demo_scheduling",
    title: "6. Demo — Appointment Scheduling",
    description: "Shows the AI agent booking a nail trim appointment.",
    durationFrames: 290,
    texts: [],
    dialogue: [
      { role: "caller", label: "CALLER", text: "I want to book a nail trim." },
      { role: "ai", label: "AI AGENT", text: "The next available appointment is tomorrow at 2 PM. Should I book it?" },
      { role: "caller", label: "CALLER", text: "Yes." },
      { role: "ai", label: "AI AGENT", text: "You're all set! You'll receive a confirmation text shortly." },
    ],
  },
  {
    id: "transfer",
    title: "7. Demo — Emergency Transfer",
    description: "Shows the AI detecting urgency and instantly transferring to a live agent.",
    durationFrames: 320,
    texts: [],
    dialogue: [
      { role: "caller", label: "CALLER", text: "My dog ate chocolate!" },
      { role: "ai", label: "AI AGENT", text: "I'm connecting you to a specialist right away." },
      { role: "agent", label: "JESSICA (LIVE AGENT)", text: "Hi, this is Jessica — let's take care of this." },
    ],
  },
  {
    id: "results",
    title: "8. Results / ROI",
    description: "Displays key performance metrics and business impact.",
    durationFrames: 280,
    texts: [
      { key: "headline", label: "Headline", value: "The Results" },
    ],
    metrics: [
      { label: "Calls Automated", value: "35%" },
      { label: "Agent Workload", value: "↓ 40%" },
      { label: "Response Time", value: "< 2s" },
      { label: "Cost Savings", value: "28%" },
    ],
  },
  {
    id: "closing",
    title: "9. Closing + CTA",
    description: "Warm closing message with the GoEngage Voice brand and tagline.",
    durationFrames: 330,
    texts: [
      { key: "line1", label: "Line 1", value: "Now, Rob's team can focus on" },
      { key: "line2", label: "Line 2", value: "what really matters —" },
      { key: "line3", label: "Line 3", value: "being there when it counts." },
      { key: "brand", label: "Brand Name", value: "GoEngage Voice" },
      { key: "tagline", label: "Tagline", value: "Smarter conversations. Lower costs. Better care." },
    ],
  },
];
