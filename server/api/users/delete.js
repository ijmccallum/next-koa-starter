const userQueries = require("./userQueries.ts");
const deleteUser = async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401;
    }
    if (ctx.isAuthenticated()) {
        if (!ctx.request.body._id) {
            ctx.body = {
                error: "a user id is required to delete a user"
            };
            ctx.status = 400;
        }
        else {
            const userDeleteRes = await userQueries.remove(ctx.request.body._id);
            ctx.body = {
                user: userDeleteRes
            };
        }
    }
    next();
};
module.exports = deleteUser;
//# sourceMappingURL=delete.js.map