import React, { useState, useEffect } from "react";
import Presenter from "src/screens/launch/LaunchPresenter.js";
import AsyncStorage from "@react-native-community/async-storage";

import { View, Text } from "react-native";
import { openDB, createTourListTable, createUserTourListTable, selectTableDatas } from "src/library/db/sqlite.js";

export default () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storeLoginFlag = async () => {
      await AsyncStorage.setItem("@first_login", "false");
    };

    storeLoginFlag();
    setIsLoading(false);
    createDB();
  }, []);

  const createDB = () => {
    const db = openDB();
    createTourListTable(db);
    createUserTourListTable(db);
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
