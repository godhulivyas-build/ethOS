import Image from "next/image";

export default function PerspectivePage() {
  return (
    <div className="flex w-full min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex items-center gap-stack-lg">
          <span className="font-display-lg text-display-lg font-semibold tracking-tighter text-on-surface">
            ETHOS
          </span>
          <nav className="hidden md:flex items-center gap-6">
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
          <div className="hidden md:flex items-center bg-surface-container-low px-3 py-1.5 rounded border border-outline-variant/20">
            <span className="material-symbols-outlined text-[18px] text-outline mr-2">
              search
            </span>
            <span className="text-outline font-label-mono text-label-mono">
              Quick Search...
            </span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
            account_circle
          </span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
            settings
          </span>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-lg bg-surface-dim/50 backdrop-blur-2xl border-r border-outline-variant/10 w-[240px] pt-20">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-primary text-[20px]">
                fingerprint
              </span>
            </div>
            <div>
              <p className="font-label-mono text-label-mono uppercase tracking-widest text-surface-tint">
                OS.01
              </p>
              <p className="text-[10px] text-outline font-label-mono">
                Identity Active
              </p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
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
          <a className="flex items-center gap-4 bg-primary/10 text-primary border-l-2 border-primary px-4 py-3 translate-x-1 transition-all" href="#">
            <span className="material-symbols-outlined">
              psychology
            </span>
            <span className="font-label-mono text-label-mono">
              Intelligence
            </span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-on-surface transition-all" href="#">
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
        <div className="mt-auto px-4 pb-8 flex flex-col gap-4">
          <button className="w-full bg-surface-container-highest border border-outline-variant/30 py-2 rounded flex items-center justify-center gap-2 hover:bg-surface-bright transition-colors">
            <span className="font-label-mono text-label-mono text-on-surface">
              Command K
            </span>
          </button>
          <div className="flex flex-col gap-2">
            <a className="flex items-center gap-4 text-outline px-4 py-1 hover:text-on-surface text-label-mono transition-all" href="#">
              <span className="material-symbols-outlined text-[18px]">
                help_outline
              </span>
              <span>
                Support
              </span>
            </a>
            <a className="flex items-center gap-4 text-outline px-4 py-1 hover:text-on-surface text-label-mono transition-all" href="#">
              <span className="material-symbols-outlined text-[18px]">
                terminal
              </span>
              <span>
                Logs
              </span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="md:ml-[240px] pt-16 min-h-screen flex flex-col w-full">
        <div className="flex-1 p-stack-lg max-w-max-width-content mx-auto w-full">
          {/* Header Section */}
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Perspective Injection
            </h1>
            <p className="text-on-surface-variant mt-1">
              Merging collective source knowledge with personal neural feedback.
            </p>
          </div>
          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1 items-start">
            {/* Left Column: Source Insights */}
            <div className="lg:col-span-3 space-y-gutter">
              <h2 className="font-label-mono text-label-mono uppercase tracking-widest text-outline mb-4">
                Source Insights
              </h2>
              <div className="glass-panel p-4 rounded-xl space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    description
                  </span>
                  <div>
                    <p className="text-body-md font-medium text-on-surface">
                      The Neural Paradox
                    </p>
                    <p className="text-[12px] text-outline mt-1 italic">
                      Journal of Cognitive Science
                    </p>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  "The intersection of artificial logic and human intuition creates a synthetic clarity previously unattainable."
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-[10px] text-outline font-label-mono border border-outline-variant/10">
                    #cognition
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-[10px] text-outline font-label-mono border border-outline-variant/10">
                    #synthesis
                  </span>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl space-y-3 opacity-60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    link
                  </span>
                  <span className="text-body-md font-medium">
                    Digital Ethos v2.4
                  </span>
                </div>
                <p className="text-[13px] text-outline">
                  Meta-data layer containing 14 independent observations on recursive learning.
                </p>
              </div>
              <div className="glass-panel p-4 rounded-xl border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    auto_awesome
                  </span>
                  <span className="text-label-mono text-primary">
                    LIVE STREAM
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3" />
                  </div>
                  <p className="text-[11px] text-outline uppercase tracking-wider">
                    Ingesting source 0x4F...8B
                  </p>
                </div>
              </div>
            </div>
            {/* Center Column: AI Synthesis Engine */}
            <div className="lg:col-span-5 flex flex-col gap-gutter">
              <h2 className="font-label-mono text-label-mono uppercase tracking-widest text-outline mb-4 flex items-center gap-2">
                Synthesis Engine
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full status-pulse" />
              </h2>
              <div className="glass-panel rounded-2xl relative overflow-hidden min-h-[500px] flex flex-col ai-mesh p-8">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[1px] border-violet-500/10 rounded-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* AI Thinking Visualization */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-stack-lg py-12">
                    <div className="w-32 h-32 relative">
                      <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse" />
                      <div className="absolute inset-4 border border-secondary/30 rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[40px]" data-weight="fill">
                          auto_awesome
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-headline-md text-headline-md text-on-surface">
                        Refining Perspective
                      </p>
                      <p className="text-outline font-label-mono mt-2 tracking-widest">
                        LAYER 4: LOGICAL VALIDATION
                      </p>
                    </div>
                  </div>
                  {/* Synthesis Output */}
                  <div className="bg-surface-container-lowest/80 border border-outline-variant/20 p-6 rounded-xl inner-glow relative group">
                    <div className="absolute -top-3 left-4 bg-background px-2 py-0.5 border border-outline-variant/30 rounded">
                      <span className="text-[10px] font-label-mono text-primary uppercase">
                        Active Synthesis
                      </span>
                    </div>
                    <p className="text-body-lg text-on-surface leading-relaxed">
                      The user's disagreement regarding the
                      <span className="text-primary font-medium mx-1">
                        recursive feedback loop
                      </span>
                      is being integrated. System is adjusting weighting from
                      <span className="text-secondary mx-1">
                        0.74
                      </span>
                      to
                      <span className="text-primary-container mx-1">
                        0.62
                      </span>
                      to align with subjective human nuances.
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[11px] font-label-mono text-outline">
                      <span>
                        CONVERGENCE: 92%
                      </span>
                      <span>
                        LATENCY: 14MS
                      </span>
                    </div>
                  </div>
                </div>
                {/* AI Decorative Mesh */}
                <div className="absolute bottom-0 right-0 p-4 opacity-20">
                  <span className="material-symbols-outlined text-[120px] text-primary">
                    blur_on
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-on-primary-container font-medium py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    done_all
                  </span>
                  Commit Synthesis
                </button>
                <button className="px-4 border border-outline-variant/30 rounded-lg hover:bg-white/5 transition-all">
                  <span className="material-symbols-outlined text-on-surface">
                    refresh
                  </span>
                </button>
              </div>
            </div>
            {/* Right Column: User Input */}
            <div className="lg:col-span-4 space-y-gutter">
              <h2 className="font-label-mono text-label-mono uppercase tracking-widest text-outline mb-4">
                Neural Feedback
              </h2>
              <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
                <div>
                  <label className="font-label-mono text-label-mono text-outline uppercase mb-2 block">
                    Your Perspective
                  </label>
                  <textarea className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface placeholder:text-outline/40 min-h-[120px] resize-none py-2 outline-none" placeholder="Inject your thoughts, experiences, or contradictions here..." />
                </div>
                <div className="space-y-4">
                  <label className="font-label-mono text-label-mono text-outline uppercase block">
                    Emotional Valence
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-outline">
                      mood_bad
                    </span>
                    <input className="flex-1 accent-primary h-1 bg-outline-variant/20 rounded-full appearance-none cursor-pointer" type="range" />
                    <span className="material-symbols-outlined text-primary">
                      mood
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-surface-container border border-outline-variant/30 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-bright transition-all">
                    <span className="material-symbols-outlined text-[18px]">
                      history_edu
                    </span>
                    <span className="text-body-md">
                      Log Story
                    </span>
                  </button>
                  <button className="bg-surface-container border border-outline-variant/30 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-bright transition-all">
                    <span className="material-symbols-outlined text-[18px]">
                      balance
                    </span>
                    <span className="text-body-md">
                      Challenge AI
                    </span>
                  </button>
                </div>
              </div>
              {/* Recent Injections */}
              <div className="space-y-4">
                <h3 className="font-label-mono text-label-mono text-outline uppercase px-2">
                  History
                </h3>
                <div className="glass-panel p-4 rounded-xl border-l-4 border-secondary/40">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[11px] font-label-mono text-secondary uppercase">
                      Disagreement logged
                    </p>
                    <p className="text-[11px] text-outline">
                      2m ago
                    </p>
                  </div>
                  <p className="text-body-md text-on-surface-variant">
                    "The premise assumes logical actors, but the dataset neglects cultural variance."
                  </p>
                </div>
                <div className="glass-panel p-4 rounded-xl border-l-4 border-primary/40">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[11px] font-label-mono text-primary uppercase">
                      Story Validated
                    </p>
                    <p className="text-[11px] text-outline">
                      15m ago
                    </p>
                  </div>
                  <p className="text-body-md text-on-surface-variant">
                    Confirmed previous synthesis with personal anecdote from Q3 operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="w-full flex justify-between items-center px-container-padding py-stack-md mt-auto bg-transparent">
          <div className="flex items-center gap-6">
            <span className="font-label-mono text-label-mono text-outline">
              ETHOS Identity OS © 2024
            </span>
          </div>
          <div className="flex items-center gap-8">
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
      </main>

      {/* Floating UI element (Visual Indicator) */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="glass-panel px-4 py-2 rounded-full border-primary/30 flex items-center gap-3 shadow-xl">
          <span className="w-2 h-2 bg-primary rounded-full status-pulse" />
          <span className="text-label-mono text-[10px] text-primary tracking-[0.2em] uppercase">
            Neural Link Stable
          </span>
        </div>
      </div>
    </div>
  );
}
