const UserModel = require("./userSchema.ts");

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

const findById = (_id: String) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ _id: _id })
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

const create = (userObj: { email: String }) => {
  return new Promise(async (resolve, reject) => {
    if (!userObj.email) {
      reject("new user re quires an email");
      return;
    }
    let existingUser = await findByEmail(userObj.email);
    if (existingUser) {
      reject("user already exists");
      return;
    }
    UserModel.create(userObj, (err: Error, user: Object) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
};

const remove = (_id: String) => {
  return new Promise(async (resolve, reject) => {
    if (!_id) {
      reject("_id is required to delete a user");
      return;
    }

    let existingUser = await findById(_id);
    if (!existingUser) {
      resolve("could not find user by that id");
      return;
    }

    UserModel.remove({ _id }, (err: Error, res: Object) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

export default {
  findByEmail,
  findById,
  findAll,
  create,
  remove
};
