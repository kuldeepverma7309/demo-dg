import express from 'express';
import { getUser, login, signup } from '../controllers/user.js';
import { isAdmin } from '../middleware/auth.js';
import { isSessionValid } from '../middleware/isValidSession.js';
import { whiteListedPaths } from '../utils/validation.js';

const router = express.Router();

// Middleware to check whitelisted paths
// router.use((req, res, next) => {
//     const isWhitelisted = whiteListedPaths.some(pattern => pattern.test(req.path));
//     console.log(isWhitelisted)
//     if (isWhitelisted) {
//         next(); // Proceed if the path is whitelisted
//     } else {
//         res.status(403).json({ error: 'Access denied: Path not whitelisted.' });
//     }
// });

// Define routes
router.post('/login', login); // Login route
router.post('/register', signup); // Registration route
router.get('/protected', isSessionValid, isAdmin, getUser); // Protected route

export default router;