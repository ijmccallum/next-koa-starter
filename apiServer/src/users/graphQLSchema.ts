import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

var userGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        }
      }
    }
  })
});
