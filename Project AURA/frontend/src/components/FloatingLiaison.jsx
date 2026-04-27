import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare, Sparkles } from 'lucide-react';
import ChatBot from './ChatBot';

const FloatingLiaison = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="mb-6 w-[400px] max-w-[90vw]"
                    >
                        <div className="relative shadow-2xl rounded-3xl overflow-hidden glass-panel border-gray-100">
                            {/* Close Button Inside Chat */}
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-[110] p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <ChatBot isEmbedded={true} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <div className="flex justify-end">
                <motion.button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsOpen(!isOpen)}
                    animate={isOpen ? { scale: 0.9 } : (isHovered ? { scale: 1.15 } : { scale: [1, 1.05, 1] })}
                    transition={!isOpen && !isHovered ? { repeat: Infinity, duration: 3 } : { duration: 0.2 }}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl shadow-emerald-200 
                        ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-gradient-to-br from-cyber-emerald to-cyber-violet'}`}
                >
                    {/* Pulsing Outer Ring */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.span 
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: [0, 0.5, 0], scale: 1.8 }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full bg-cyber-emerald pointer-events-none"
                            ></motion.span>
                        )}
                    </AnimatePresence>

                    {isOpen ? (
                        <X className="w-8 h-8 text-white" />
                    ) : (
                        <div className="relative">
                            <Bot className="w-10 h-10 text-white" />
                            <motion.div 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="absolute -top-1 -right-1"
                            >
                                <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                            </motion.div>
                        </div>
                    )}
                </motion.button>
            </div>
            
            {/* Hover Tooltip */}
            <AnimatePresence>
                {isHovered && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute bottom-6 right-24 bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl"
                    >
                        Sync with AURA Council
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingLiaison;
