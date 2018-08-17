import { GraphQLSchema, GraphQLObjectType } from "graphql";

import UserGraph from "./users/userGraph";
import LocalGraph from "./locales/localesGraph";

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...UserGraph.Queries,
      ...LocalGraph.Queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      ...UserGraph.Mutations
    })
  })
});

export default schema;
