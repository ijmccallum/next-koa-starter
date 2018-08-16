import UserModel from "./userModel";

const findById = (id: String) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ id: id })
      // .populate("padawans")s
      .exec((err: Error, user: Object) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      });
  });
};

export default findById;
