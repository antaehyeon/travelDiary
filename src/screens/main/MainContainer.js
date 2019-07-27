import React, { useState } from "react";
import Presenter from "src/screens/main/MainPresenter.js";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";

import { View, Text } from "react-native";
import { convertLocation } from "src/library/components/utils/util.js";

export default () => {
  const [markerList, setMarkerList] = useState([]);

  const hooksDatas = { markerList };
  const hooksFuncs = { setMarkerList };

  const addMarkerList = (markerObj, markerList, setMarkerList) => {
    const _markerList = _.cloneDeep(markerList);
    console.log("[MAIN CONTAINER] addMarkerList _markerList", _markerList);

    _markerList.unshift(markerObj);
    console.log("[MAIN CONTAINER] _markerList", _markerList);
    setMarkerList(_markerList);
  };

  const createMarkerObj = image => {
    const { latitude, longitude } = createGPSInfo(image.exif);
    const result = {
      latitude,
      longitude,
      imageUri: image.path
    };

    console.log("[MAIN CONTAINER] createMarkerObj result", result);
    return result;
  };

  const createGPSInfo = exifInfo => {
    const result = { latitude: convertLocation(exifInfo.GPSLatitude), longitude: convertLocation(exifInfo.GPSLongitude) };
    console.log("[MAIN CONTAINER] createGPSInfo result", result);
    return result;
  };

  const openCamera = mode => {
    ImagePicker.openCamera({
      includeExif: true
    }).then(image => {
      console.log(image);
    });
  };

  const openPicker = (markerList, callbacks) => {
    ImagePicker.openPicker({
      includeExif: true
    })
      .then(image => {
        console.log("[MAIN CONTAINER] openPicker SUCCESS", image);
        const { setMarkerList, createMarkerObj, addMarkerList } = callbacks;
        const markerObj = createMarkerObj(image);
        addMarkerList(markerObj, markerList, setMarkerList);
      })
      .catch(err => {
        console.log("[[MAIN CONTAINER] openPicker ERROR", err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Presenter
        hooksDatas={hooksDatas}
        hooksFuncs={hooksFuncs}
        openCamera={openCamera}
        openPicker={openPicker}
        createMarkerObj={createMarkerObj}
        addMarkerList={addMarkerList}
      />
    </View>
  );
};
