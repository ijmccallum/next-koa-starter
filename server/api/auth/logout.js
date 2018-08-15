const logout = async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401;
    }
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.body = {
            loggedout: true
        };
    }
    next();
};
module.exports = logout;
//# sourceMappingURL=logout.js.map