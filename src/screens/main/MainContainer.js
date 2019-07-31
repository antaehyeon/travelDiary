import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import Presenter from "src/screens/main/MainPresenter.js";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-tiny-toast";

import { View, Text, Platform } from "react-native";
import { convertLocation, convertOnlyNumber } from "src/library/components/utils/util.js";
import { requestTourList } from "src/library/networking/networking.js";
import { openDB, addUserTourDataToDB, getTableDatas, deleteUserTourListToDB } from "src/library/db/sqlite.js";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [markerList, setMarkerList] = useState([]);
  const [tourMode, setTourMode] = useState(false);
  const [routeMode, setRouteMode] = useState(false);
  const [writingMode, setWritingMode] = useState(false);
  const [settingMode, setSettingMode] = useState(false);

  const hooksDatas = { markerList, tourMode, routeMode, writingMode, settingMode };
  const hooksFuncs = { setMarkerList, setTourMode, setRouteMode, setWritingMode, setSettingMode };

  const mapViewRef = useRef();

  useEffect(() => {
    const getLoginFlag = async () => {
      const loginFlag = await AsyncStorage.getItem("@first_login");
      console.log("[MAIN CONTAINER] useEffect loginFlag", loginFlag);
    };

    getLoginFlag();
    setIsLoading(false);
    // drawTourMarkerToMap();
    drawExsitingUserTourList(setMarkerList);
  }, []);

  useEffect(() => {
    console.log("[MAIN CONTAINER] useEffect markerList", markerList);
  }, [markerList]);

  const drawExsitingUserTourList = callback => {
    const db = openDB();
    getTableDatas(db, "user_tour_list", callback);
  };

  const generateUserTourID = image => {
    const dataStamp = convertOnlyNumber(image.exif["{GPS}"].DateStamp);
    const TimeStamp = convertOnlyNumber(image.exif["{GPS}"].TimeStamp);
    const result = image.width + image.height + image.size + dataStamp + TimeStamp;
    console.log("[MAIN CONTAINER] generateUserTourID", result);
    return parseInt(result / 1000000000007);
  };

  const createUserTourDbData = (image, params) => {
    const result = {};
    const exif = image.exif;
    if (Platform.OS === "ios") {
      result.id = generateUserTourID(image);
      result.title = params.title;
      result.description = params.description;
      result.imageUri = image.sourceURL ? image.sourceURL : image.path;
      result.createdTime = convertOnlyNumber(exif["{Exif}"].DateTimeDigitized);
      result.updatedTime = convertOnlyNumber(exif["{Exif}"].DateTimeDigitized);
      result.langitude = exif["{GPS}"].Latitude;
      result.longitude = exif["{GPS}"].Longitude;
    } else {
    }

    console.log("[MAIN CONTAINER] createUserTourDbData result", result);

    return result;
  };

  const createPolyLineCoordinates = markerList => {
    const result = [];
    markerList.map(({ type, latitude, longitude }) => {
      if (type === "tourAPI") return;
      result.push({ latitude, longitude });
    });

    return result;
  };

  /**
   * use react-native-maps (dataType)
   */
  const createCameraObject = (latitude, longitude, pitch, heading, zoom) => {
    const result = {
      center: {
        latitude,
        longitude
      },
      pitch,
      heading,
      zoom
    };

    return result;
  };

  const setMapCameraLocation = (ref, cameraObj) => {
    const DURATION = 1500;

    console.log("setMapCameraLocation ref", ref);
    console.log("setMapCameraLocation cameraObj", cameraObj);

    ref.current.setCamera(cameraObj, DURATION);
  };

  const createMarkerList = serverTourList => {
    console.log("[MAIN CONTAINER] createMarkerList serverTourList", serverTourList);
    const _tourList = [];
    serverTourList.map(tourData => {
      const _tourObject = {
        type: "tourAPI",
        title: tourData.title,
        latitude: parseFloat(tourData.mapy),
        longitude: parseFloat(tourData.mapx),
        imageUri: tourData.firstimage ? tourData.firstimage : ""
      };
      _tourList.push(_tourObject);
    });

    return _tourList;
  };

  const drawTourMarkerToMap = () => {
    requestTourList().then(({ response }) => {
      console.log("[MAIN CONTAINER] processMarker result", response);
      const tourListFromServer = response.body.items.item;
      const tourList = createMarkerList(tourListFromServer);
      console.log("[MAIN CONTAINER] drawTourMarkerToMap tourList", tourList);
      setMarkerList(tourList);
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
      type: "user",
      latitude,
      longitude,
      imageUri: image.path
    };

    console.log("[MAIN CONTAINER] createMarkerObj result", result);
    return result;
  };

  const createGPSInfo = exifInfo => {
    let result = {};

    if (Platform.OS === "ios") {
      result = {
        latitude: exifInfo["{GPS}"].Latitude,
        longitude: exifInfo["{GPS}"].Longitude
      };
    } else {
      result = { latitude: convertLocation(exifInfo.GPSLatitude), longitude: convertLocation(exifInfo.GPSLongitude) };
    }
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

  const openPicker = (ref, markerList, callbacks) => {
    ImagePicker.openPicker({
      includeExif: true
    })
      .then(image => {
        console.log("[MAIN CONTAINER] openPicker SUCCESS", image);
        const { setMarkerList, createMarkerObj, addMarkerList, createCameraObject, setMapCameraLocation } = callbacks;
        const markerObj = createMarkerObj(image);
        addMarkerList(markerObj, markerList, setMarkerList);
        const cameraObj = createCameraObject(markerObj.latitude, markerObj.longitude, 0, 0, 16);
        console.log("[MAIN CONTAINER] openPicker cameraObj", cameraObj);
        setMapCameraLocation(ref, cameraObj);
        const db = openDB();
        const userTourDbData = createUserTourDbData(image, { title: "test", description: "test_desc" });
        addUserTourDataToDB(db, userTourDbData);
      })
      .catch(err => {
        console.log("[[MAIN CONTAINER] openPicker ERROR", err);
      });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Presenter
        mapViewRef={mapViewRef}
        hooksDatas={hooksDatas}
        hooksFuncs={hooksFuncs}
        openCamera={openCamera}
        openPicker={openPicker}
        createMarkerObj={createMarkerObj}
        addMarkerList={addMarkerList}
        createCameraObject={createCameraObject}
        setMapCameraLocation={setMapCameraLocation}
        createPolyLineCoordinates={createPolyLineCoordinates}
      />
    </View>
  );
};
