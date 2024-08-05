import { Permission } from "../model/permission.js";
import { Role } from "../model/roles.js"; // Import the Role model

export const isAdmin = async (req, res, next) => {
    const userId = req.userId; // Assuming userId is set in the request by a previous middleware

    try {
        // Find the permission entry for the user
        const permission = await Permission.findOne({ userId }).populate('roleId');

        // Check if the permission and role exist
        if (permission && permission.roleId) {
            // Check if the roleId corresponds to the admin role
            if (permission.roleId._id === 1) { // Assuming 1 is the ID for the admin role
                return next(); // User is an admin, proceed to the next middleware/route handler
            } else {
                return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
            }
        } else {
            return res.status(403).json({ error: 'Access denied: No permissions found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};