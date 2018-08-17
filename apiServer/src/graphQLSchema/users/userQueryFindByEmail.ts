import UserModel, { UserInterface } from "./userModel";

const findByEmail = (email: String) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email }, (err: Error, user: UserInterface) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
};

export default findByEmail;
