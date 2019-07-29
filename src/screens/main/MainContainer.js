import React, { useState, useEffect } from "react";
import Presenter from "src/screens/main/MainPresenter.js";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";

import { View, Text } from "react-native";
import { convertLocation } from "src/library/components/utils/util.js";

export default () => {
  const [markerList, setMarkerList] = useState([]);

  const hooksDatas = { markerList };
  const hooksFuncs = { setMarkerList };

  useEffect(() => {
    requestTourList().then(({ response }) => {
      console.log(response.body.items.item);

      const tourListFromServer = response.body.items.item;
      const tourList = [];

      tourListFromServer.map(tourData => {
        const _tourObject = {
          latitude: tourData.mapy,
          longitude: tourData.mapx,
          imageUri: tourData.firstimage
        };
        console.log("[MAIN CONTAINER] useEffect _tourObject", _tourObject);

        tourList.push(_tourObject);
      });

      console.log("[MAIN CONTAINER] tourList", tourList);

      setMarkerList(tourList);
    });
  }, []);

  const requestTourList = async () => {
    return fetch(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?serviceKey=qzl9%2F81ElJeTcryy3QygJcJ6MgjLTh9Mbg3jOhf802bjStgQ%2BfqBiy4lC2aHuEg3VZxIsiM97zxzNE0TgGwaoQ%3D%3D&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&listYN=Y&arrange=A&mapX=126.94833333333334&mapY=37.5561111&radius=5000",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("[MAIN CONTAINER] fetch responseJson", responseJson);
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  };

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
