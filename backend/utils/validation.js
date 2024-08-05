// Regex patterns for validation
export const validationPatterns = {
    username: /^[a-zA-Z0-9]{3,20}$/, // Alphanumeric, 3-20 characters
    email: /^[a-zA-Z0-9._%+-]+@(gmail|outlook)\.com$/, // Gmail or Outlook
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 chars, 1 upper, 1 lower, 1 digit, 1 special
    role: /^(user|admin)$/ // Only allow 'user' or 'admin'
};

// Whitelisting function for allowed roles
export const allowedRoles = ['user', 'admin'];

// Define whitelisted paths
export const whiteListedPaths = [
    /^\/api\/auth\/register$/, // Allow POST requests to /api/auth/register
    /^\/api\/auth\/login$/,    // Allow POST requests to /api/auth/login
    /^\/api\/auth\/protected$/, // Allow GET requests to /api/auth/protected
];

// Function to validate input against a pattern
export const validateInput = (input, pattern) => {
    return pattern.test(input);
};

// Function to check if a role is allowed
export const isRoleAllowed = (role) => {
    return allowedRoles.includes(role);
};