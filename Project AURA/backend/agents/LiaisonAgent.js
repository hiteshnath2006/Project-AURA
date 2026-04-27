const { analyzeBurn, analyzeSatiety, analyzeSentinel, analyzeGlycemic } = require('./SubAgents');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini if API Key is present
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

class LiaisonAgent {
    static async processQuery(query, profileData = {}) {
        const burnData = analyzeBurn(query);
        const satietyData = analyzeSatiety(query);
        const sentinelData = analyzeSentinel(query);
        const glycemicData = analyzeGlycemic(query);

        const { weight, stress, meal, upcomingMeal } = profileData;

        // If we have a real API Key, let Gemini synthesize the Council's findings
        if (model) {
            try {
                const prompt = `
                    You are AURA (AI-Unified Regional Alchemist), a hyper-personalized nutrition bot.
                    
                    USER DATA:
                    - Query: "${query}"
                    - Weight: ${weight || 'Unknown'}kg
                    - Stress Level: ${stress || 5}/10
                    - Current Meal: "${meal || 'None'}"
                    - Upcoming Meal: "${upcomingMeal || 'None'}"
                    
                    COUNCIL AGENT DATA:
                    - Burn Analysis: ${burnData.trace} (Score: ${burnData.score})
                    - Neural Analysis: ${satietyData.trace}
                    - Safety Status: ${sentinelData.trace}
                    - Glycemic Status: ${glycemicData.trace}
                    
                    TASK:
                    Generate a deep metabolic insight report in Markdown. 
                    1. Review the query based on the user's weight and stress.
                    2. Audit the Current and Upcoming meals. Specifically check for fast food and suggest alterations/recipe tips.
                    3. Incorporate sourced research-style insights.
                    4. Keep it concise, professional, and helpful.
                `;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                return {
                    liaisonTrace: "Gemini Synthesis Complete.",
                    executiveSummary: response.text(),
                    subAgents: { BURN: burnData, SATIETY: satietyData, SENTINEL: sentinelData, GLYCEMIC: glycemicData }
                };
            } catch (error) {
                console.error("Gemini Error:", error);
                // Fallback to internal logic on API failure
            }
        }

        // FALLBACK: Internal Hardcoded Logic (Existing)
        const lowerQuery = query.toLowerCase();
        let summary = `## Deep Insight: "${query}"\n\n`;

        if (lowerQuery.includes('fat loss')) {
            summary += `### 🔍 Sourced Research: Lipolysis Optimization\n` +
                       `Studies suggest that at a bodyweight of **${weight || 70}kg**, a caloric deficit of 20% improves mitochondrial density. Your stress level of **${stress || 5}/10** is critical here; high cortisol can halt fat oxidation. \n\n`;
        } else if (lowerQuery.includes('muscle building')) {
            summary += `### 🔍 Sourced Research: Anabolic Hypertrophy\n` +
                       `At **${weight || 70}kg**, aim for roughly **${Math.round((weight || 70) * 1.8)}g/day** of protein.\n\n`;
        }

        const auditMeal = (mealText, label) => {
            if (!mealText) return "";
            const isFastFood = ['burger', 'fries', 'pizza', 'fried'].some(k => mealText.toLowerCase().includes(k));
            return `#### ${label}: "${mealText}"\n` + (isFastFood ? `⚠️ **Fast Food Review:** Swap the bun for a lettuce wrap.\n` : `✅ **Healthy Food Review:** Add turmeric for antioxidants.\n`) + "\n";
        };

        if (meal || upcomingMeal) {
            summary += `### Personal Meal Audit:\n` + auditMeal(meal, "Current Meal") + auditMeal(upcomingMeal, "Upcoming Meal");
        }

        summary += `### Strategy Tips:\n1. **Thermogenic:** ${burnData.suggestions[0]}.\n2. **Buffer:** ${glycemicData.buffers[0]}.\n`;

        return {
            liaisonTrace: "Internal Protocol synthesis complete.",
            executiveSummary: summary,
            subAgents: { BURN: burnData, SATIETY: satietyData, SENTINEL: sentinelData, GLYCEMIC: glycemicData }
        };
    }
}

module.exports = LiaisonAgent;
