import UserModel from "./userModel";
import hasher from "../../auth/hasher";
import findByEmail from "./userQueryFindByEmail";

const create = ({
  email,
  password,
  username
}: {
  email: String;
  username: String;
  password: String;
}) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password || !username) {
      reject("incomplete data for new user");
      return;
    }
    let existingUser = await findByEmail(email);
    if (existingUser) {
      reject("user already exists");
      return;
    }
    let hashword = await hasher.hash(password);
    UserModel.create(
      { email, username, password: hashword },
      (err: Error, user: Object) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      }
    );
  });
};

export default create;
