import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuickOptions from './components/QuickOptions';
import Profile from './components/Profile';
import ChatBot from './components/ChatBot';
import ProtocolPage from './components/ProtocolPage';
import FloatingLiaison from './components/FloatingLiaison';
import { Network, User, MessageCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="min-h-screen pb-24 relative overflow-hidden bg-cyber-light">
        {/* Background Decor */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyber-emerald/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-cyber-violet/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <Network className="w-8 h-8 text-cyber-emerald group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-black tracking-tighter text-gray-800 font-mono">AURA</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-cyber-emerald transition-colors">
                <Home className="w-4 h-4" /> Home
              </Link>
              <Link to="/profile" className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-cyber-emerald transition-colors">
                <User className="w-4 h-4" /> Profile
              </Link>
            </div>
          </div>
        </nav>

        <header className="relative z-10 text-center mt-12 mb-8">
          <p className="text-cyber-emerald font-mono tracking-[0.3em] text-xs uppercase font-bold mb-2">
            AI-Unified Regional Alchemist
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 border-b-4 border-cyber-emerald inline-block pb-2 px-4">
            Metabolic Intelligence
          </h1>
        </header>

        <main className="relative z-10 px-4">
          <Routes>
            <Route path="/" element={<QuickOptions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/protocol/:categoryId" element={<ProtocolPage />} />
          </Routes>
        </main>

        <FloatingLiaison />

        <footer className="mt-20 text-center text-gray-400 text-[10px] font-mono tracking-widest uppercase">
          Project AURA &copy; 2026 • Hyper-Personalized Nutrition Protocol
        </footer>
      </div>
    </Router>
  );
}

export default App;
