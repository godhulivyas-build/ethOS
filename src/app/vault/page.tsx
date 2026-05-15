"use client";

import { useState } from "react";
import Image from "next/image";

export default function VaultPage() {
  const [ideaText, setIdeaText] = useState("");
  const [isVectorizing, setIsVectorizing] = useState(false);

  const handleVectorize = () => {
    if (!ideaText.trim()) return;
    setIsVectorizing(true);
    // Simulate API call to backend /api/v1/memory/ingest
    setTimeout(() => {
      setIsVectorizing(false);
      setIdeaText("");
    }, 1500);
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="font-display-lg text-display-lg font-semibold tracking-tighter text-on-surface">
          ETHOS
        </div>
        <nav className="hidden md:flex items-center gap-stack-lg">
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">
            Signals
          </a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">
            Alignment
          </a>
          <a className="text-primary font-medium border-b-2 border-primary pb-1 hover:text-primary transition-colors duration-200" href="#">
            Vault
          </a>
        </nav>
        <div className="flex items-center gap-stack-md">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            account_circle
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            settings
          </button>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-lg bg-surface-dim/50 backdrop-blur-2xl border-r border-outline-variant/10 w-[240px] hidden md:flex">
        <div className="px-container-padding mb-stack-lg mt-12">
          <div className="font-label-mono text-label-mono uppercase tracking-widest text-surface-tint">
            OS.01
          </div>
          <div className="font-body-md text-body-md text-outline opacity-60">
            Identity Active
          </div>
        </div>
        <nav className="flex flex-col flex-grow">
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              grid_view
            </span>
            <span className="font-label-mono text-label-mono">
              Dashboard
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              fingerprint
            </span>
            <span className="font-label-mono text-label-mono">
              Identity
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              psychology
            </span>
            <span className="font-label-mono text-label-mono">
              Intelligence
            </span>
          </a>
          <a className="flex items-center gap-4 bg-primary/10 text-primary border-l-2 border-primary px-4 py-3 transition-all" href="#">
            <span className="material-symbols-outlined">
              hub
            </span>
            <span className="font-label-mono text-label-mono">
              Nexus
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              tune
            </span>
            <span className="font-label-mono text-label-mono">
              Settings
            </span>
          </a>
        </nav>
        <div className="px-container-padding mt-auto mb-stack-md">
          <div className="command-k px-3 py-2 rounded-lg flex items-center justify-between text-outline">
            <span className="text-xs font-label-mono">
              Command K
            </span>
            <span className="material-symbols-outlined text-sm">
              keyboard_command_key
            </span>
          </div>
        </div>
        <div className="flex flex-col border-t border-outline-variant/10 pt-4">
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 transition-all" href="#">
            <span className="material-symbols-outlined">
              help_outline
            </span>
            <span className="font-label-mono text-label-mono">
              Support
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 transition-all" href="#">
            <span className="material-symbols-outlined">
              terminal
            </span>
            <span className="font-label-mono text-label-mono">
              Logs
            </span>
          </a>
        </div>
      </aside>

      <div className="flex flex-col w-full min-h-screen">
        {/* Main Content Canvas */}
        <main className="flex-grow pt-24 pb-16 md:pl-[264px] px-container-padding max-w-[1440px] mx-auto w-full">
          {/* Header Section */}
          <header className="mb-stack-md flex flex-col md:flex-row md:items-end justify-between gap-gutter">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-mono text-label-mono text-primary uppercase">
                  Vector Memory — Online
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface">
                Idea Hub (Second Brain)
              </h1>
              <p className="text-on-surface-variant font-body-md mt-2 max-w-lg">
                Drop raw thoughts, meeting notes, or links here. ETHOS will vectorize and map them to your identity architecture for future content generation.
              </p>
            </div>
            <div className="flex items-center gap-gutter">
              <div className="flex items-center bg-surface-container-low border border-outline-variant/20 rounded px-3 h-10">
                <span className="material-symbols-outlined text-outline text-lg mr-2">
                  search
                </span>
                <input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface font-body-md outline-none" placeholder="Semantic search..." type="text" />
              </div>
            </div>
          </header>

          {/* Quick Ingestion Tool */}
          <section className="mb-stack-lg">
            <div className="glass-panel inner-glow rounded-xl p-6 border border-primary/20 bg-primary/5">
              <textarea 
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Dump a thought, paste a long article, or drop a URL to be vectorized..."
                className="w-full bg-surface-container-lowest/50 border border-outline-variant/20 rounded-lg p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none min-h-[120px] font-body-md"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button className="text-[10px] border border-outline-variant/30 px-3 py-1.5 rounded bg-surface text-on-surface-variant hover:text-on-surface transition-all font-label-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">link</span>
                    URL
                  </button>
                  <button className="text-[10px] border border-outline-variant/30 px-3 py-1.5 rounded bg-surface text-on-surface-variant hover:text-on-surface transition-all font-label-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">upload_file</span>
                    PDF
                  </button>
                </div>
                <button 
                  onClick={handleVectorize}
                  disabled={isVectorizing || !ideaText.trim()}
                  className="bg-primary text-on-primary font-label-mono text-label-mono px-6 h-10 flex items-center gap-2 rounded-lg hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVectorizing ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                      VECTORIZING...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">hub</span>
                      EMBED TO MEMORY
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Intelligence Hub Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-stack-lg">
            <div className="glass-panel p-stack-md inner-glow rounded-xl">
              <div className="text-outline font-label-mono text-xs uppercase mb-1">
                Total Assets
              </div>
              <div className="text-headline-md font-headline-md text-on-surface">
                4,281
              </div>
            </div>
            <div className="glass-panel p-stack-md inner-glow rounded-xl">
              <div className="text-outline font-label-mono text-xs uppercase mb-1">
                AI Insights
              </div>
              <div className="text-headline-md font-headline-md text-primary">
                12.4k
              </div>
            </div>
            <div className="glass-panel p-stack-md inner-glow rounded-xl border-l-2 border-l-tertiary-container">
              <div className="text-outline font-label-mono text-xs uppercase mb-1">
                Signal Density
              </div>
              <div className="text-headline-md font-headline-md text-on-surface">
                94.2%
              </div>
            </div>
            <div className="glass-panel p-stack-md inner-glow rounded-xl">
              <div className="text-outline font-label-mono text-xs uppercase mb-1">
                Sync Status
              </div>
              <div className="text-headline-md font-headline-md text-secondary">
                Verified
              </div>
            </div>
          </section>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3 mb-stack-md border-b border-outline-variant/10 pb-6">
            <span className="text-outline font-label-mono text-xs uppercase mr-2">
              Sort by:
            </span>
            <button className="bg-surface-container-high border border-outline-variant/20 px-3 py-1.5 rounded font-label-mono text-xs text-on-surface flex items-center gap-2">
              RELEVANCE SCORE
              <span className="material-symbols-outlined text-xs">
                keyboard_arrow_down
              </span>
            </button>
            <div className="w-px h-4 bg-outline-variant/20 mx-2" />
            <button className="bg-primary/10 border border-primary/30 px-3 py-1.5 rounded font-label-mono text-xs text-primary">
              ALL TOPICS
            </button>
            <button className="bg-transparent border border-outline-variant/20 px-3 py-1.5 rounded font-label-mono text-xs text-on-surface-variant hover:border-primary/50 transition-colors">
              CRYPTO-ECONOMICS
            </button>
            <button className="bg-transparent border border-outline-variant/20 px-3 py-1.5 rounded font-label-mono text-xs text-on-surface-variant hover:border-primary/50 transition-colors">
              NEURAL ARCHITECTURE
            </button>
            <button className="bg-transparent border border-outline-variant/20 px-3 py-1.5 rounded font-label-mono text-xs text-on-surface-variant hover:border-primary/50 transition-colors">
              BIO-SECURITY
            </button>
            <button className="ml-auto text-primary font-label-mono text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                filter_alt
              </span>
              ADVANCED FILTERS
            </button>
          </div>

          {/* Research Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Vault Card 1 */}
            <div className="glass-panel group relative overflow-hidden rounded-xl inner-glow flex flex-col p-stack-md hover:border-primary/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-tertiary-container/20 text-tertiary font-label-mono text-[10px] px-2 py-1 rounded border border-tertiary-container/30">
                  RESEARCH PAPER
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-primary font-label-mono text-xs">
                    9.8 RELEVANCE
                  </span>
                  <div className="w-16 h-1 bg-surface-variant rounded-full mt-1 overflow-hidden">
                    <div className="bg-primary h-full w-[98%]" />
                  </div>
                </div>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors">
                On the Convergence of LLMs and Zero Knowledge Proofs
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                A comprehensive analysis of how verifiable computation can secure decentralized intelligence layers...
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    <span className="font-label-mono text-[10px]">
                      14 INSIGHTS
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    <span className="font-label-mono text-[10px]">
                      12M READ
                    </span>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">
                  open_in_new
                </button>
              </div>
            </div>
            {/* Vault Card 2 (AI Highlight Style) */}
            <div className="relative group overflow-hidden rounded-xl p-stack-md flex flex-col border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="absolute inset-0 bg-surface-container-lowest opacity-40 z-0" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-primary/20 text-primary font-label-mono text-[10px] px-2 py-1 rounded border border-primary/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      auto_awesome
                    </span>
                    AI SUMMARY
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-primary font-label-mono text-xs">
                      8.4 RELEVANCE
                    </span>
                    <div className="w-16 h-1 bg-surface-variant rounded-full mt-1 overflow-hidden">
                      <div className="bg-primary h-full w-[84%]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface leading-tight mb-2">
                  Techno-Capitalist Singularity: A 2024 Retrospective
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">
                  Aggregated insights from 12 separate sources including podcasts, Twitter threads, and whitepapers. Major theme: Hardware scarcity vs Algorithm efficiency.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 mb-6">
                  <span className="bg-white/5 border border-white/10 text-[10px] text-outline font-label-mono px-2 py-0.5 rounded">
                    #macro
                  </span>
                  <span className="bg-white/5 border border-white/10 text-[10px] text-outline font-label-mono px-2 py-0.5 rounded">
                    #ai-policy
                  </span>
                </div>
                <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-outline">
                      <span className="material-symbols-outlined text-sm" data-weight="fill">
                        hub
                      </span>
                      <span className="font-label-mono text-[10px]">
                        32 NODES
                      </span>
                    </div>
                  </div>
                  <span className="text-primary font-label-mono text-[10px]">
                    VERIFIED KERNEL
                  </span>
                </div>
              </div>
            </div>
            {/* Vault Card 3 */}
            <div className="glass-panel group relative overflow-hidden rounded-xl inner-glow flex flex-col p-stack-md hover:border-primary/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-secondary-container/20 text-secondary font-label-mono text-[10px] px-2 py-1 rounded border border-secondary-container/30">
                  NEWSLETTER ARCHIVE
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-primary font-label-mono text-xs">
                    7.1 RELEVANCE
                  </span>
                  <div className="w-16 h-1 bg-surface-variant rounded-full mt-1 overflow-hidden">
                    <div className="bg-primary h-full w-[71%]" />
                  </div>
                </div>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface leading-tight mb-2">
                The Sovereign Individual in the Age of Ubiquitous Surveillance
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Exploring the intersection of privacy tools and global regulatory frameworks. Source: Zero-Day Reports.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    <span className="font-label-mono text-[10px]">
                      6 INSIGHTS
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      bookmark
                    </span>
                    <span className="font-label-mono text-[10px]">
                      SAVED
                    </span>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">
                  open_in_new
                </button>
              </div>
            </div>
            {/* Vault Card 4 */}
            <div className="glass-panel group relative overflow-hidden rounded-xl inner-glow flex flex-col p-stack-md hover:border-primary/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-surface-variant text-outline font-label-mono text-[10px] px-2 py-1 rounded border border-outline-variant/30">
                  PODCAST TRANSCRIPT
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-primary font-label-mono text-xs">
                    9.1 RELEVANCE
                  </span>
                  <div className="w-16 h-1 bg-surface-variant rounded-full mt-1 overflow-hidden">
                    <div className="bg-primary h-full w-[91%]" />
                  </div>
                </div>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface leading-tight mb-2">
                Architecting Post-Scarcity Energy Systems
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Synthesized discussion on modular nuclear fission and its role in sovereign power grids.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    <span className="font-label-mono text-[10px]">
                      21 INSIGHTS
                    </span>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">
                  open_in_new
                </button>
              </div>
            </div>
            {/* Vault Card 5 */}
            <div className="glass-panel group relative overflow-hidden rounded-xl inner-glow flex flex-col p-stack-md hover:border-primary/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-tertiary-container/20 text-tertiary font-label-mono text-[10px] px-2 py-1 rounded border border-tertiary-container/30">
                  PATENT ANALYSIS
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-primary font-label-mono text-xs">
                    6.5 RELEVANCE
                  </span>
                  <div className="w-16 h-1 bg-surface-variant rounded-full mt-1 overflow-hidden">
                    <div className="bg-primary h-full w-[65%]" />
                  </div>
                </div>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface leading-tight mb-2">
                Next-Gen HBM Architecture (High Bandwidth Memory)
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Technical breakdown of 3D-stacked memory efficiency in localized AI inference engines.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    <span className="font-label-mono text-[10px]">
                      3 INSIGHTS
                    </span>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">
                  open_in_new
                </button>
              </div>
            </div>
            {/* Vault Card 6 */}
            <div className="glass-panel group relative overflow-hidden rounded-xl inner-glow flex flex-col p-stack-md hover:border-primary/40 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/20 text-primary font-label-mono text-[10px] px-2 py-1 rounded border border-primary/30">
                  BOOK SUMMARY
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-primary font-label-mono text-xs">
                    9.9 RELEVANCE
                  </span>
                  <div className="w-16 h-1 bg-surface-variant rounded-full mt-1 overflow-hidden">
                    <div className="bg-primary h-full w-[99%]" />
                  </div>
                </div>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface leading-tight mb-2">
                Cybernetic Statecraft: The Protocol is the Law
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Deep dive into the transition from geographic sovereignty to digital jurisdictional competition.
              </p>
              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    <span className="font-label-mono text-[10px]">
                      45 INSIGHTS
                    </span>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">
                  open_in_new
                </button>
              </div>
            </div>
          </div>

          {/* Pagination / Load More */}
          <div className="mt-stack-lg flex flex-col items-center gap-stack-md">
            <button className="glass-panel hover:bg-white/5 px-8 py-3 rounded-full text-on-surface font-label-mono text-xs transition-all border border-outline-variant/20">
              DECODE MORE ASSETS
            </button>
            <div className="text-outline font-label-mono text-[10px] uppercase">
              Displaying 6 of 4,281 assets
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full flex justify-between items-center md:pl-[264px] px-container-padding py-stack-md mt-auto border-t border-outline-variant/5">
          <div className="font-label-mono text-label-mono text-outline">
            ETHOS Identity OS © 2024
          </div>
          <div className="flex gap-stack-lg">
            <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">
              Privacy
            </a>
            <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">
              Security
            </a>
            <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">
              Kernel
            </a>
          </div>
        </footer>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low backdrop-blur-xl border-t border-outline-variant/10 h-16 flex justify-around items-center z-50">
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">
            grid_view
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">
            psychology
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" data-weight="fill">
            hub
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">
            tune
          </span>
        </button>
      </nav>
    </div>
  );
}
