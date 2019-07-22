import React from "react";
import Container from "src/screens/detail/DetailContainer.js";

import { Component } from "react";
import { View } from "react-native";

export default class DetailIndex extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container />
      </View>
    );
  }
}
