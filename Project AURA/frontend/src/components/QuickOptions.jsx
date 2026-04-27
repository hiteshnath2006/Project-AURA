import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Dumbbell, Zap, Activity, ShieldAlert, Brain } from 'lucide-react';

const options = [
    { title: "Fat Loss Tips", id: 'fat-loss', icon: Flame, query: "fat loss tips", colorClass: "text-cyber-amber", bgClass: "glass-panel-amber" },
    { title: "Muscle Building", id: 'muscle-building', icon: Dumbbell, query: "high protein muscle building diet", colorClass: "text-blue-400", bgClass: "glass-panel" },
    { title: "Energy Boost", id: 'energy', icon: Zap, query: "pre-workout energy boosters", colorClass: "text-yellow-400", bgClass: "glass-panel-amber" },
    { title: "Sugar Control", id: 'sugar-control', icon: Activity, query: "blood sugar control and low gi foods", colorClass: "text-cyber-emerald", bgClass: "glass-panel-emerald" },
    { title: "Detox & Recovery", id: 'detox', icon: ShieldAlert, query: "detox and recovery meals", colorClass: "text-gray-600", bgClass: "glass-panel" },
    { title: "Brain Fuel", id: 'brain-fuel', icon: Brain, query: "cognitive enhancement foods", colorClass: "text-cyber-violet", bgClass: "glass-panel-violet" },
];

const QuickOptions = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl mx-auto mt-8 px-4"
        >
            <h2 className="text-xl font-mono text-gray-400 mb-6 uppercase tracking-widest text-center font-bold">
                Personalized Protocols
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {options.map((opt, i) => (
                    <Link to={`/protocol/${opt.id}`} key={i}>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${opt.bgClass} p-8 cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-2xl transition-all w-full border border-gray-100/50 group`}
                        >
                            <div className={`p-4 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                                <opt.icon className={`w-10 h-10 ${opt.colorClass}`} />
                            </div>
                            <span className="font-mono font-black text-xs uppercase tracking-tighter text-gray-600 text-center">{opt.title}</span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default QuickOptions;
