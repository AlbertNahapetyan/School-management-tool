export const adminCheckMiddleware = async ({ req }) => {
    if (req.user?.role !== 'admin') {
        throw new Error('You must be an admin to perform this action');
    }
};
