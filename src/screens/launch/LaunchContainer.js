import React, { useState, useEffect } from "react";
import Presenter from "src/screens/launch/LaunchPresenter.js";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";

import { View, Text } from "react-native";
import { openDB, createTourListTable, createUserTourListTable, addTourDataToDB } from "src/library/db/sqlite.js";
import { requestTourList } from "src/library/networking/networking.js";

export default () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLoginFlag = async () => {
      const loginFlag = await AsyncStorage.getItem("@first_login");
      console.log("[MAIN CONTAINER] useEffect loginFlag", loginFlag);
      return loginFlag;
    };
    setIsLoading(false);
    createDB();
    storeTourListToDB();
  }, []);

  const createDB = () => {
    const db = openDB();
    createTourListTable(db);
    createUserTourListTable(db);
  };

  const processTourData = (db, serverTourList) => {
    console.log("[LAUNCH CONTAINER] createMarkerList serverTourList", serverTourList);
    const _tourList = [];
    serverTourList.map(async tourData => {
      _tourList.push(tourData);
      addTourDataToDB(db, tourData);
    });

    return _tourList;
  };

  const storeTourListToDB = () => {
    requestTourList().then(({ response }) => {
      const db = openDB();
      console.log("[MAIN CONTAINER] processMarker result", response);
      const tourListFromServer = response.body.items.item;
      const tourList = processTourData(db, tourListFromServer);
      console.log("[MAIN CONTAINER] drawTourMarkerToMap tourList", tourList);
      // setTourList(tourList);
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
      <Presenter />
    </View>
  );
};
