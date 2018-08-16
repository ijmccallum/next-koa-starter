import UserModel from "./userModel";
import findById from "./userQueryFindById";

const remove = (id: String) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject("id is required to delete a user");
      return;
    }

    let existingUser = await findById(id);
    if (!existingUser) {
      resolve("could not find user by that id");
      return;
    }

    UserModel.remove({ id }, (err: Error, res: Object) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

export default remove;
