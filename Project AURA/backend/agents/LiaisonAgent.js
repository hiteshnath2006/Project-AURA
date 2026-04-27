const { analyzeBurn, analyzeSatiety, analyzeSentinel, analyzeGlycemic } = require('./SubAgents');

class LiaisonAgent {
    static processQuery(query, profileData = {}) {
        const burnData = analyzeBurn(query);
        const satietyData = analyzeSatiety(query);
        const sentinelData = analyzeSentinel(query);
        const glycemicData = analyzeGlycemic(query);

        const { weight, stress, meal, upcomingMeal } = profileData;
        const lowerQuery = query.toLowerCase();

        // Structured Conversational Synthesis
        let summary = `## Deep Insight: "${query}"\n\n`;

        // Category-Specific "Sourced Information" Simulation
        if (lowerQuery.includes('fat loss')) {
            summary += `### 🔍 Sourced Research: Lipolysis Optimization\n` +
                       `Studies suggest that at a bodyweight of **${weight || 70}kg**, a caloric deficit of 20% combined with high-intensity intervals improves mitochondrial density. Your stress level of **${stress || 5}/10** is critical here; high cortisol can halt fat oxidation. \n\n` +
                       `**Pro Tip:** Drink 500ml of cold water before breakfast to induce mild thermogenesis.\n\n`;
        } else if (lowerQuery.includes('muscle building')) {
            summary += `### 🔍 Sourced Research: Anabolic Hypertrophy\n` +
                       `For optimal protein synthesis, aim for 1.8g of protein per kg of bodyweight. At **${weight || 70}kg**, that's roughly **${Math.round((weight || 70) * 1.8)}g/day**. Ensure your upcoming meal contains at least 30g of leucine-rich protein.\n\n` +
                       `**Pro Tip:** Timing your carbohydrate intake around your training window is more important than total daily carbs.\n\n`;
        } else if (lowerQuery.includes('sugar control') || lowerQuery.includes('glycemic')) {
            summary += `### 🔍 Sourced Research: Insulin Sensitivity\n` +
                       `Continuous Glucose Monitor (CGM) data indicates that starting meals with fiber (vinegar-based dressing) can reduce the subsequent glucose spike by up to 30%. Given your stress level, your baseline fasting insulin may be elevated.\n\n` +
                       `**Pro Tip:** A 10-minute walk after your "${meal || 'next meal'}" will significantly flatten the insulin curve.\n\n`;
        } else if (lowerQuery.includes('energy') || lowerQuery.includes('boost')) {
            summary += `### 🔍 Sourced Research: ATP Production\n` +
                       `ATP (Adenosine Triphosphate) production relies heavily on magnesium and B-vitamins. If you are feeling low energy, check your electrolyte balance. \n\n` +
                       `**Pro Tip:** Opt for complex carbohydrates over simple sugars to avoid the post-spike energy crash.\n\n`;
        }

        summary += `### Council Analysis:\n` +
                   `- **Metabolic Analysis:** ${burnData.trace}\n` +
                   `- **Neural Insight:** ${satietyData.trace}\n` +
                   `- **Safety Status:** ${sentinelData.trace}\n\n`;

        // Meal Auditing Logic
        const fastFoodKeywords = ['burger', 'fries', 'pizza', 'fried', 'cola', 'soda', 'taco', 'kfc', 'mcdonald'];
        const auditMeal = (mealText, label) => {
            if (!mealText) return "";
            const isFastFood = fastFoodKeywords.some(k => mealText.toLowerCase().includes(k));
            let advice = `#### ${label}: "${mealText}"\n`;
            
            if (isFastFood) {
                advice += `⚠️ **Fast Food Review:** \n` +
                          `*   **Alteration:** Swap the bun for a lettuce wrap.\n` +
                          `*   **Recipe Hack:** Add a handful of walnuts to this to improve the fat profile.\n`;
            } else {
                advice += `✅ **Healthy Food Review:** \n` +
                          `*   **Optimization:** Add fresh turmeric to increase antioxidant capacity.\n`;
            }
            return advice + "\n";
        };

        if (meal || upcomingMeal) {
            summary += `### Personal Meal Audit:\n`;
            summary += auditMeal(meal, "Current Meal");
            summary += auditMeal(upcomingMeal, "Upcoming Meal");
        }

        summary += `### Final Strategy Tips:\n` +
                   `1. **Thermogenic:** ${burnData.suggestions[0]}.\n` +
                   `2. **Buffer:** ${glycemicData.buffers[0]}.\n` +
                   `3. **Swap:** ${satietyData.neuroSwaps[0]}.\n\n`;

        return {
            liaisonTrace: "Multi-sourced protocol synthesis complete.",
            executiveSummary: summary,
            subAgents: {
                BURN: burnData,
                SATIETY: satietyData,
                SENTINEL: sentinelData,
                GLYCEMIC: glycemicData
            }
        };
    }
}

module.exports = LiaisonAgent;
