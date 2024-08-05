import { Session } from "../model/session.js";

export const isSessionValid = async (req, res, next) => {
    const sessionId = req.headers.sessionid; // Get session ID from headers
    try {
        const session = await Session.findOne({ sessionId });
        if (session) {
            req.userId = session.userId; // Set userId in request for further use
            next();
        } else {
            res.status(403).json({ error: 'Access denied: Invalid session' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};