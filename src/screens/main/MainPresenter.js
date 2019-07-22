import React from "react";

import { View, Text, Button } from "react-native";
import { Actions } from "react-native-router-flux";

export default () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>MAIN PRESENTER</Text>
      <Button title="Go to Detail Screen" onPress={() => Actions.detail()} />
    </View>
  );
};
