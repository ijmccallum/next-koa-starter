import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from "graphql";

import userQueries from "./userQueries";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    created: { type: GraphQLString },
    id: { type: GraphQLString }
  })
});

const Queries = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: Object, args: { id: string }) {
      const user = await userQueries.findById(args.id);
      return user;
    }
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(parent: Object, args: Object) {
      let users = await userQueries.findAll();
      return users;
    }
  }
};

const Mutations = {
  addUser: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(
      parent: Object,
      args: { username: String; password: String; email: String }
    ) {
      let newUser = await userQueries.create({
        username: args.username,
        password: args.password,
        email: args.email
      });
      return newUser;
    }
  }
};

export default { Queries, Mutations };
