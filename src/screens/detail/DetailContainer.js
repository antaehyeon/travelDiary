import React from "react";
import Presenter from "src/screens/detail/DetailPresenter.js";

import { View, Text } from "react-native";

export default props => {
  return (
    <View style={{ flex: 1 }}>
      <Presenter {...props} />
    </View>
  );
};
