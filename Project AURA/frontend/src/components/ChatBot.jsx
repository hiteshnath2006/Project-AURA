import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const ChatBot = ({ isEmbedded = false }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I am AURA. I've analyzed your profile. How can I assist your metabolic goals today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const profile = JSON.parse(localStorage.getItem('aura_profile') || '{}');
            const response = await fetch('http://localhost:8080/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMsg, profileData: profile })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.executiveSummary, insights: data.subAgents }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error sync-ing with the Council. Please check your connection." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex flex-col overflow-hidden border-gray-100 ${isEmbedded ? 'h-[500px] w-full' : 'max-w-4xl mx-auto mt-6 h-[75vh] glass-panel'}`}>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white/50">
                <div className="w-10 h-10 rounded-full bg-cyber-emerald text-white flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">AURA Council</h3>
                    <p className="text-xs text-emerald-600 font-medium">Auto-Sync Active</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-cyber-violet text-white' : 'bg-white border border-gray-100 text-cyber-emerald'}`}>
                                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-cyber-violet text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'}`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                
                                {msg.insights && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-cyber-emerald uppercase tracking-tighter">
                                            <Sparkles className="w-3 h-3" /> Council Insights
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(msg.insights).map(([key, agent]) => (
                                                <div key={key} className="bg-gray-50 p-2 rounded-lg border border-gray-200/50">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{key}</p>
                                                    <p className="text-[11px] text-gray-600 truncate">{agent.trace || agent.status}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 text-gray-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs font-medium">Council is deliberating...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="relative flex items-center gap-2">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask AURA anything..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyber-emerald outline-none transition-all pr-12 text-gray-700"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2 bg-cyber-emerald text-white rounded-lg hover:brightness-110 disabled:opacity-50 transition-all shadow-md shadow-emerald-200"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" /> AURA integrates your biometric profile into every insight.
                </p>
            </div>
        </div>
    );
};

export default ChatBot;
