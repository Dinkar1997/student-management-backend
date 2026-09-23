const { verifyToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(400).json({
                status: false,
                message: "Authorization header is required"
            })
        };

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        };

        const decode = await verifyToken(token);
        req.user = decode;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authenticate;