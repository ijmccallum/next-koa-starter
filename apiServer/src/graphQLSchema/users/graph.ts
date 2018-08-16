import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from "graphql";
import UserModel from "./mongooseSchema";

const Type = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    created: { type: GraphQLString }
  })
});

const Queries = {
  user: {
    type: Type,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return UserModel.findById(args.id);
    }
  }
};

const Mutations = {
  addUser: {
    type: Type,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
      let user = new UserModel({
        username: args.username,
        password: args.password,
        email: args.email
      });
      return user.save();
    }
  }
};

export default { Queries, Mutations };
