import React, { useEffect } from "react";
import Presenter from "src/screens/launch/LaunchPresenter.js";

import { View, Text } from "react-native";

export default () => {
  useEffect(() => {
    console.log("[LAUNCH CONTAINER] CDM");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Presenter />
    </View>
  );
};
