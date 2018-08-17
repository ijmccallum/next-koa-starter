import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

import localQueries from "./localQueries";

/**
 * Translation data provided as a GraphQL query
 * TODO: return the translation data as JSON rather than as a string
 */

const LangType = new GraphQLObjectType({
  name: "Lang",
  fields: () => ({
    langid: { type: GraphQLString },
    namespaces: {
      type: new GraphQLList(NamespaceType),
      async resolve(parent) {
        const namespacesData = await localQueries.findAllNss(parent.langid);
        return namespacesData;
      }
    },
    namespace: {
      type: NamespaceType,
      args: {
        name: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const namespacesData = await localQueries.findNsById({
          langid: parent.langid,
          namespace: args.name
        });
        return namespacesData;
      }
    }
  })
});

const NamespaceType = new GraphQLObjectType({
  name: "Namespace",
  fields: () => ({
    name: { type: GraphQLString },
    translations: { type: GraphQLString }
  })
});

const Queries = {
  lang: {
    type: LangType,
    args: {
      langid: { type: GraphQLString }
    },
    async resolve(parent: {}, args: { langid: String }) {
      const langData = await localQueries.findLangById({
        langid: args.langid
      });
      return langData;
    }
  },
  langs: {
    type: new GraphQLList(LangType),
    async resolve() {
      const langs = await localQueries.findAllLangs();
      return langs;
    }
  }
};

export default { Queries };
