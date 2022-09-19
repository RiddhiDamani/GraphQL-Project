const graphql = require("graphql");
// const _ = require("lodash");
const axios = require("axios");
const { response } = require("express");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// const users = [
//   { id: "23", firstName: "Bill", age: 20 },
//   { id: "47", firstName: "Samantha", age: 21 },
// ];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // return _.find(users, { id: args.id });
        // request to JSON server
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((response) => response.data)
          .then((data) => data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
