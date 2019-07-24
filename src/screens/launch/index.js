import React from "react";
import Container from "src/screens/launch/LaunchContainer.js";
import Colors from "assets/Colors.js";

import { Component } from "react";
import { View } from "react-native";

export default class LaunchIndex extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container />
      </View>
    );
  }
}
