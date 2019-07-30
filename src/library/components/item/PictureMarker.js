import React from "react";
import CustomView from "src/library/components/view/CustomView.js";

import { Actions } from "react-native-router-flux";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Marker } from "react-native-maps";

const PictureMarker = props => {
  const { title = "", description = "", latitude = 0, longitude = 0, imageUri = "" } = props;

  return (
    <Marker coordinate={{ latitude, longitude }} title={title} description={description} onPress={() => Actions.detail()}>
      <CustomView width={50} height={50}>
        <Icon type="font-awesome" name="map-marker" size={50} color="black" />
        <Image key={imageUri} source={{ uri: imageUri }} style={styles.markerImage} />
      </CustomView>
    </Marker>
  );
};

export default PictureMarker;

const styles = StyleSheet.create({
  markerImage: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    left: 12,
    top: 5
  }
});
