import Image from "next/image";

export default function ApprovalQueuePage() {
  return (
    <div className="flex w-full min-h-screen bg-[#090909] text-[#e5e2e1] font-body-md overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-panel {
            background: rgba(28, 28, 30, 0.6);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .inner-glow {
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .active-glow {
            box-shadow: 0 0 20px rgba(173, 198, 255, 0.05);
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333333; border-radius: 2px; }
        `
      }} />

      {/* Top Navigation Shell */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex items-center gap-stack-lg">
          <span className="font-display-lg text-display-lg font-semibold tracking-tighter text-on-surface">ETHOS</span>
          <nav className="hidden md:flex items-center gap-gutter">
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Signals</a>
            <a className="text-primary font-medium border-b-2 border-primary pb-1" href="#">Alignment</a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">Vault</a>
          </nav>
        </div>
        <div className="flex items-center gap-gutter">
          <div className="flex items-center gap-stack-sm bg-surface-container-low px-stack-md py-1.5 rounded-lg border border-outline-variant/10">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-body-md w-48 text-on-surface placeholder:text-outline outline-none" placeholder="Search alignment logs..." type="text" />
          </div>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">account_circle</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">settings</span>
        </div>
      </header>

      {/* Side Navigation Shell */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-lg bg-surface-dim/50 backdrop-blur-2xl border-r border-outline-variant/10 w-[240px]">
        <div className="px-6 mb-stack-lg mt-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">fingerprint</span>
            </div>
            <div>
              <div className="font-label-mono text-label-mono uppercase tracking-widest text-surface-tint">OS.01</div>
              <div className="text-[10px] text-outline uppercase tracking-tighter font-medium">Identity Active</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-body-md">Dashboard</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">fingerprint</span>
            <span className="font-body-md">Identity</span>
          </a>
          <a className="flex items-center gap-4 bg-primary/10 text-primary border-l-2 border-primary px-4 py-3 active:translate-x-1" href="#">
            <span className="material-symbols-outlined">psychology</span>
            <span className="font-body-md">Intelligence</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">hub</span>
            <span className="font-body-md">Nexus</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">tune</span>
            <span className="font-body-md">Settings</span>
          </a>
        </nav>
        <div className="px-4 mt-auto space-y-2">
          <div className="bg-surface-container-high/40 p-3 rounded-lg border border-outline-variant/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-label-mono text-outline">COMMAND HUB</span>
              <span className="text-[10px] font-label-mono bg-white/10 px-1.5 py-0.5 rounded text-on-surface">⌘ K</span>
            </div>
            <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
              <div className="bg-primary h-full w-2/3"></div>
            </div>
          </div>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-2 text-label-mono hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            <span>Support</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-2 text-label-mono hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>Logs</span>
          </a>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-[240px] mt-16 h-[calc(100vh-64px)] overflow-hidden bg-background p-container-padding flex flex-col w-full">
        {/* Screen Header */}
        <header className="flex justify-between items-end mb-stack-lg">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Approval Queue</h1>
            <p className="text-on-surface-variant mt-1">Review and manage AI-generated identity assets before kernel deployment.</p>
          </div>
          <div className="flex gap-stack-sm">
            <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg border border-outline-variant/20 hover:border-outline-variant transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              <span className="text-label-mono">Filters</span>
            </button>
            <button className="bg-primary text-on-primary-container px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-label-mono">Batch Approve</span>
            </button>
          </div>
        </header>

        {/* Kanban Board */}
        <div className="flex-1 flex gap-gutter overflow-x-auto pb-4">
          {/* Column: Needs Review */}
          <section className="flex-shrink-0 w-[320px] flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                <h2 className="text-label-mono uppercase text-on-surface">Needs Review</h2>
              </div>
              <span className="text-label-mono text-outline bg-surface-container-high px-2 py-0.5 rounded">08</span>
            </div>
            <div className="flex-1 space-y-stack-md overflow-y-auto pr-1">
              {/* Card 1 */}
              <div className="glass-panel inner-glow rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-label-mono text-tertiary-fixed bg-tertiary-container/20 px-2 py-0.5 rounded">ID_ASSET_442</span>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span className="text-label-mono text-[10px]">98.2% Match</span>
                  </div>
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-surface-container-lowest">
                  <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" data-alt="A macro digital abstract landscape featuring flowing crystalline structures and deep violet light. The lighting is low and atmospheric, emphasizing sharp geometric edges and soft glowing gradients. The overall aesthetic is futuristic and clean, consistent with a high-performance operating system interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwSU2ysU15Qa4fJTmtERtkRPCYtInJMcUjR3KcW68Y_xnw-lXZY0SOD_6wMH-CZbd-C6It9r8wJvefSUw7gMTi7oQ3ZGdqqA32PELWlPo-zn2tTsC5NKwqcGw7wKimkG7dn9GHg09lfgzG3ImHd825aZMfZE-zM8orSiv5S25PFP3AR3rz25syWgMA6C-7ka98cRSpiPN-yaBSG_P1iRzetymBHSck-sL57XCSo6awxWCrsnH0b6wCl0SxT-ZH2Ot4Lnwl5slB-7Q" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <p className="text-body-md text-on-surface mb-4 line-clamp-2">Neural pattern generation for latent personality space V3. Alpha-weighted.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded bg-surface-container-highest/50 text-[11px] font-label-mono hover:bg-surface-container-highest transition-colors">EDIT</button>
                  <button className="flex-1 py-1.5 rounded bg-surface-container-highest/50 text-[11px] font-label-mono hover:bg-surface-container-highest transition-colors">REGEN</button>
                  <button className="w-8 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                </div>
              </div>
              {/* Card 2 */}
              <div className="glass-panel inner-glow rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-label-mono text-tertiary-fixed bg-tertiary-container/20 px-2 py-0.5 rounded">KERNEL_STRATA</span>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span className="text-label-mono text-[10px]">89.0% Match</span>
                  </div>
                </div>
                <div className="p-3 bg-surface-container-lowest/50 rounded-lg border border-outline-variant/10 mb-3">
                  <div className="flex gap-1 mb-2">
                    <div className="h-1 flex-1 bg-primary rounded-full"></div>
                    <div className="h-1 flex-1 bg-primary rounded-full"></div>
                    <div className="h-1 flex-1 bg-outline-variant rounded-full"></div>
                  </div>
                  <code className="text-[10px] font-label-mono text-outline block overflow-hidden">
                    {`{ identity: "OS.01", status: "PENDING", hash: "8x92...ff" }`}
                  </code>
                </div>
                <p className="text-body-md text-on-surface mb-4 line-clamp-2">Core logic modification for Nexus routing protocols.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded bg-surface-container-highest/50 text-[11px] font-label-mono hover:bg-surface-container-highest transition-colors">REGEN</button>
                  <button className="w-8 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Column: Edited */}
          <section className="flex-shrink-0 w-[320px] flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <h2 className="text-label-mono uppercase text-on-surface">Edited</h2>
              </div>
              <span className="text-label-mono text-outline bg-surface-container-high px-2 py-0.5 rounded">03</span>
            </div>
            <div className="flex-1 space-y-stack-md overflow-y-auto pr-1">
              <div className="glass-panel inner-glow rounded-xl p-4 border-l-2 border-l-secondary cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-label-mono text-secondary-fixed bg-secondary-container/20 px-2 py-0.5 rounded">LOG_FRAG_00</span>
                  <div className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    <span className="text-label-mono text-[10px]">Manually Adjusted</span>
                  </div>
                </div>
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3 bg-surface-container-lowest border border-outline-variant/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px] text-outline/30">description</span>
                </div>
                <p className="text-body-md text-on-surface mb-4 line-clamp-2">Adjusted security parameters for federated learning cycles.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded bg-primary/10 text-primary text-[11px] font-label-mono hover:bg-primary/20 transition-colors">APPROVE</button>
                  <button className="w-8 flex items-center justify-center rounded bg-surface-container-highest/50 text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Column: Approved */}
          <section className="flex-shrink-0 w-[320px] flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <h2 className="text-label-mono uppercase text-on-surface">Approved</h2>
              </div>
              <span className="text-label-mono text-outline bg-surface-container-high px-2 py-0.5 rounded">12</span>
            </div>
            <div className="flex-1 space-y-stack-md overflow-y-auto pr-1 opacity-70 hover:opacity-100 transition-opacity">
              <div className="glass-panel inner-glow rounded-xl p-4 border-l-2 border-l-primary/50 bg-primary/5">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-label-mono text-outline">VAULT_KEY_ALPHA</span>
                  <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 grayscale contrast-125 opacity-40">
                  <img className="w-full h-full object-cover" data-alt="A stark, minimalist black and white 3D rendering of a geometric interlocking structure. Sharp shadows and bright highlights define the form against a void-like black background. The mood is highly secure, architectural, and sophisticated, embodying the concept of high-level encryption." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU-u2mbyzo55LrMj0l6Fi8pthSDmlr3Xs-0Kez_iKbNQwFQQB6t6Jtm4pzzK9AbVv0-2nJFj8ORw3HyzuaBmV6SjGu3GY1SKe1OrjcWWjmVw4AJAB5KyI1sdwKJ64TxpIUbvdT3jKTfDL2Bhu2IE4bNs3nYVF04j0iInQRUPr3deOEx_HdDN_cn-BftqOpTQz2kCmXuIq0Kj1tvl51RwYVaFWG3qX05a-7bz2NecsBpYvAUf_2RB7zQQ2MSnjerRbV1U4Iomig8ww" alt="" />
                </div>
                <p className="text-body-md text-outline mb-4 italic">Successfully deployed to secure enclave.</p>
                <div className="flex justify-end">
                  <span className="text-[10px] font-label-mono text-outline">ARCHIVED 02:44 PM</span>
                </div>
              </div>
            </div>
          </section>

          {/* Column: Rejected */}
          <section className="flex-shrink-0 w-[320px] flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-error"></div>
                <h2 className="text-label-mono uppercase text-on-surface">Rejected</h2>
              </div>
              <span className="text-label-mono text-outline bg-surface-container-high px-2 py-0.5 rounded">05</span>
            </div>
            <div className="flex-1 space-y-stack-md overflow-y-auto pr-1">
              <div className="glass-panel inner-glow rounded-xl p-4 border-l-2 border-l-error bg-error/5 group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-label-mono text-error">SYNTH_VOID_ERR</span>
                  <span className="material-symbols-outlined text-[16px] text-error">cancel</span>
                </div>
                <p className="text-body-md text-on-surface mb-2">Content failed heuristic alignment check. Score below threshold (42%).</p>
                <div className="p-2 bg-error/10 rounded mb-4">
                  <span className="text-[10px] font-label-mono text-error">REASON: Semantic drift too high.</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 py-1.5 rounded bg-surface-container-highest/50 text-[11px] font-label-mono hover:bg-surface-container-highest transition-colors">DEBUG</button>
                  <button className="flex-1 py-1.5 rounded bg-surface-container-highest/50 text-[11px] font-label-mono hover:bg-error/20 hover:text-error transition-colors">PURGE</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="fixed bottom-0 w-full z-50 flex justify-between items-center px-container-padding py-stack-md bg-transparent pointer-events-none">
        <div className="font-label-mono text-label-mono text-outline pointer-events-auto">ETHOS Identity OS © 2024</div>
        <div className="flex gap-stack-lg pointer-events-auto">
          <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">Privacy</a>
          <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">Security</a>
          <a className="font-label-mono text-label-mono text-outline hover:text-on-surface transition-colors" href="#">Kernel</a>
        </div>
      </footer>

      {/* FAB Overlay */}
      <div className="fixed bottom-12 right-12 z-50">
        <button className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-on-primary-container hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>
      </div>
    </div>
  );
}
