import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-surface-dim flex flex-col">
      <header className="w-full flex justify-between items-center px-8 h-20 border-b border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-on-surface">Ethos</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <a className="text-on-surface-variant hover:text-on-surface text-sm font-medium transition-colors" href="#features">Features</a>
          <a className="text-on-surface-variant hover:text-on-surface text-sm font-medium transition-colors" href="#pricing">Pricing</a>
        </nav>
        <div>
          <Link href="/login" className="px-5 py-2.5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:brightness-110 transition-all">
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto py-24">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-on-surface leading-tight mb-6">
          Your personal brand, <br/><span className="text-primary">powered by AI.</span>
        </h1>
        <p className="text-lg text-on-surface-variant mb-10 max-w-xl">
          Drop in your raw thoughts, links, and ideas. Ethos automatically turns them into polished, authentic content ready to be published.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/login" className="px-8 py-3.5 bg-primary text-on-primary text-base font-medium rounded-lg hover:brightness-110 transition-all">
            Start for free
          </Link>
          <a href="#demo" className="px-8 py-3.5 bg-surface-container border border-outline-variant/30 text-on-surface text-base font-medium rounded-lg hover:bg-surface-container-high transition-all">
            See how it works
          </a>
        </div>
      </main>

      {/* Very simple feature section */}
      <section id="features" className="py-24 bg-surface-container-lowest px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-4 text-3xl">edit_document</span>
            <h3 className="text-lg font-semibold mb-2 text-on-surface">Capture Thoughts</h3>
            <p className="text-on-surface-variant text-sm">Write down your ideas unedited. The AI will understand your context.</p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-4 text-3xl">psychology</span>
            <h3 className="text-lg font-semibold mb-2 text-on-surface">Learn Your Voice</h3>
            <p className="text-on-surface-variant text-sm">Ethos analyzes your writing style so every generated post sounds exactly like you.</p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-4 text-3xl">send</span>
            <h3 className="text-lg font-semibold mb-2 text-on-surface">Ready to Publish</h3>
            <p className="text-on-surface-variant text-sm">Get high-quality tweets, LinkedIn posts, and newsletter drafts in seconds.</p>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 border-t border-outline-variant/10 text-center text-sm text-on-surface-variant mt-auto">
        <p>© 2024 Ethos. All rights reserved.</p>
      </footer>
    </div>
  );
}
