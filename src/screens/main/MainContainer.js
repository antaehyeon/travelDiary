import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import Presenter from "src/screens/main/MainPresenter.js";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-tiny-toast";

import { View, Text, Platform } from "react-native";
import { convertLocation, convertOnlyNumber } from "src/library/components/utils/util.js";
import { openDB, addUserTourDataToDB, getTableDatas, deleteUserTourListToDB } from "src/library/db/sqlite.js";

const ewhaUnivRegion = {
  latitude: 37.5561111,
  longitude: 126.94833333333334,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121
};

export default () => {
  const [region, setRegion] = useState(ewhaUnivRegion);
  const [currentUploadedImage, setCurrentUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markerList, setMarkerList] = useState([]);
  const [tourList, setTourList] = useState([]);
  const [tourMode, setTourMode] = useState(false);
  const [routeMode, setRouteMode] = useState(false);
  const [writingMode, setWritingMode] = useState(false);
  const [settingMode, setSettingMode] = useState(false);

  const hooksDatas = { region, markerList, tourMode, routeMode, writingMode, settingMode, currentUploadedImage };
  const hooksFuncs = { setRegion, setMarkerList, setTourMode, setRouteMode, setWritingMode, setSettingMode, setCurrentUploadedImage };

  const mapViewRef = useRef();

  useEffect(() => {
    // const storeLoginFlag = async () => {
    //   await AsyncStorage.setItem("@first_login", "false");
    // };

    // storeLoginFlag();
    // getLoginFlag();
    setIsLoading(false);
    // drawTourMarkerToMap();
    drawExsitingUserTourList(setMarkerList);
  }, []);

  useEffect(() => {
    console.log("[MAIN CONTAINER] useEffect markerList", markerList);
  }, [markerList]);

  const createRegion = (latitude, longitude) => {
    const result = {
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    };
    console.log("[MAIN CONTAINER] createRegion result", result);

    return result;
  };

  const drawExsitingUserTourList = callback => {
    const db = openDB();
    getTableDatas(db, "user_tour_list", callback);
  };

  const generateUserTourID = image => {
    let _dataStamp, _timeStamp;

    if (Platform.OS === "ios") {
      _dataStamp = image.exif["{GPS}"].DateStamp;
      _timeStamp = image.exif["{GPS}"].TimeStamp;
    } else {
      _dataStamp = image.exif.GPSDateStamp;
      _timeStamp = image.exif.GPSTimeStamp;
    }

    const dataStamp = convertOnlyNumber(_dataStamp);
    const TimeStamp = convertOnlyNumber(_timeStamp);
    const result = image.width + image.height + image.size + dataStamp + TimeStamp;
    console.log("[MAIN CONTAINER] generateUserTourID", result);
    return parseInt(result / 1000000000007);
  };

  const createUserTourDbData = (image, params) => {
    const result = {};
    const exif = image.exif;
    const timeStamp = Platform.OS === "ios" ? exif["{Exif}"].DateTimeDigitized : exif.DateTime;
    const latitude = Platform.OS === "ios" ? exif["{GPS}"].Latitude : createGPSInfo(exif).latitude;
    const longitude = Platform.OS === "ios" ? exif["{GPS}"].Longitude : createGPSInfo(exif).longitude;

    result.id = generateUserTourID(image);
    result.title = params.title;
    result.description = params.description;
    result.imageUri = image.sourceURL ? image.sourceURL : image.path;
    result.createdTime = convertOnlyNumber(timeStamp);
    result.updatedTime = convertOnlyNumber(timeStamp);
    result.latitude = latitude;
    result.longitude = longitude;
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

  // const createMarkerList = serverTourList => {
  //   console.log("[MAIN CONTAINER] createMarkerList serverTourList", serverTourList);
  //   const _tourList = [];
  //   serverTourList.map(tourData => {
  //     const _tourObject = {
  //       type: "tourAPI",
  //       title: tourData.title,
  //       latitude: parseFloat(tourData.mapy),
  //       longitude: parseFloat(tourData.mapx),
  //       imageUri: tourData.firstimage ? tourData.firstimage : ""
  //     };
  //     _tourList.push(_tourObject);
  //   });

  //   return _tourList;
  // };

  // const drawTourMarkerToMap = () => {
  //   requestTourList().then(({ response }) => {
  //     console.log("[MAIN CONTAINER] processMarker result", response);
  //     const tourListFromServer = response.body.items.item;
  //     const tourList = createMarkerList(tourListFromServer);
  //     console.log("[MAIN CONTAINER] drawTourMarkerToMap tourList", tourList);
  //     setTourList(tourList);
  //   });
  // };

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
        setRegion(createRegion(markerObj.latitude, markerObj.longitude));
        setCurrentUploadedImage(image);
        setWritingMode(true);
        setMapCameraLocation(ref, cameraObj);
      })
      .catch(err => {
        console.log("[MAIN CONTAINER] openPicker ERROR", err);
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
        createUserTourDbData={createUserTourDbData}
      />
    </View>
  );
};
