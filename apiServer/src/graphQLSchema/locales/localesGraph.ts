import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

import localQueries from "./localQueries";

/**
 * One namespace:
 * lang(langid:"en"){
 *   namespace(name:"common") {
 *     translations
 *   }
 * }
 *
 * All namespaces in a lang:
 * lang(langid:"en"){
 *   namespaces {
 *     translations
 *   }
 * }
 */

const LangType = new GraphQLObjectType({
  name: "Lang",
  fields: () => ({
    langid: { type: GraphQLString },
    namespace: { type: NamespaceType }
  })
});

const NamespaceType = new GraphQLObjectType({
  name: "Namespace",
  fields: () => ({
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
  namespace: {
    type: NamespaceType,
    args: {
      namespace: { type: GraphQLString }
    },
    async resolve(parent: { langid: String }, args: { namespace: String }) {
      const namespaceData = await localQueries.findNsById({
        langid: parent.langid,
        namespace: args.namespace
      });
      return namespaceData;
    }
  },
  namespaces: {
    type: new GraphQLList(NamespaceType),
    async resolve(parent: { langid: String }) {
      let namespaceData = await localQueries.findAllNss(parent.langid);
      return namespaceData;
    }
  }
};

// const Queries = {
//   lang: {
//     type: LangType,
//     args: { langid: { type: GraphQLString } },
//     async resolve(parent: Object, args: { langid: String }) {
//       const langNamespaces = await localQueries.getLangNamespaces(args.langid);
//       console.log("graph returning::::::::::", langNamespaces);
//       return String(langNamespaces);
//     },
//     namespace: {
//       type: LangType,
//       args: { name: { type: GraphQLString } },
//       async resolve(parent: Object, args: { lang: String; name: String }) {
//         const namespaceData = await localQueries.getLangNamespace({
//           lang: args.lang,
//           namespace: args.name
//         });
//         console.log("graph returning namespace::::::", namespaceData);
//         return String(namespaceData);
//       }
//     }
//   }
// };

// const Mutations = {
//   addUser: {
//     type: UserType,
//     args: {
//       username: { type: new GraphQLNonNull(GraphQLString) },
//       password: { type: new GraphQLNonNull(GraphQLString) },
//       email: { type: new GraphQLNonNull(GraphQLString) }
//     },
//     async resolve(
//       parent: Object,
//       args: { username: String; password: String; email: String }
//     ) {
//       let newUser = await userQueries.create({
//         username: args.username,
//         password: args.password,
//         email: args.email
//       });
//       return newUser;
//     }
//   }
// };

export default { Queries };
