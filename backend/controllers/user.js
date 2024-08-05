import { Session } from "../model/session.js";
// import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../model/user.model.js";
import { validateInput, validationPatterns } from "../utils/validation.js";
import { Role } from "../model/roles.js";
import roles from "../config/roles.js";
import { Permission } from "../model/permission.js";

export const signup = async (req, res, next) => {
    const { username, email, password, roleId } = req.body;

    // Validate inputs
    if (!validateInput(username, validationPatterns.username)) {
        return res.status(400).json({ error: 'Username must be alphanumeric and between 3 to 20 characters.' });
    }
    if (!validateInput(email, validationPatterns.email)) {
        return res.status(400).json({ error: 'Email must be valid and from Gmail or Outlook.' });
    }
    if (!validateInput(password, validationPatterns.password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.' });
    }

    // Get the role from the roles object
    const role = roles[roleId];
    // console.log("role : ", role);
    if (!role) {
        return res.status(400).json({ error: 'Invalid role provided. Allowed roles are: user, admin.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new role entry (if needed)
        const newRole = await Role.create({ _id: roleId, name: role.name, description: role.description });

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Create a permission entry for the new user
        const permission = new Permission({ userId: newUser._id, roleId: newRole._id });
        await permission.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a session
        const sessionId = uuidv4();
        const session = new Session({ sessionId, userId: user._id });
        await session.save();

        // Respond with sessionId and userId
        return res.status(200).json({ sessionId, userId: user._id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getUser = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}