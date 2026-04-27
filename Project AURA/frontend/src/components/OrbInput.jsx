import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrbInput = ({ onSelectQuery, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            onSelectQuery(query);
            setQuery('');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto my-8 relative flex flex-col items-center justify-center p-8"
        >
            <div className="absolute inset-0 bg-cyber-emerald/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="relative w-full flex items-center group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-emerald to-cyber-violet rounded-full opacity-25 group-focus-within:opacity-50 blur-lg transition-opacity duration-500"></div>
                <div className="relative w-full flex items-center glass-panel rounded-full overflow-hidden border border-white/20 p-2">
                    <div className="p-3 text-cyber-emerald">
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                    </div>
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Initialize Nutrient Protocol (e.g., 'Salmon and Rice')..."
                        className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 font-mono text-lg px-2"
                        disabled={isLoading}
                    />
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-cyber-emerald/20 hover:bg-cyber-emerald/40 text-cyber-emerald border border-cyber-emerald/50 px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-colors ml-2"
                        disabled={isLoading}
                    >
                        Scan
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default OrbInput;
