/**
 * @format
 */

import App from "./App";
import ApolloClient from "apollo-boost";

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Remote debugger"]);
AppRegistry.registerComponent(appName, () => App);
