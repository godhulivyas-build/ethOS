"use client";
// Trigger Vercel redeployment with premium animation updates
import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import AnoAI from "@/components/ui/animated-shader-background";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"2nd Year" | "3rd Year" | "Final Year" | "Startups">("2nd Year");

  const cardsData = {
    "2nd Year": [
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Zepto",
        description: "Frontend Development Intern",
        date: "Score: 93/100",
        className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Groww",
        description: "Product Operations Intern",
        date: "Score: 90/100",
        className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Cashfree Payments",
        description: "Software Engineering Intern",
        date: "Score: 92/100",
        className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ],
    "3rd Year": [
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Observe.AI",
        description: "AI/ML Research Intern",
        date: "Score: 98/100",
        className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Razorpay",
        description: "Associate PM Intern",
        date: "Score: 96/100",
        className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Decentro",
        description: "Backend Developer Intern",
        date: "Score: 95/100",
        className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ],
    "Final Year": [
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "LlamaIndex",
        description: "AI Software Engineer Intern",
        date: "Score: 97/100",
        className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Clear",
        description: "Software Dev Engineer I",
        date: "Score: 94/100",
        className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Drip Capital",
        description: "Risk Analyst Intern",
        date: "Score: 91/100",
        className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ],
    "Startups": [
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Dub.co",
        description: "SaaS Full-Stack Intern",
        date: "Score: 99/100",
        className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Loops.so",
        description: "Growth & Analytics Intern",
        date: "Score: 98/100",
        className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      },
      {
        icon: <Sparkles className="size-4 text-accent" />,
        title: "Peerlist",
        description: "Founder's Office Intern",
        date: "Score: 92/100",
        className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
      },
    ]
  };

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed relative">
      {/* Animated WebGL Shader Background for the whole website */}
      <AnoAI />

      {/* TopNavBar */}
      <header className="w-full flex justify-between items-center px-8 h-20 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-fixed rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-deep-forest text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-ink-charcoal">ethOS</span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-primary-fixed/50 text-deep-forest px-1.5 py-0.5 rounded ml-2 font-bold">early</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-8">
          <a className="text-on-surface-variant hover:text-ink-charcoal text-sm font-semibold transition-colors" href="#features">Features</a>
          <a className="text-on-surface-variant hover:text-ink-charcoal text-sm font-semibold transition-colors" href="#roles">Target Roles</a>
          <a className="text-on-surface-variant hover:text-ink-charcoal text-sm font-semibold transition-colors" href="#sources">Our Sources</a>
        </nav>
        <div>
          <Link href="/dashboard" className="px-5 py-2.5 bg-deep-forest text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-container shadow-sm transition-all">
            Enter App Feed
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full relative overflow-hidden -mt-8 py-4">
        <ContainerScroll
          titleComponent={
            <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
              {/* BackgroundPaths is absolute positioned behind the title components */}
              <div className="absolute inset-0 -z-10 pointer-events-none scale-[1.3] -translate-y-8">
                <BackgroundPaths title="" />
              </div>

              {/* Pulsing Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low/90 border border-outline-variant/30 text-on-surface-variant text-xs font-semibold mb-6 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-ethereal-purple animate-pulse"></span>
                20 Genuine Pre-Vetted Opportunities Daily
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-6">
                Startup internships, <br/>
                <span className="text-deep-forest">intelligence powered.</span>
              </h1>
              
              <p className="text-sm md:text-base text-on-surface-variant mb-8 max-w-2xl leading-relaxed">
                The curated discovery engine built exclusively for students, freshers, and early-careers. Zero agency spam. Dynamic Quality Scoring (0-100), customized resume keywords, and standout portfolio project blueprints.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8 max-w-md">
                <Link href="/dashboard" className="px-8 py-3.5 bg-deep-forest text-on-primary text-sm font-bold rounded-lg hover:bg-primary-container shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  Explore Opportunities Feed
                  <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                </Link>
                <a href="#features" className="px-8 py-3.5 bg-white/80 border border-outline-variant text-ink-charcoal text-sm font-semibold rounded-lg hover:bg-surface-container-low transition-all backdrop-blur-sm">
                  See how it works
                </a>
              </div>
            </div>
          }
        >
          {/* Mock representation of the Internship Dashboard Feed */}
          <div className="h-full w-full bg-slate-900 text-slate-100 font-sans text-[11px] select-none flex flex-col">
            <div className="flex h-full w-full">
              {/* Sidebar */}
              <div className="w-40 bg-slate-950 border-r border-slate-800/80 p-3.5 flex flex-col gap-5 shrink-0 text-left">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-5 h-5 bg-teal-500 rounded flex items-center justify-center text-slate-950 font-bold text-xs">e</div>
                  <span className="font-bold text-slate-200 text-xs">ethOS</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 border-l-2 border-teal-500 text-teal-400 font-semibold rounded-r">
                    <span className="material-symbols-outlined text-[14px]">feed</span>
                    <span>Feed</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-[14px]">summarize</span>
                    <span>Digests</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-[14px]">bar_chart</span>
                    <span>Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 font-medium">
                    <span className="material-symbols-outlined text-[14px]">settings</span>
                    <span>Settings</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-grow flex flex-col h-full bg-slate-900/50">
                {/* Top Header */}
                <div className="h-12 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 bg-slate-950/40">
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded-md w-56 text-left">
                    <span className="material-symbols-outlined text-slate-500 text-[12px]">search</span>
                    <span className="text-slate-500 text-[10px]">Search startups, roles, skills...</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="px-2 py-1 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded text-[10px] flex items-center gap-1 shadow">
                      <span className="material-symbols-outlined text-[12px]">sync</span>
                      <span>Sync Ingestion</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-teal-400 text-[9px]">GV</div>
                  </div>
                </div>

                {/* Content Pane */}
                <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden text-left">
                  <div className="flex gap-1.5">
                    {["All", "Tech / Software", "Product Management", "AI & Data"].map((cat, idx) => (
                      <span key={idx} className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold border ${idx === 0 ? "bg-teal-500/10 text-teal-400 border-teal-500/20" : "bg-transparent text-slate-400 border-slate-800"}`}>
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
                    {/* Mock Job 1 */}
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-teal-500/30 transition-all">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-slate-200 text-[10px] truncate">AI Research Intern</h4>
                          <span className="bg-teal-950 text-teal-400 border border-teal-500/20 px-1 py-0.2 rounded font-mono text-[8px] font-bold shrink-0">Score 98</span>
                        </div>
                        <p className="text-slate-400 text-[9px] mt-0.5">Observe.AI · Bangalore / Remote</p>
                        <p className="text-slate-400 text-[9px] line-clamp-2 mt-1.5 leading-relaxed">
                          Help build state-of-the-art contact center AI models. Work directly with NLP scientists.
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-900/60">
                        <span className="text-[9px] text-slate-500">₹40k-60k / Mo</span>
                        <span className="text-teal-400 font-bold text-[9px] flex items-center gap-0.5">Apply →</span>
                      </div>
                    </div>

                    {/* Mock Job 2 */}
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-teal-500/30 transition-all">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-slate-200 text-[10px] truncate">SaaS Full-Stack Engineer</h4>
                          <span className="bg-teal-950 text-teal-400 border border-teal-500/20 px-1 py-0.2 rounded font-mono text-[8px] font-bold shrink-0">Score 99</span>
                        </div>
                        <p className="text-slate-400 text-[9px] mt-0.5">Dub.co · Remote</p>
                        <p className="text-slate-400 text-[9px] line-clamp-2 mt-1.5 leading-relaxed">
                          Join link infrastructure startup. Work on Next.js, Vercel edge functions, Redis.
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-900/60">
                        <span className="text-[9px] text-slate-500">Paid Internship</span>
                        <span className="text-teal-400 font-bold text-[9px] flex items-center gap-0.5">Apply →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>

        {/* Interactive Bifurcation Section */}
        <div className="w-full max-w-5xl px-6 py-6 border border-outline-variant/30 rounded-3xl bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm relative overflow-hidden -mt-12 mb-8">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/20 to-transparent pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-left relative z-10">
            {/* Left Column: Interactive Tab selection */}
            <div className="flex-grow flex flex-col gap-6 relative z-10 w-full md:w-1/2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-deep-forest font-mono">Curated Tracks</span>
                <h3 className="text-2xl font-bold text-ink-charcoal mt-1.5">Bifurcated Opportunities</h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed max-w-sm">
                  Get pre-vetted startup roles tailored to your exact milestone, bypassing irrelevant senior job board spam.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {(["2nd Year", "3rd Year", "Final Year", "Startups"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between border cursor-pointer ${
                      activeTab === tab
                        ? 'bg-primary-fixed/40 text-deep-forest border-primary-fixed/60 font-bold shadow-sm'
                        : 'bg-transparent text-on-surface-variant hover:text-ink-charcoal border-transparent hover:bg-surface-container-low/50'
                    }`}
                  >
                    <span>
                      {tab === "2nd Year" && "🎓 2nd Year Internships"}
                      {tab === "3rd Year" && "🚀 3rd Year Internships"}
                      {tab === "Final Year" && "🏆 Final Year / Freshers"}
                      {tab === "Startups" && "⚡ High-Growth Startups"}
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {activeTab === tab ? 'arrow_right_alt' : 'chevron_right'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: DisplayCards Stack */}
            <div className="flex-shrink-0 flex items-center justify-center min-h-[300px] w-full md:w-[24rem] relative z-10">
              <div className="scale-90 sm:scale-100 transition-all duration-500">
                <DisplayCards cards={cardsData[activeTab]} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Core Features list */}
      <section id="features" className="py-16 bg-surface-container-low border-t border-outline-variant/30 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-deep-forest font-mono">Core Advantages</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Engineered to bypass job board noise</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-fixed hover:-translate-y-1 transition-all flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed/30 border border-primary-fixed/50 text-deep-forest flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h3 className="text-lg font-bold text-ink-charcoal">100% Pre-Vetted Feed</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">No staffing agencies, no generic aggregators, and absolutely no roles requiring 3+ years experience. Only genuine startup opportunities.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-fixed hover:-translate-y-1 transition-all flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed/30 border border-primary-fixed/50 text-deep-forest flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <h3 className="text-lg font-bold text-ink-charcoal">AI Standout Toolkit</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Every internship is enriched with tailored technical portfolio project blueprints, exact resume keyword modifiers, and ATS keyword targets.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-fixed hover:-translate-y-1 transition-all flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed/30 border border-primary-fixed/50 text-deep-forest flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
              </div>
              <h3 className="text-lg font-bold text-ink-charcoal">Quality Scoring (0-100)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Dynamically graded based on startup funding stage, paid vs unpaid status, remote flexibility, fresher-friendliness, and active recruiter signals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Roles section */}
      <section id="roles" className="py-16 bg-surface px-8 border-t border-outline-variant/30">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-deep-forest font-mono">Target Roles</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 leading-tight">Focusing on high-leverage early careers</h2>
            <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
              Unlike generic job boards displaying hundreds of senior postings, we specialize explicitly in internship and freshers-entry points across the modern startup ecosystem.
            </p>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            {[
              "Product Management", "AI & Machine Learning", "Founder's Office", 
              "Business Operations", "Data Analytics", "Growth Marketing", 
              "Community Manager", "Startup Generalist"
            ].map((role, idx) => (
              <div key={idx} className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-deep-forest shrink-0"></span>
                <span className="text-xs font-bold text-ink-charcoal">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Sources */}
      <section id="sources" className="py-12 bg-surface-container-low/40 border-t border-outline-variant/30 px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/80 font-mono">Ingestion Sources</span>
          <h4 className="text-sm font-semibold text-on-surface-variant mt-2">Aggregating hourly updates across premium networks</h4>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-6 text-on-surface-variant/70 text-xs font-mono font-bold">
            <span>WELLFOUND</span>
            <span>Y COMBINATOR JOBS</span>
            <span>LINKEDIN APIS</span>
            <span>CURVETTE</span>
            <span>INTERNSHALA</span>
            <span>OFFICIAL CAREERS PORTALS</span>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant bg-surface-container-lowest mt-auto">
        <p>© 2026 ethOS Internship Intelligence Engine. Built for quality career builders.</p>
      </footer>
    </div>
  );
}
