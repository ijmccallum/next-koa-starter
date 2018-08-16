const bcrypt = require("bcrypt");

const hash = (password: String) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err: Error, hash: String) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const compare = ({ password, hash }: { password: String; hash: String }) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err: Error) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export default {
  hash,
  compare
};
