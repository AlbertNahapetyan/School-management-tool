import { verifyToken } from "../utils/jwt.js";

const getTokenFromHeader = (headers) => {
    const authHeader = headers?.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};

export const authMiddleware = async ({ req, prisma }) => {
    const token = getTokenFromHeader(req.headers);

    try {
        if(token) {
            const decoded = verifyToken(token)
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user) throw new Error('User not found');
            req.user = user;
        } else {
            req.user = null;
        }
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

