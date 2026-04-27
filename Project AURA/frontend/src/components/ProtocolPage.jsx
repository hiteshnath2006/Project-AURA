import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, BookOpen, Sparkles, Activity } from 'lucide-react';

const ProtocolPage = () => {
    const { categoryId } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const categories = {
        'fat-loss': { title: "Fat Loss Strategy", query: "fat loss tips" },
        'muscle-building': { title: "Hypertrophy Protocol", query: "high protein muscle building diet" },
        'energy': { title: "Energy Bio-hack", query: "pre-workout energy boosters" },
        'sugar-control': { title: "Glucose Management", query: "blood sugar control and low gi foods" },
        'detox': { title: "Recovery Systems", query: "detox and recovery meals" },
        'brain-fuel': { title: "Cognitive Synthesis", query: "cognitive enhancement foods" }
    };

    const category = categories[categoryId] || { title: "Protocol Analysis", query: categoryId };

    useEffect(() => {
        const fetchProtocol = async () => {
            setIsLoading(true);
            try {
                const profile = JSON.parse(localStorage.getItem('aura_profile') || '{}');
                const response = await fetch('http://localhost:8080/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: category.query, profileData: profile })
                });
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProtocol();
    }, [categoryId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 font-mono">
                <Loader2 className="w-12 h-12 animate-spin text-cyber-emerald mb-4" />
                <p className="animate-pulse uppercase tracking-[0.2em] text-sm">Synchronizing Council Sources...</p>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mt-6 pb-20"
        >
            <Link to="/" className="inline-flex items-center gap-2 text-cyber-emerald font-bold mb-8 hover:translate-x-[-4px] transition-transform">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="glass-panel p-0 overflow-hidden border-gray-100">
                {/* Header Section */}
                <div className="p-8 border-b border-gray-100 bg-white/50">
                    <div className="flex items-center gap-3 text-cyber-emerald mb-2">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">Case Study Analysis</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">{category.title}</h1>
                </div>

                {/* Content Section */}
                <div className="p-8 bg-gray-50/20">
                    <div className="prose prose-emerald max-w-none text-gray-700">
                        {/* Render Markdown-like executive summary */}
                        <div className="space-y-6">
                            {data.executiveSummary.split('\n').map((line, i) => {
                                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{line.replace('## ', '')}</h2>;
                                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3 border-l-4 border-cyber-emerald pl-3">{line.replace('### ', '')}</h3>;
                                if (line.startsWith('#### ')) return <h4 key={i} className="text-lg font-bold text-gray-700 mt-4 mb-2">{line.replace('#### ', '')}</h4>;
                                if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc mb-1">{line.replace('* ', '')}</li>;
                                if (line.trim() === '') return <div key={i} className="h-2" />;
                                if (line.includes('**')) {
                                    const parts = line.split('**');
                                    return (
                                        <p key={i} className="leading-relaxed">
                                            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-cyber-emerald font-bold">{p}</strong> : p)}
                                        </p>
                                    );
                                }
                                return <p key={i} className="leading-relaxed">{line}</p>;
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="bg-white p-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg text-cyber-emerald">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Verified by AURA Sub-Agents</p>
                    </div>
                    <div className="flex items-center gap-2 text-cyber-emerald font-mono text-xs font-bold">
                        <Activity className="w-4 h-4" /> Live Bio-Sync Active
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProtocolPage;
