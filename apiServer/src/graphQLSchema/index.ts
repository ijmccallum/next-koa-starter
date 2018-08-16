import { GraphQLSchema, GraphQLObjectType } from "graphql";

import User from "./users/graph";

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...User.Queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      ...User.Mutations
    })
  })
});

export default schema;
