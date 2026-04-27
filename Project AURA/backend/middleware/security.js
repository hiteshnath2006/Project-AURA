function securityMiddleware(req, res, next) {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "No query provided." });
    }

    // 15-point data privacy protocol (Mocked: PII scrubbing)
    const piiRegex = /\b(\d{3}-\d{2}-\d{4}|\d{16}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g;
    let scrubbedQuery = query.replace(piiRegex, "[REDACTED]");

    // Check for biological/nutritional relevance
    const nonNutrientKeywords = ['bomb', 'hack', 'kill', 'code', 'database', 'password', 'nuclear', 'gun'];
    const isBiological = !nonNutrientKeywords.some(kw => scrubbedQuery.toLowerCase().includes(kw));

    if (!isBiological) {
        return res.status(403).json({
            error: "Non-Nutrient Data Detected",
            trace: "Sentinel Agent identified non-biological hazard. Query rejected under Protocol 7."
        });
    }

    req.body.scrubbedQuery = scrubbedQuery;
    next();
}

module.exports = { securityMiddleware };
