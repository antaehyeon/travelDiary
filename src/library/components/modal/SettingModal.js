import React, { useRef } from "react";
import Modal from "react-native-modal";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import Colors from "assets/Colors.js";
import CustomButton from "src/library/components/item/CustomButton.js";
import { openDB, deleteTourListToDB, deleteUserTourListToDB, getTableDatas } from "src/library/db/sqlite.js";

import { View, Text, Dimensions, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";

const deleteUserTourListData = callback => {
  const db = openDB();
  deleteTourListToDB(db);
  callback(false);
};

const SettingModal = props => {
  const { setSettingMode, setMarkerList } = props;

  return (
    <CustomView flex>
      <Modal {...props} onBackButtonPress={() => setSettingMode(false)} onBackdropPress={() => setSettingMode(false)}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setSettingMode(false)} />
        <CustomView>
          <CustomButton
            title="사용자 여행 테이블 로그 찍기"
            height={56}
            radius={16}
            onPress={() => {
              const db = openDB();
              getTableDatas(db, "tour_list", param => console.log(param));
              setSettingMode(false);
            }}
          />
          <CustomButton
            title="사용자 데이터 지우기"
            height={56}
            radius={16}
            onPress={() => {
              deleteUserTourListData(setSettingMode);
              setMarkerList([]);
            }}
          />
        </CustomView>
      </Modal>
    </CustomView>
  );
};

export default SettingModal;
