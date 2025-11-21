import jwt from 'jsonwebtoken';

// Static admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD 

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }

        // Check credentials
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid email or password" 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: ADMIN_EMAIL, role: 'admin' },
            process.env.JWT_SECRET || 'your-secret-key-change-this',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                email: ADMIN_EMAIL,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ 
            success: false,
            message: "Login failed. Please try again." 
        });
    }
};

export const verifyToken = async (req, res) => {
    try {
        // If we reach here, the auth middleware has already verified the token
        res.status(200).json({
            success: true,
            message: "Token is valid",
            user: req.user
        });
    } catch (error) {
        console.error('Verify token error:', error.message);
        res.status(500).json({ 
            success: false,
            message: "Token verification failed" 
        });
    }
};
