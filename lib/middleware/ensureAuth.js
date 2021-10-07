module.exports = (req, res, next) => {
    const { userId } = req.cookies;

    if (!userId) {
        throw new Error('you must sign in to continue');
    }

    req.userId = userId;

    next();
};
