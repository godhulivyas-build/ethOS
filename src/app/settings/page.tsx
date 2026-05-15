"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [isGmailSynced, setIsGmailSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const connectGmail = () => {
    setIsSyncing(true);
    // Redirect to the FastAPI Google OAuth login endpoint
    // We pass a dummy user_id for now since we removed Clerk. 
    // In production, this would be the JWT subject.
    window.location.href = "http://localhost:8000/api/v1/auth/google/login?user_id=12345678-1234-5678-1234-567812345678";
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-display-lg font-semibold tracking-tighter text-on-surface">
            ETHOS
          </span>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="/analytics">
              Signals
            </Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="/dashboard">
              Alignment
            </Link>
            <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="/vault">
              Vault
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            account_circle
          </span>
          <span className="material-symbols-outlined text-primary font-medium border-b-2 border-primary pb-1 transition-colors cursor-pointer">
            settings
          </span>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-lg bg-surface-dim/50 backdrop-blur-2xl border-r border-outline-variant/10 w-[240px] hidden md:flex">
        <div className="px-6 mb-10 mt-12">
          <div className="flex flex-col">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-surface-tint">
              OS.01
            </span>
            <span className="font-body-md text-body-md font-medium text-on-surface">
              Identity Active
            </span>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="/dashboard">
            <span className="material-symbols-outlined">
              grid_view
            </span>
            <span className="font-body-md text-body-md">
              Dashboard
            </span>
          </Link>
          <Link className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="/analytics">
            <span className="material-symbols-outlined">
              fingerprint
            </span>
            <span className="font-body-md text-body-md">
              Identity
            </span>
          </Link>
          <Link className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="/intelligence">
            <span className="material-symbols-outlined">
              psychology
            </span>
            <span className="font-body-md text-body-md">
              Intelligence
            </span>
          </Link>
          <Link className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="/perspective">
            <span className="material-symbols-outlined">
              hub
            </span>
            <span className="font-body-md text-body-md">
              Nexus
            </span>
          </Link>
          <Link className="flex items-center gap-4 bg-primary/10 text-primary border-l-2 border-primary px-4 py-3 transition-all translate-x-1" href="/settings">
            <span className="material-symbols-outlined">
              tune
            </span>
            <span className="font-body-md text-body-md">
              Settings
            </span>
          </Link>
        </nav>
        <div className="mt-auto px-4 flex flex-col gap-1">
          <div className="bg-surface-variant/20 rounded-lg p-3 mb-4 flex justify-between items-center border border-outline-variant/20">
            <span className="font-label-mono text-[10px] text-outline uppercase">
              Quick Search
            </span>
            <span className="font-label-mono text-[10px] bg-surface-variant text-on-surface px-1.5 py-0.5 rounded">
              ⌘ K
            </span>
          </div>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-2 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined text-[20px]">
              help_outline
            </span>
            <span className="font-label-mono text-label-mono">
              Support
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-2 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined text-[20px]">
              terminal
            </span>
            <span className="font-label-mono text-label-mono">
              Logs
            </span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-[240px] pt-24 pb-16 px-container-padding min-h-screen w-full flex flex-col">
        <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
          <header className="mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg mb-2">
              Personalization & Control
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Configure the core parameters of your digital identity and AI interaction profile.
            </p>
          </header>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1">
            {/* AI Aggressiveness & Preferences (Primary Section) */}
            <section className="lg:col-span-8 flex flex-col gap-gutter">
              <div className="glass-panel inner-glow rounded-xl p-stack-lg ai-highlight">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">
                    bolt
                  </span>
                  <h2 className="font-headline-md text-headline-md">
                    AI Intelligence Profile
                  </h2>
                </div>
                {/* Slider Control */}
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <label className="font-body-md text-on-surface font-medium">
                      AI Aggressiveness
                    </label>
                    <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      Level 07 / High
                    </span>
                  </div>
                  <input className="w-full h-1 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" max="10" min="1" type="range" defaultValue="7" />
                  <div className="flex justify-between mt-2">
                    <span className="font-label-mono text-[10px] text-outline">
                      PASSIVE
                    </span>
                    <span className="font-label-mono text-[10px] text-outline">
                      NEURAL
                    </span>
                    <span className="font-label-mono text-[10px] text-outline">
                      AUTONOMOUS
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body-md text-on-surface">
                        Predictive Logic
                      </p>
                      <p className="font-label-mono text-[11px] text-outline">
                        Allow OS to pre-generate workflow drafts based on intent.
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-primary rounded-full relative transition-colors">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-on-primary rounded-full" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body-md text-on-surface">
                        Semantic Memory Cluster
                      </p>
                      <p className="font-label-mono text-[11px] text-outline">
                        Enable cross-contextual learning from private datasets.
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-surface-variant rounded-full relative transition-colors">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-outline rounded-full" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Writing DNA */}
              <div className="glass-panel inner-glow rounded-xl p-stack-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">
                      edit_note
                    </span>
                    <h2 className="font-headline-md text-headline-md">
                      Writing DNA
                    </h2>
                  </div>
                  <button className="bg-surface-variant/30 hover:bg-surface-variant/50 border border-outline-variant/30 text-on-surface px-4 py-1.5 rounded font-body-md transition-all">
                    Manage Samples
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 border border-outline-variant/10 rounded-lg">
                    <span className="font-label-mono text-[10px] text-secondary uppercase block mb-1">
                      Syntactic Weight
                    </span>
                    <p className="font-body-md text-on-surface">
                      Formal, Analytical, Concise
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-4 border border-outline-variant/10 rounded-lg">
                    <span className="font-label-mono text-[10px] text-secondary uppercase block mb-1">
                      Lexical Range
                    </span>
                    <p className="font-body-md text-on-surface">
                      Advanced Academic (92%)
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <p className="font-body-md text-on-surface-variant italic text-sm">
                    "Your DNA mirrors technical whitepapers and executive communications from the last 24 months."
                  </p>
                </div>
              </div>
            </section>

            {/* Sidebar Settings */}
            <aside className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Tone Profile / Voice */}
              <div className="glass-panel inner-glow rounded-xl p-stack-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-body-lg text-body-lg">
                    Tone Profile
                  </h3>
                  <span className="material-symbols-outlined text-primary text-[20px] cursor-pointer hover:rotate-180 transition-transform duration-500">
                    tune
                  </span>
                </div>
                
                <div className="space-y-6">
                  {/* Sliders */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="font-label-mono text-[11px] text-outline uppercase tracking-wider">
                        Formality
                      </label>
                      <span className="font-label-mono text-[10px] text-primary">Professional</span>
                    </div>
                    <input className="w-full h-1 bg-outline-variant/30 rounded-full appearance-none cursor-pointer accent-primary" max="100" min="0" type="range" defaultValue="75" />
                    <div className="flex justify-between mt-1">
                      <span className="font-label-mono text-[9px] text-outline/50">CASUAL</span>
                      <span className="font-label-mono text-[9px] text-outline/50">ACADEMIC</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="font-label-mono text-[11px] text-outline uppercase tracking-wider">
                        Directness
                      </label>
                      <span className="font-label-mono text-[10px] text-primary">High</span>
                    </div>
                    <input className="w-full h-1 bg-outline-variant/30 rounded-full appearance-none cursor-pointer accent-primary" max="100" min="0" type="range" defaultValue="85" />
                    <div className="flex justify-between mt-1">
                      <span className="font-label-mono text-[9px] text-outline/50">SUBTLE</span>
                      <span className="font-label-mono text-[9px] text-outline/50">BLUNT</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="font-label-mono text-[11px] text-outline uppercase tracking-wider">
                        Enthusiasm
                      </label>
                      <span className="font-label-mono text-[10px] text-primary">Measured</span>
                    </div>
                    <input className="w-full h-1 bg-outline-variant/30 rounded-full appearance-none cursor-pointer accent-primary" max="100" min="0" type="range" defaultValue="40" />
                    <div className="flex justify-between mt-1">
                      <span className="font-label-mono text-[9px] text-outline/50">STOIC</span>
                      <span className="font-label-mono text-[9px] text-outline/50">EXCITED</span>
                    </div>
                  </div>

                  {/* Custom Prompt */}
                  <div className="pt-2 border-t border-outline-variant/10">
                    <label className="font-label-mono text-[11px] text-outline uppercase tracking-wider mb-2 block">
                      Custom Directives
                    </label>
                    <textarea 
                      className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-3 text-[13px] text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none min-h-[80px]"
                      placeholder="e.g. Always use Oxford commas. Avoid marketing jargon. Speak like a senior engineer."
                      defaultValue="Prefer concise sentences. Avoid hyperbole. Use analogies to explain complex technical concepts."
                    />
                  </div>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="glass-panel inner-glow rounded-xl p-stack-lg">
                <h3 className="font-body-lg text-body-lg mb-4">
                  Connected Nodes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-variant flex items-center justify-center rounded">
                        <span className="material-symbols-outlined text-sm">
                          mail
                        </span>
                      </div>
                      <div>
                        <span className="font-body-md text-on-surface block leading-tight">
                          Gmail API
                        </span>
                        <span className={`text-[10px] font-label-mono ${isGmailSynced ? "text-emerald-500" : "text-amber-500"}`}>
                          {isGmailSynced ? "SYNCED" : "UNSYNCED"}
                        </span>
                      </div>
                    </div>
                    {isGmailSynced ? (
                      <button 
                        onClick={() => setIsGmailSynced(false)}
                        className="text-[10px] border border-outline-variant/30 px-3 py-1.5 rounded bg-surface text-on-surface-variant hover:text-on-surface transition-all font-medium flex items-center gap-1"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={connectGmail}
                        disabled={isSyncing}
                        className="text-[10px] border border-outline-variant/30 px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-all font-medium flex items-center gap-1 disabled:opacity-50"
                      >
                        {isSyncing ? (
                          <>
                            <span className="material-symbols-outlined text-[12px] animate-spin">refresh</span>
                            SYNCING...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[12px]">sync</span>
                            CONNECT OAUTH
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-variant flex items-center justify-center rounded">
                        <span className="material-symbols-outlined text-sm">
                          book
                        </span>
                      </div>
                      <div>
                        <span className="font-body-md text-on-surface block leading-tight">
                          Kindle Highlights
                        </span>
                        <span className="text-[10px] text-emerald-500 font-label-mono">SYNCED</span>
                      </div>
                    </div>
                    <button className="text-[10px] border border-outline-variant/30 px-2 py-1 rounded hover:bg-white/5 transition-all">Configure</button>
                  </div>
                  <button className="w-full py-2 border border-dashed border-outline-variant/50 rounded mt-2 font-label-mono text-[11px] text-outline hover:text-on-surface hover:border-primary/50 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    ADD NEW CONNECTION
                  </button>
                </div>
              </div>

              {/* Export System */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-stack-lg">
                <h3 className="font-body-lg text-body-lg mb-2 text-primary">
                  Identity Export
                </h3>
                <p className="font-label-mono text-[11px] text-outline-variant mb-4">
                  Download your complete encrypted persona package (.ETHOS)
                </p>
                <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-body-md flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined text-[20px]">
                    download
                  </span>
                  Execute Export
                </button>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <footer className="w-full flex justify-between items-center py-stack-md mt-auto bg-transparent border-t border-outline-variant/5 pt-6">
            <span className="font-label-mono text-label-mono text-outline">
              ETHOS Identity OS © 2024
            </span>
            <div className="flex items-center gap-8">
              <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">
                Privacy
              </a>
              <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">
                Security
              </a>
              <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors text-primary" href="#">
                Kernel
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
