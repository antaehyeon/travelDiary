import React from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import CustomView from "src/library/components/view/CustomView.js";
import Colors from "assets/Colors.js";
import PictureMarker from "src/library/components/item/PictureMarker.js";
import RegisterMarkerContentModal from "src/library/components/modal/registerMarkerContent.js";
import SettingModal from "src/library/components/modal/SettingModal.js";
import TourListModal from "src/library/components/modal/TripListModal.js";

import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

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
    createPolyLineCoordinates,
    createUserTourDbData
  } = props;
  const { region, markerList, tourMode, routeMode, writingMode, settingMode, currentUploadedImage } = hooksDatas;
  const { setRegion, setMarkerList, setTourMode, setRouteMode, setWritingMode, setSettingMode, setCurrentUploadedImage } = hooksFuncs;

  const generatePictureMarker = () => {
    openPicker(mapViewRef, markerList, { setMarkerList, createMarkerObj, addMarkerList, createCameraObject, setMapCameraLocation });
  };

  return (
    <CustomView flex>
      <TourListModal isVisible={tourMode} setTourMode={setTourMode} />
      <RegisterMarkerContentModal
        isVisible={writingMode}
        setWritingMode={setWritingMode}
        currentUploadedImage={currentUploadedImage}
        createUserTourDbData={createUserTourDbData}
      />
      <SettingModal isVisible={settingMode} setSettingMode={setSettingMode} setMarkerList={setMarkerList} />
      <MapView ref={mapViewRef} provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        {markerList.map((marker, idx) => {
          console.log("[MAIN PRESENTER] markerList map marker", marker);
          const { id, type, title, description, latitude, longitude, imageUri } = marker;
          if (type === "tourAPI") return;
          return (
            <PictureMarker key={idx} id={id} title={title} description={description} latitude={latitude} longitude={longitude} imageUri={imageUri} />
          );
        })}
        {routeMode && <Polyline coordinates={createPolyLineCoordinates(markerList)} strokeColor={Colors.primary} strokeWidth={1} />}
      </MapView>
      <TouchableOpacity style={styles.IconContainer} onPress={generatePictureMarker}>
        <CustomView center width={72} height={72} radius={36} backColor={Colors.primary} elevation={5}>
          <Icon type="feather" name="camera" size={24} color="white" />
        </CustomView>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.IconContainer, styles.settingIconContainer]} onPress={() => setSettingMode(true)}>
        <CustomView center width={36} height={36} radius={18} backColor="white" elevation={5}>
          <Icon type="simple-line-icon" name="settings" size={16} />
        </CustomView>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.IconContainer, styles.tripIconContainer]} onPress={() => setTourMode(true)}>
        <CustomView center width={36} height={36} radius={18} backColor="white" elevation={5}>
          <Icon type="material" name="card-travel" size={16} />
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

  tripIconContainer: {
    left: deviceWidth / 2 - 84,
    bottom: 40
  },

  settingIconContainer: {
    left: deviceWidth / 2 + 48,
    bottom: 40
  }
});
