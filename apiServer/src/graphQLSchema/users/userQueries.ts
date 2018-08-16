import UserModel from "./userModel";

import findByEmail from "./userQueryFindByEmail";
import findById from "./userQueryFindById";
import findAll from "./userQueryFindAll";
import create from "./userQueryCreate";
import remove from "./userQueryRemove";

export default {
  findByEmail,
  findById,
  findAll,
  create,
  remove
};
