const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetailsFromToken(token);

        if (!user || user.logout) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = authMiddleware;