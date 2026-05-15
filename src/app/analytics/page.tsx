export default function AnalyticsPage() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Side Navigation Shell */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-lg bg-surface-dim/50 backdrop-blur-2xl border-r border-outline-variant/10 w-[240px]">
        <div className="px-6 mb-12">
          <h1 className="font-label-mono text-label-mono uppercase tracking-widest text-surface-tint">
            OS.01
          </h1>
          <p className="text-[10px] text-outline mt-1 font-label-mono">
            Identity Active
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              grid_view
            </span>
            <span className="font-body-md">
              Dashboard
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              fingerprint
            </span>
            <span className="font-body-md">
              Identity
            </span>
          </a>
          {/* Active Tab: Intelligence (Mapping to Analytics) */}
          <a className="flex items-center gap-4 bg-primary/10 text-primary border-l-2 border-primary px-4 py-3 translate-x-1" href="#">
            <span className="material-symbols-outlined">
              psychology
            </span>
            <span className="font-body-md">
              Intelligence
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              hub
            </span>
            <span className="font-body-md">
              Nexus
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
            <span className="material-symbols-outlined">
              tune
            </span>
            <span className="font-body-md">
              Settings
            </span>
          </a>
        </nav>
        <div className="mt-auto px-4 space-y-1">
          <div className="mb-4 px-4 py-2 bg-surface-container rounded-lg flex items-center justify-between border border-outline-variant/20">
            <span className="font-label-mono text-[10px]">
              Command K
            </span>
            <span className="material-symbols-outlined text-sm">
              keyboard_command_key
            </span>
          </div>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-2 hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">
              help_outline
            </span>
            <span className="font-label-mono text-label-mono">
              Support
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-2 hover:text-on-surface transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">
              terminal
            </span>
            <span className="font-label-mono text-label-mono">
              Logs
            </span>
          </a>
        </div>
      </aside>

      {/* Top AppBar Shell */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 ml-[240px] md:w-[calc(100%-240px)]">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-[20px] font-semibold tracking-tighter text-on-surface">
            ETHOS
          </span>
          <nav className="hidden md:flex gap-6">
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">
              Signals
            </a>
            <a className="text-primary font-medium border-b-2 border-primary pb-1" href="#">
              Alignment
            </a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" href="#">
              Vault
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-lg">
              search
            </span>
            <input className="bg-surface-container-low border-none rounded-full py-1.5 pl-10 pr-4 text-body-md focus:ring-1 focus:ring-primary w-64 outline-none" placeholder="Scan nodes..." type="text" />
          </div>
          <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">
            account_circle
          </span>
          <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">
            settings
          </span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="md:ml-[240px] pt-24 px-stack-lg pb-stack-lg min-h-screen max-w-[1440px] w-full flex flex-col">
        {/* Header Section */}
        <header className="mb-stack-lg flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="font-label-mono text-label-mono text-primary uppercase">
                System Live: Identity Synchronization
              </span>
            </div>
            <h2 className="font-display-lg text-display-lg text-on-surface">
              Identity Analytics
            </h2>
            <p className="font-body-lg text-on-surface-variant mt-2 max-w-2xl">
              Strategic tracking of your digital presence. Analyze topic dominance and positioning trajectory across the synthetic ecosystem.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-surface-container-high border border-outline-variant/20 px-4 py-2 flex items-center gap-2 font-label-mono text-label-mono hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-sm">
                history
              </span>
              EXPORT LOGS
            </button>
            <button className="bg-primary text-on-primary px-6 py-2 flex items-center gap-2 font-body-md font-medium hover:brightness-110 transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined">
                refresh
              </span>
              Recalibrate
            </button>
          </div>
        </header>

        {/* Bento Grid Analytics */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Positioning Trajectory (Large Visual) */}
          <div className="col-span-8 glass-panel inner-glow p-stack-lg flex flex-col min-h-[400px]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-headline-md text-headline-md">
                  Positioning Trajectory
                </h3>
                <p className="text-outline text-body-md">
                  Long-term alignment within the global knowledge graph.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-label-mono border border-primary/20">
                  90 DAY SPAN
                </span>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden group">
              {/* Placeholder for Growth Timeline / Identity Graph */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img alt="Positioning Graph" className="w-full h-full object-cover opacity-60 mix-blend-screen" data-alt="A sophisticated data visualization showing an identity trajectory graph with flowing neon blue and violet lines over a dark, grid-patterned background. The visualization represents strategic growth with smooth curves and glowing data points. The lighting is low-key, creating a high-tech laboratory aesthetic with subtle grain and glassmorphic depth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvRN9fbtPez4glDckN3Rb1tq0QjYWeaYmBWumYbyLYE8waggKH11FMdr-LeA9HMvwsi6s5oY31-wf49eE5a_J7ox-_UIghK3A-VhUVCY1f7uSP1gZk2EMoALikQ3xKJQ4Ug10yKFn1Y1OUdNnYD-LImOmhv9KS73ls0tAcV7hPuEl3WliBCuEuz8Vgmh6cGMu-En8yB47Ny59qMzDy_Qi25KDEXPedxCD6MUDtFXbIpeIrZaL__SSWi4FBauECWR7Tcvf-6c4xzdc" />
              </div>
              {/* Data Overlays */}
              <div className="absolute bottom-4 left-4 flex gap-8">
                <div>
                  <p className="text-[10px] font-label-mono text-outline mb-1">
                    STABILITY
                  </p>
                  <p className="text-headline-md font-bold text-primary">
                    94.2%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-label-mono text-outline mb-1">
                    RESONANCE
                  </p>
                  <p className="text-headline-md font-bold text-secondary">
                    88.7%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Alignment (Metric Stack) */}
          <div className="col-span-4 space-y-gutter">
            <div className="glass-panel inner-glow p-stack-md">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-secondary">
                  graphic_eq
                </span>
                <span className="text-[10px] font-label-mono text-outline">
                  VOICE ALIGNMENT
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-body-md mb-2">
                    <span>
                      Authenticity Score
                    </span>
                    <span className="text-primary">
                      98%
                    </span>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
                    <div className="h-full bg-primary w-[98%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body-md mb-2">
                    <span>
                      Semantic Drift
                    </span>
                    <span className="text-secondary">
                      0.04%
                    </span>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
                    <div className="h-full bg-secondary w-[4%]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel inner-glow p-stack-md bg-gradient-to-br from-surface-container-low to-secondary/5">
              <h4 className="font-label-mono text-[10px] text-outline mb-4">
                AI ANALYTICS INSIGHT
              </h4>
              <p className="text-body-md leading-relaxed">
                Your identity shows a 12% increase in
                <span className="text-primary mx-1">
                  Technical Authority
                </span>
                since the last epoch. Voice alignment is peaking in the
                <span className="italic mx-1">
                  Foundational Theory
                </span>
                sector.
              </p>
              <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <span className="text-[10px] font-label-mono">
                  STATUS: OPTIMIZED
                </span>
                <span className="material-symbols-outlined text-emerald-400 text-sm">
                  auto_awesome
                </span>
              </div>
            </div>
          </div>

          {/* Topic Dominance (Bento Box) */}
          <div className="col-span-4 glass-panel inner-glow p-stack-lg min-h-[300px]">
            <h3 className="font-headline-md text-headline-md mb-6">
              Topic Dominance
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-label-mono text-primary border border-primary/20">
                  01
                </div>
                <div className="flex-1">
                  <p className="font-body-md">
                    Cybernetic Philosophy
                  </p>
                  <p className="text-[10px] font-label-mono text-outline uppercase">
                    Dominance: 44%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-label-mono text-outline border border-white/5">
                  02
                </div>
                <div className="flex-1">
                  <p className="font-body-md">
                    Algorithmic Governance
                  </p>
                  <p className="text-[10px] font-label-mono text-outline uppercase">
                    Dominance: 29%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-label-mono text-outline border border-white/5">
                  03
                </div>
                <div className="flex-1">
                  <p className="font-body-md">
                    Post-Scarcity Ethics
                  </p>
                  <p className="text-[10px] font-label-mono text-outline uppercase">
                    Dominance: 12%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Map (Visual Interactive) */}
          <div className="col-span-8 glass-panel inner-glow p-stack-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md">
                Nexus Knowledge Map
              </h3>
              <div className="flex gap-4">
                <button className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined">
                    zoom_in
                  </span>
                </button>
                <button className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined">
                    filter_list
                  </span>
                </button>
              </div>
            </div>
            <div className="flex-1 relative min-h-[300px] border border-outline-variant/10 bg-surface-container-lowest/50 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <img alt="Knowledge Web Visualization" className="w-full h-full object-cover opacity-50" data-alt="A detailed knowledge map visualization featuring a web of interconnected nodes and glowing filaments. The structure resembles a neural network or a constellation, set against a deep matte black background. Primary nodes glow with a soft blue cyan light, while smaller connections use a muted violet. The overall aesthetic is serene, scientific, and sophisticated, avoiding traditional corporate chart styles in favor of an artistic data representation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdVXXjQE_oA-eABkhr6kGU864x6GcsH9M31cvDaN8bZz3U6IdXSWMgaMmQp1uYIgk6OyV2AV3d9AYTb23OSviVQd3koOQwufmvAS3yS2YITNIcKET_8DCoNS6pVgd6ldmQChLDiPVQBSyDlkRPJcPZ7NEethFCsZzbwEF_hsM27-KmAGQ6UulZVKhMZUV4ucBaZ-r6YOFslrDHFjohX6IpoTSkNlMR-cM5hU72WE1E3pMugCu1DppgJH79AhKNcVSI08udxjMlXhM" />
              </div>
              {/* Interactive Point Overlay */}
              <div className="absolute top-1/2 left-1/3 p-3 glass-panel border-primary/40 rounded-lg shadow-2xl">
                <p className="text-[10px] font-label-mono text-primary mb-1">
                  ACTIVE NODE
                </p>
                <p className="text-body-md font-medium">
                  Identity Synthesis
                </p>
                <p className="text-[10px] text-outline">
                  Weight: 8.4 Epochs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Shell */}
        <footer className="w-full flex justify-between items-center py-stack-lg mt-auto border-t border-outline-variant/10">
          <span className="font-label-mono text-label-mono text-outline">
            ETHOS Identity OS © 2024
          </span>
          <div className="flex gap-8">
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
          <div className="flex items-center gap-2 text-outline">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-label-mono text-[10px]">
              SYNC: 100%
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
