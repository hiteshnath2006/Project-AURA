import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Brain, ShieldAlert, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AgentCard = ({ title, icon: Icon, delay, colorClass, borderClass, children }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        className={`glass-panel ${borderClass} p-6 h-full flex flex-col relative overflow-hidden`}
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.03] rounded-bl-full pointer-events-none -mr-4 -mt-4 text-white"></div>
        <div className={`flex items-center gap-3 mb-4 ${colorClass}`}>
            <Icon className="w-6 h-6" />
            <h3 className="font-mono text-lg font-bold tracking-widest uppercase">{title}</h3>
        </div>
        <div className="flex-1 text-sm text-gray-300 leading-relaxed z-10 flex flex-col">
            {children}
        </div>
    </motion.div>
);

const Dashboard = ({ data }) => {
    if (!data) return null;

    const { BURN, SATIETY, SENTINEL, GLYCEMIC } = data;

    const glycemicData = [
        { time: '0', level: 80 },
        { time: '1H', level: GLYCEMIC.spike === 'High' ? 180 : 110 },
        { time: '2H', level: GLYCEMIC.spike === 'High' ? 140 : 90 },
        { time: '3H', level: 85 },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            
            {/* Agent BURN */}
            <AgentCard title="BURN Facility" icon={Flame} delay={0.1} colorClass="text-cyber-amber" borderClass="glass-panel-amber">
                <p className="mb-4 italic opacity-80 border-l-2 border-cyber-amber pl-3 flex-1">{BURN.trace}</p>
                
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1 font-mono uppercase text-cyber-amber">
                        <span>Thermogenic Capacity</span>
                        <span>{BURN.score}/100</span>
                    </div>
                    <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${BURN.score}%` }} 
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-red-500 to-cyber-amber h-full"
                        ></motion.div>
                    </div>
                </div>

                <div className="bg-black/20 p-3 rounded text-xs font-mono">
                    <span className="text-cyber-amber">RECOMMENDATION:</span> {BURN.suggestions.join(', ')}
                </div>
            </AgentCard>

            {/* Agent SATIETY */}
            <AgentCard title="Neural Architect" icon={Brain} delay={0.2} colorClass="text-cyber-violet" borderClass="glass-panel-violet">
                <p className="mb-4 italic opacity-80 border-l-2 border-cyber-violet pl-3 flex-1">{SATIETY.trace}</p>
                <div className="space-y-2 mt-auto">
                    <p className="font-mono text-xs text-cyber-violet uppercase">Neuro-Swaps Detected:</p>
                    <ul className="text-xs space-y-2">
                        {SATIETY.neuroSwaps.map((s, i) => (
                            <li key={i} className="flex gap-2 items-start bg-black/20 p-2 rounded">
                                <span className="text-cyber-violet">+{i+1}</span> {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </AgentCard>

            {/* Agent SENTINEL */}
            <AgentCard title="Safety Sentinel" icon={ShieldAlert} delay={0.3} colorClass="text-white" borderClass={SENTINEL.status === 'Warning' ? 'glass-panel-amber' : 'glass-panel-emerald'}>
                 <p className="mb-4 italic opacity-80 border-l-2 border-white/50 pl-3 flex-1">{SENTINEL.trace}</p>
                 <div className="mt-auto flex items-center justify-between bg-black/20 p-3 rounded">
                    <div>
                        <p className="text-xs uppercase font-mono opacity-50">Status</p>
                        <p className={`font-bold text-lg font-mono ${SENTINEL.status === 'Warning' ? 'text-cyber-amber' : 'text-cyber-emerald'}`}>
                            {SENTINEL.status}
                        </p>
                    </div>
                    <div className="text-right text-xs max-w-[60%]">
                        {SENTINEL.eNumbers}
                    </div>
                 </div>
            </AgentCard>

            {/* Agent GLYCEMIC */}
            <AgentCard title="Metabolic Guard" icon={Activity} delay={0.4} colorClass="text-blue-400" borderClass="glass-panel">
                 <p className="mb-2 italic opacity-80 border-l-2 border-blue-400 pl-3">{GLYCEMIC.trace}</p>
                 <div className="flex-1 w-full h-24 my-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={glycemicData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={GLYCEMIC.spike === 'High' ? "#f59e0b" : "#3b82f6"} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={GLYCEMIC.spike === 'High' ? "#f59e0b" : "#3b82f6"} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} />
                            <Area type="monotone" dataKey="level" stroke={GLYCEMIC.spike === 'High' ? "#f59e0b" : "#3b82f6"} fillOpacity={1} fill="url(#colorLevel)" />
                        </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="bg-black/20 p-2 rounded text-xs mt-auto">
                    <span className="text-blue-400 font-mono uppercase">Buffer Protocol:</span> {GLYCEMIC.buffers.join(', ')}
                 </div>
            </AgentCard>

        </div>
    );
};

export default Dashboard;
