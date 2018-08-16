import UserModel from "./userModel";

const findByEmail = (email: String) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email }, (err: Error, user: Object) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
};

export default findByEmail;
