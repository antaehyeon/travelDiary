import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { View, Text, Button, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
      <Text>MAIN PRESENTER</Text>
      <Button title="Go to Detail Screen" onPress={() => Actions.detail()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
