import React from "react";
import Container from "src/screens/detail/DetailContainer.js";

import { Component } from "react";
import { View } from "react-native";

export default class DetailIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container {...this.props} />
      </View>
    );
  }
}
