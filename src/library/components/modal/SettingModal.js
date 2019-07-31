import React, { useRef } from "react";
import Modal from "react-native-modal";
import CustomView from "src/library/components/view/CustomView.js";
import CustomButton from "src/library/components/item/CustomButton.js";
import { openDB, deleteUserTourListToDB, getTableDatas } from "src/library/db/sqlite.js";

import { TouchableOpacity } from "react-native";

const deleteUserTourListData = callback => {
  const db = openDB();
  deleteUserTourListToDB(db);
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
              getTableDatas(db, "user_tour_list", param => console.log(param));
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
