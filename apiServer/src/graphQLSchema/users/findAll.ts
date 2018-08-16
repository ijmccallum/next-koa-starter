import UserModel from "./userModel";

const findAll = () => {
  return new Promise((resolve, reject) => {
    UserModel.find((err: Error, users: Array<Object>) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(users);
    });
  });
};

export default findAll;
