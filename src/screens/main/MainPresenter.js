import React, { useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import CustomView from "src/library/components/view/CustomView.js";
import Colors from "assets/Colors.js";
import ImagePicker from "react-native-image-crop-picker";
import PictureMarker from "src/library/components/item/PictureMarker.js";
import RegisterMarkerContentModal from "src/library/components/modal/registerMarkerContent.js";
import SettingModal from "src/library/components/modal/SettingModal.js";

import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon } from "react-native-elements";
import { openDB, deleteUserTourListToDB } from "src/library/db/sqlite.js";

const { width: deviceWidth } = Dimensions.get("window");

export default props => {
  const {
    mapViewRef,
    hooksDatas,
    hooksFuncs,
    openCamera,
    openPicker,
    createMarkerObj,
    addMarkerList,
    createCameraObject,
    setMapCameraLocation,
    createPolyLineCoordinates
  } = props;
  const { markerList, tourMode, routeMode, writingMode, settingMode } = hooksDatas;
  const { setMarkerList, setTourMode, setRouteMode, setWritingMode, setSettingMode } = hooksFuncs;

  const generatePictureMarker = () => {
    openPicker(mapViewRef, markerList, { setMarkerList, createMarkerObj, addMarkerList, createCameraObject, setMapCameraLocation });
  };

  return (
    <CustomView flex>
      <RegisterMarkerContentModal isVisible={writingMode} />
      <SettingModal isVisible={settingMode} setSettingMode={setSettingMode} />
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.5561111,
          longitude: 126.94833333333334,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        {markerList.map((marker, idx) => {
          // console.log("[MAIN PRESENTER] markerList map marker", marker);
          const { type, title, latitude, longitude, imageUri } = marker;
          if (type === "tourAPI") return;
          return <PictureMarker key={idx} title={title} latitude={latitude} longitude={longitude} imageUri={imageUri} />;
        })}
        {routeMode && (
          <Polyline
            coordinates={createPolyLineCoordinates(markerList)}
            strokeColor={Colors.primary} // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={1}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.IconContainer} onPress={generatePictureMarker}>
        <CustomView center width={72} height={72} radius={36} backColor={Colors.primary} elevation={5}>
          <Icon type="feather" name="camera" size={24} color="white" />
        </CustomView>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.IconContainer, styles.settingIconContainer]} onPress={() => setSettingMode(!settingMode)}>
        <CustomView center width={36} height={36} radius={18} backColor="white" elevation={5}>
          <Icon type="simple-line-icon" name="settings" size={16} />
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

  IconContainer: {
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
  },

  settingIconContainer: {
    left: deviceWidth / 2 + 48,
    bottom: 40
  }
});
