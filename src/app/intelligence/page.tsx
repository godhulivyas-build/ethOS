import Image from "next/image";

export default function IntelligencePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .ai-glow {
            box-shadow: 0 0 20px rgba(173, 198, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .mesh-gradient {
            background-image: radial-gradient(at 0% 0%, rgba(173, 198, 255, 0.05) 0px, transparent 50%),
                              radial-gradient(at 100% 100%, rgba(125, 1, 177, 0.05) 0px, transparent 50%);
        }
        `
      }} />

      {/* TopAppBar Navigation Shell */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-display-lg font-semibold tracking-tighter text-on-surface">ETHOS</span>
          <nav className="hidden md:flex gap-6 items-center">
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Signals</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Alignment</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Vault</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface w-48 placeholder:text-outline/50 outline-none" placeholder="Search Kernel..." type="text" />
          </div>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">account_circle</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">settings</span>
        </div>
      </header>

      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-lg bg-surface-dim/50 backdrop-blur-2xl border-r border-outline-variant/10 w-[240px] hidden md:flex">
        <div className="px-6 mb-10 mt-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
            </div>
            <div>
              <div className="font-label-mono text-label-mono uppercase tracking-widest text-surface-tint">OS.01</div>
              <div className="text-[10px] text-outline uppercase tracking-tighter">Identity Active</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-body-md">Dashboard</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">fingerprint</span>
            <span className="font-body-md">Identity</span>
          </a>
          <a className="flex items-center gap-4 bg-primary/10 text-primary border-l-2 border-primary px-6 py-3" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <span className="font-body-md font-medium">Intelligence</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">hub</span>
            <span className="font-body-md">Nexus</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">tune</span>
            <span className="font-body-md">Settings</span>
          </a>
        </nav>
        <div className="px-6 mb-6">
          <button className="w-full flex items-center justify-between bg-surface-container-high border border-outline-variant/20 px-3 py-2 rounded-lg text-outline hover:text-on-surface transition-colors">
            <span className="text-[12px] font-label-mono">Command K</span>
            <span className="material-symbols-outlined text-[16px]">terminal</span>
          </button>
        </div>
        <div className="mt-auto space-y-1">
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-2 text-sm hover:text-on-surface" href="#">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
            <span>Support</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-6 py-2 text-sm hover:text-on-surface" href="#">
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            <span>Logs</span>
          </a>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-[240px] pt-24 pb-12 px-container-padding min-h-screen mesh-gradient flex-grow">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <header className="mb-stack-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-label-mono border border-primary/20 rounded">AI NODE 05</span>
              <span className="text-outline text-label-mono">•</span>
              <span className="text-outline text-label-mono">INSIGHT EXTRACTION</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Intelligence Refinery</h1>
            <p className="text-on-surface-variant max-w-2xl font-body-lg">Transform fragmented data streams into actionable cognitive frameworks. Upload URLs, documents, or raw text to extract high-density intelligence.</p>
          </header>

          {/* Command Hub / Input Area */}
          <section className="mb-stack-lg">
            <div className="ai-glow bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 relative overflow-hidden">
              {/* Subtle AI Animation Placeholder */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-outline-variant/10 pb-4">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <div className="flex-1">
                    <p className="text-body-lg text-on-surface">Gmail API Connected</p>
                    <p className="text-[12px] text-outline font-label-mono">Latest Sync: 2 mins ago • 14 New Newsletters found</p>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-medium hover:brightness-110 transition-all flex items-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    Extract Insights
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex items-center gap-3 bg-surface-container/50 border border-outline-variant/20 px-4 py-2 rounded-lg min-w-max cursor-pointer hover:border-primary/50 transition-all">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <div>
                      <p className="text-[12px] font-medium text-on-surface">Ben Thompson • Stratechery</p>
                      <p className="text-[10px] text-outline font-label-mono">Tech Strategy • 1hr ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 px-4 py-2 rounded-lg min-w-max cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <div>
                      <p className="text-[12px] font-medium text-primary">Packy McCormick • Not Boring</p>
                      <p className="text-[10px] text-primary/70 font-label-mono">Web3 & Optimism • 3hrs ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container/50 border border-outline-variant/20 px-4 py-2 rounded-lg min-w-max cursor-pointer hover:border-primary/50 transition-all">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <div>
                      <p className="text-[12px] font-medium text-on-surface">Lenny Rachitsky</p>
                      <p className="text-[10px] text-outline font-label-mono">Product Growth • 12hrs ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Processing / Active Refining State */}
          <section className="mb-stack-lg hidden">
            <div className="bg-surface-container/50 rounded-xl p-12 border border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full mb-4"></div>
              <div className="font-label-mono text-primary animate-pulse mb-2">REFINING INTELLIGENCE...</div>
              <p className="text-outline text-body-md">Mapping semantic clusters and identifying contrarian vectors.</p>
            </div>
          </section>

          {/* Results Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Main Insight Feed (Column 1-8) */}
            <div className="md:col-span-8 space-y-gutter">
              {/* Key Insights Card */}
              <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden flex flex-col h-[400px]">
                <div className="px-6 py-4 bg-white/5 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">subject</span>
                    <span className="text-label-mono uppercase tracking-wider text-on-surface">Extracted Source Material</span>
                  </div>
                  <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-label-mono">1200 WORDS</span>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                  <div className="prose prose-invert max-w-none">
                    <h3 className="font-headline-md text-on-surface mb-4">The Techno-Optimist's Dilemma</h3>
                    <p className="text-on-surface-variant font-body-md mb-4 leading-relaxed">
                      "We are entering an era where building software is no longer the bottleneck. The bottleneck is attention and trust. The recent shift in decentralized network models proves that users don't want more apps; they want better filters."
                    </p>
                    <p className="text-on-surface-variant font-body-md mb-4 leading-relaxed">
                      "When considering the implications of AI on content generation, the immediate reaction is abundance. But abundance creates a premium on curation. The most valuable platforms of the next decade won't be creators, but hyper-personalized curators that align with an individual's explicit 'Tone' and 'Perspective'."
                    </p>
                    <div className="bg-surface-variant/30 p-4 border-l-2 border-primary my-4 rounded-r-lg">
                      <p className="text-on-surface font-medium text-sm">Key Takeaway:</p>
                      <p className="text-outline text-sm mt-1">AI abundance mandates curated trust models, elevating the 'Personal Brand' from a marketing tool to a fundamental verification protocol.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actionable Framework / Generated Draft */}
              <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                <div className="px-6 py-4 bg-white/5 border-b border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">edit_document</span>
                    <span className="text-label-mono uppercase tracking-wider text-on-surface">Tone-Applied Synthesis (LinkedIn Draft)</span>
                  </div>
                  <button className="text-[10px] font-label-mono bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded hover:bg-primary/30 transition-all flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                    ADJUST TONE
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-black/20 p-5 rounded-lg border border-outline-variant/10 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary hover:brightness-110 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">send</span>
                      </button>
                    </div>
                    
                    <p className="text-on-surface font-body-lg leading-relaxed mb-4">
                      The creator economy is dead. We are now in the Curator Economy. 💡
                    </p>
                    <p className="text-on-surface font-body-lg leading-relaxed mb-4">
                      Everyone is focused on how AI makes content creation cheaper. But they're missing the second-order effect: when content is infinite, attention becomes the only scarce asset.
                    </p>
                    <p className="text-on-surface font-body-lg leading-relaxed mb-4">
                      In reading Packy McCormick's latest breakdown, it struck me—we don't need more apps. We need better filters. Your personal brand is no longer just for networking; it's your verification protocol in a low-trust digital world.
                    </p>
                    <p className="text-on-surface font-body-lg leading-relaxed mb-4">
                      Are you building products, or are you building trust? Because only one scales in an AI-abundant future. 👇
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-label-mono text-outline">
                      <span className="bg-surface-variant/50 px-2 py-1 rounded">#CreatorEconomy</span>
                      <span className="bg-surface-variant/50 px-2 py-1 rounded">#AI</span>
                      <span className="bg-surface-variant/50 px-2 py-1 rounded">#FutureOfWork</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4 text-[11px] font-label-mono text-outline">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>
                      Tone Match: 94% (Direct, Professional, Insightful)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Insights (Column 9-12) */}
            <div className="md:col-span-4 space-y-gutter">
              {/* Contrarian Perspective */}
              <div className="bg-surface-container-high rounded-xl border border-tertiary/20 overflow-hidden">
                <div className="px-5 py-4 bg-tertiary/10 border-b border-tertiary/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">flare</span>
                  <span className="text-label-mono uppercase tracking-wider text-on-tertiary-fixed">Contrarian Signal</span>
                </div>
                <div className="p-5">
                  <p className="text-on-surface font-body-md leading-relaxed mb-4">"The source assumes decentralization leads to efficiency. The AI finds a 40% probability that excessive verification layers will actually create 'Consensus Paralysis' by 2026."</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-tertiary-container border border-background flex items-center justify-center text-[10px] text-on-tertiary-container font-bold">1</div>
                      <div className="w-6 h-6 rounded-full bg-surface-variant border border-background flex items-center justify-center text-[10px] text-on-surface-variant font-bold">2</div>
                    </div>
                    <span className="text-[10px] font-label-mono text-tertiary">HIGH CONFLICT SOURCE</span>
                  </div>
                </div>
              </div>

              {/* Mental Models Used */}
              <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-5">
                <div className="text-label-mono text-outline uppercase tracking-widest text-[10px] mb-4">Mental Model Map</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span className="text-on-surface text-sm">First Principles Thinking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-variant"></span>
                    <span className="text-on-surface text-sm">Pareto Distribution (80/20)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-variant"></span>
                    <span className="text-on-surface text-sm">Second-Order Effects</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/10">
                  <div className="rounded bg-surface-container px-3 py-2 flex items-center gap-3">
                    <img alt="Source Document Thumbnail" className="w-8 h-8 rounded-full grayscale opacity-50" data-alt="A macro photograph of high-tech circuit board patterns with glowing blue and violet light paths, representing digital intelligence and neural networks. The aesthetic is clean, sharp, and minimalist, using a dark graphite background to emphasize the precision of the glowing light traces. It conveys a sense of high-performance computing and future technology." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiU-w2Gs0P7UGqlSp6zWWIVFAZjCVfwo4j2hZYsWAR9NVtEUr3N7gDlimzP7BHFScjkRVRbx5yyQt6VrEd-0GoR_dCDHFjPF66RX_CBCXCOhZVY253bWw8L9wWy6tc_RaEV5zwfN0cgiAIx1rEuDSrBlqecyruZ14zwyCUHqWeTyZj9sTOP-70LnI_7oMgHv78i_DNSd0cCett61qKupEub56udy51seBQPEX6KvStuNMKjsNZPTOfQ6W1ZNRg28UUzTMOCbMijGM" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-outline font-label-mono truncate">ORIGIN_DOC.PDF</div>
                      <div className="text-[10px] text-primary font-label-mono">VIEW SOURCE TRACE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex flex-col gap-2">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-outline-variant/20 rounded-lg hover:bg-white/10 transition-all group">
                  <span className="text-on-surface font-medium">Export to Vault</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary">archive</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-outline-variant/20 rounded-lg hover:bg-white/10 transition-all group">
                  <span className="text-on-surface font-medium">Synthesize Nexus Map</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary">hub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="md:ml-[240px] w-full flex justify-between items-center px-container-padding py-stack-md mt-auto bg-transparent border-t border-outline-variant/5">
        <div className="font-label-mono text-label-mono text-outline">ETHOS Identity OS © 2024</div>
        <div className="flex gap-6">
          <a className="font-label-mono text-label-mono text-outline hover:text-on-surface" href="#">Privacy</a>
          <a className="font-label-mono text-label-mono text-outline hover:text-on-surface" href="#">Security</a>
          <a className="font-label-mono text-label-mono text-outline hover:text-on-surface" href="#">Kernel</a>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around items-center z-50">
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">grid_view</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">fingerprint</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">hub</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">tune</span>
        </a>
      </nav>
    </div>
  );
}
