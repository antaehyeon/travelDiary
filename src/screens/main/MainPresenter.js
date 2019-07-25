import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CustomView from "src/library/components/view/CustomView.js";
import Colors from "assets/Colors.js";

import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon } from "react-native-elements";

const { width: deviceWidth } = Dimensions.get("window");

export default () => {
  return (
    <CustomView flex>
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
      <TouchableOpacity style={styles.cameraIconContainer}>
        <CustomView center width={72} height={72} radius={36} backColor={Colors.primary} elevation={5}>
          <Icon type="feather" name="camera" size={24} color="white" />
        </CustomView>
      </TouchableOpacity>
    </CustomView>
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
  },

  cameraIconContainer: {
    position: "absolute",
    left: deviceWidth / 2 - 36,
    bottom: 24,
    borderRadius: 36,
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
