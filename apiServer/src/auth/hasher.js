const bcrypt = require("bcrypt");
const hash = password => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        });
    });
};
const compare = ({ password, hash }) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, match) {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        });
    });
};
module.exports = {
    hash,
    compare
};
//# sourceMappingURL=hasher.js.map