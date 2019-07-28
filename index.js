/**
 * @format
 */

import App from "./App";
import ApolloClient from "apollo-boost";

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

// @TEST CODE
client
  .query({
    query: gql`
      {
        userById(id: "cjyc1n6jnoyx10b06kqmz9j8u") {
          id
          username
          email
        }
      }
    `
  })
  .then(result => console.log(result));

AppRegistry.registerComponent(appName, () => App);
