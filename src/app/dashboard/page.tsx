"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultItems = [
  { id: 1, type: 'draft', title: 'EthOS Product Architecture', content: 'EthOS is an AI-powered identity platform that converts disparate information streams into authentic thought leadership. It acts as an "operating system for personal brand building." The system architecture includes a multi-agent AI pipeline for insight extraction and identity-aligned content generation.', date: 'Today' },
  { id: 2, type: 'idea', title: 'Data Source Integrations Strategy', content: 'We need to support Gmail/Newsletters via Google Cloud OAuth (gmail.readonly). For Kindle, we can rely on Readwise API integration or build a custom Chrome extension to scrape read.amazon.com/notebook. Notion will use the official public API.', date: 'Yesterday' },
  { id: 3, type: 'idea', title: 'Simplified Dashboard UI', content: 'Drop the complex "cyberpunk" charts and neon text. The dashboard must feel like a modern, clean SaaS tool. Focus on a simple "What\'s on your mind?" input, a Feed for Recent Activity, and a clean Sidebar.', date: 'Yesterday' }
];

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [newIdea, setNewIdea] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  
  const [items, setItems] = useState(defaultItems);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dbIntegrations, setDbIntegrations] = useState<any[]>([]);

  useEffect(() => {
    if (activeView === 'integrations') {
      fetch("http://localhost:8000/api/v1/auth/status?user_id=12345678-1234-5678-1234-567812345678")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setDbIntegrations(data);
        })
        .catch(err => console.error("Backend not running yet, using local state", err));
    }
  }, [activeView]);

  useEffect(() => {
    const saved = localStorage.getItem('ethos_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage items");
      }
    }
    
    const savedSources = localStorage.getItem('ethos_sources');
    if (savedSources) {
      try {
        setConnectedSources(JSON.parse(savedSources));
      } catch (e) {
        // ignore
      }
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ethos_items', JSON.stringify(items));
      localStorage.setItem('ethos_sources', JSON.stringify(connectedSources));
    }
  }, [items, connectedSources, isLoaded]);

  const handleSaveIdea = () => {
    if (!newIdea.trim()) return;
    setItems([{
      id: Date.now(),
      type: 'idea',
      title: newIdea.split('\n')[0].substring(0, 40) + '...',
      content: newIdea,
      date: 'Just now'
    }, ...items]);
    setNewIdea('');
  };

  const handleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try Google Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setNewIdea(prev => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const handleConnect = (source: string) => {
    if (source === 'gmail') {
      setIsConnecting('gmail');
      window.location.href = "http://localhost:8000/api/v1/auth/google/login?user_id=12345678-1234-5678-1234-567812345678";
      return;
    }
    
    setIsConnecting(source);
    setTimeout(() => {
      setConnectedSources(prev => [...prev, source]);
      setIsConnecting(null);
    }, 1500);
  };

  const filteredItems = items.filter(item => {
    if (activeView === 'ideas' && item.type !== 'idea') return false;
    if (activeView === 'drafts' && item.type !== 'draft') return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex w-full min-h-screen bg-surface-dim">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-outline-variant/10 flex flex-col p-6 hidden md:flex">
        <Link href="/" className="text-xl font-semibold tracking-tight text-on-surface mb-10">
          Ethos
        </Link>
        <nav className="flex flex-col gap-2 flex-1">
          <button onClick={() => setActiveView('home')} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${activeView === 'home' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
            <span className="material-symbols-outlined text-[20px]">home</span>
            Home
          </button>
          <button onClick={() => setActiveView('ideas')} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${activeView === 'ideas' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            Ideas
          </button>
          <button onClick={() => setActiveView('drafts')} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${activeView === 'drafts' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
            <span className="material-symbols-outlined text-[20px]">article</span>
            Drafts
          </button>
          <button onClick={() => setActiveView('integrations')} className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${activeView === 'integrations' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
            <span className="material-symbols-outlined text-[20px]">cable</span>
            Data Sources
          </button>
        </nav>
        <div className="mt-auto">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg font-medium transition-all">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header className="h-20 border-b border-outline-variant/10 flex items-center justify-between px-8 bg-surface-dim/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-lg font-medium text-on-surface capitalize">{activeView === 'home' ? 'Home' : activeView}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">search</span>
              <input 
                type="text" 
                placeholder="Search notes & drafts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-surface-container border border-outline-variant/20 rounded-full py-1.5 pl-9 pr-4 text-sm text-on-surface outline-none focus:border-primary w-64 transition-all"
              />
            </div>
            <button className="px-4 py-1.5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:brightness-110 transition-all shadow-sm">
              New Draft
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface text-[20px]">person</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-8">
          
          {activeView !== 'integrations' && (
            <>
              {/* Input Box (Only on Home or Ideas) */}
              {(activeView === 'home' || activeView === 'ideas') && (
                <section className="bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-sm relative">
                  <h3 className="text-base font-medium text-on-surface mb-3">What's on your mind?</h3>
                  <textarea 
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none h-24 mb-4 text-sm"
                    placeholder="Paste a link, write a raw thought, or drop some notes..."
                  ></textarea>
                  
                  {isRecording && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-container-highest p-4 rounded-xl shadow-xl flex items-center gap-3 border border-red-500/30">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-on-surface">Listening...</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 text-on-surface-variant">
                      <button 
                        onClick={handleVoice} 
                        className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${isRecording ? 'text-red-400 bg-red-400/10' : 'hover:bg-white/5'}`} 
                        title="Voice Memo"
                      >
                        <span className="material-symbols-outlined text-[20px]">mic</span>
                        <span className="text-xs font-medium">{isRecording ? 'Stop' : 'Voice'}</span>
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Add Link">
                        <span className="material-symbols-outlined text-[20px]">link</span>
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Upload Document">
                        <span className="material-symbols-outlined text-[20px]">attach_file</span>
                      </button>
                    </div>
                    <button 
                      onClick={handleSaveIdea}
                      disabled={!newIdea.trim()}
                      className="px-5 py-2 bg-on-surface text-surface-dim text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Save Idea
                    </button>
                  </div>
                </section>
              )}

              {/* Activity/Feed */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-on-surface">
                    {searchQuery ? `Search Results for "${searchQuery}"` : activeView === 'home' ? 'Recent Activity' : activeView === 'ideas' ? 'Your Ideas' : 'Your Drafts'}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-outline-variant/20 rounded-2xl">
                      <span className="material-symbols-outlined text-outline-variant text-4xl mb-2">search_off</span>
                      <p className="text-on-surface-variant">No items found.</p>
                    </div>
                  ) : (
                    filteredItems.map(item => (
                      <div key={item.id} className="bg-surface-container p-5 rounded-2xl border border-outline-variant/10 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] uppercase tracking-wider font-medium px-2 py-1 rounded ${item.type === 'draft' ? 'text-primary bg-primary/10' : 'text-on-surface-variant bg-surface-container-high border border-outline-variant/20'}`}>
                            {item.type === 'draft' ? 'Draft Ready' : 'Idea Saved'}
                          </span>
                          <span className="text-xs text-on-surface-variant">{item.date}</span>
                        </div>
                        <h4 className="text-on-surface font-medium">{item.title}</h4>
                        <p className="text-sm text-on-surface-variant whitespace-pre-wrap line-clamp-3">{item.content}</p>
                        <div className="mt-2 flex gap-3">
                          {item.type === 'draft' ? (
                            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                              Review Draft <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                            </button>
                          ) : (
                            <>
                              <button className="text-sm font-medium text-on-surface border border-outline-variant/30 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors">
                                Edit Note
                              </button>
                              <button className="text-sm font-medium text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Generate Post
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </>
          )}

          {activeView === 'integrations' && (
            <section className="flex flex-col gap-6">
              <div className="mb-2">
                <h3 className="text-2xl font-semibold text-on-surface mb-2">Data Sources</h3>
                <p className="text-on-surface-variant">Connect your platforms to automatically sync knowledge, read emails, and ingest content to build your identity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'gmail', title: 'Gmail & Newsletters', icon: 'mail', color: '#EA4335', desc: 'Sync specific newsletters and emails automatically.' },
                  { id: 'twitter', title: 'Twitter / X', icon: 'tag', color: '#1DA1F2', desc: 'Ingest your bookmarks, threads, and liked tweets.' },
                  { id: 'rss', title: 'RSS Feeds', icon: 'rss_feed', color: '#F26522', desc: 'Connect directly to your favorite blogs and sites.' },
                  { id: 'pdf', title: 'Upload PDFs', icon: 'picture_as_pdf', color: '#FF0000', desc: 'Upload documents for context extraction and memory.' }
                ].map(source => {
                  const isDbConnected = dbIntegrations.find(i => i.provider === source.id);
                  const isLocalConnected = connectedSources.includes(source.id);
                  const isConnected = isDbConnected || isLocalConnected;
                  
                  return (
                    <div key={source.id} className="bg-surface-container p-6 rounded-2xl border border-outline-variant/10 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-surface-container-high text-on-surface`}>
                          <span className="material-symbols-outlined text-[28px]">{source.icon}</span>
                        </div>
                        {isConnected && (
                          <div className="flex flex-col items-end text-right">
                            <span className="text-[10px] font-label-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">HEALTHY</span>
                            {isDbConnected && <span className="text-[10px] font-label-mono text-outline mt-1">Sync: {new Date(isDbConnected.last_synced).toLocaleTimeString()}</span>}
                            <span className="text-[10px] font-label-mono text-outline mt-1">Status: Active</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-on-surface font-medium text-lg">{source.title}</h4>
                        <p className="text-sm text-on-surface-variant mt-1">{source.desc}</p>
                      </div>
                      <button 
                        onClick={() => {
                          if (isConnected) {
                            // Allow disconnecting to reset state
                            setConnectedSources(prev => prev.filter(s => s !== source.id));
                          } else {
                            handleConnect(source.id);
                          }
                        }}
                        className={`mt-auto w-full py-2 text-sm font-medium rounded-lg transition-all border ${
                          isConnected 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 flex items-center justify-center gap-2' 
                            : 'bg-surface-container-highest text-on-surface hover:brightness-110 border-outline-variant/20'
                        }`}
                      >
                        {isConnecting === source.id ? 'Connecting...' : isConnected ? (
                          <>
                            <span className="material-symbols-outlined text-[18px]">link_off</span>
                            Disconnect
                          </>
                        ) : `Connect ${source.title.split(' ')[0]}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
