import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Weight, Zap, Utensils, Save } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        weight: '',
        stress: '5',
        meal: '',
        upcomingMeal: '',
        goal: 'fat loss'
    });

    useEffect(() => {
        const saved = localStorage.getItem('aura_profile');
        if (saved) setProfile(JSON.parse(saved));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('aura_profile', JSON.stringify(profile));
        alert('Biometric Protocol Saved Successfully!');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mt-10 p-8 glass-panel"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyber-emerald/10 rounded-full text-cyber-emerald">
                    <User className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-800">Biometric Profile</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                        <Weight className="w-4 h-4" /> Current Weight (kg)
                    </label>
                    <input 
                        type="number" 
                        name="weight"
                        value={profile.weight}
                        onChange={handleChange}
                        className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyber-emerald outline-none transition-all"
                        placeholder="e.g. 75"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                        <Zap className="w-4 h-4" /> Stress Level (1-10)
                    </label>
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        name="stress"
                        value={profile.stress}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyber-emerald"
                    />
                    <div className="flex justify-between text-xs font-mono text-gray-400 mt-1">
                        <span>Low</span>
                        <span>Level: {profile.stress}</span>
                        <span>Extreme</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                            <Utensils className="w-4 h-4" /> Current Meal
                        </label>
                        <textarea 
                            name="meal"
                            value={profile.meal}
                            onChange={handleChange}
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyber-emerald outline-none transition-all"
                            placeholder="e.g. Grilled Chicken"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                            <Utensils className="w-4 h-4" /> Upcoming Meal
                        </label>
                        <textarea 
                            name="upcomingMeal"
                            value={profile.upcomingMeal}
                            onChange={handleChange}
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyber-emerald outline-none transition-all"
                            placeholder="e.g. Burger and Fries"
                            rows="3"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-cyber-emerald text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-cyber-emerald/20 hover:shadow-cyber-emerald/40 transition-all"
                    >
                        <Save className="w-5 h-5" /> Save Protocol
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
