import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import Colors from "assets/Colors.js";

import { ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { openDB, getTableDatas } from "src/library/db/sqlite.js";
import { Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";

const TripListModal = props => {
  const [tourList, setTourList] = useState([]);

  const { setTourMode } = props;

  useEffect(() => {
    const db = openDB();
    getTableDatas(db, "tour_list", param => setTourList(param));
  }, []);

  const CloseButton = () => (
    <TouchableOpacity onPress={() => setTourMode(false)}>
      <CustomView width="100%" height={48} backColor={Colors.primary} row between align style={{ paddingHorizontal: 16 }}>
        <FontText title="닫기" fontType="NSEB" size={20} color="white" />
        <Icon type="font-awesome" name="close" size={24} color="white" />
      </CustomView>
    </TouchableOpacity>
  );

  const TourItem = props => {
    const { imageUri, title, address_main: mainAddr } = props;

    return (
      <TouchableOpacity
        style={{ marginVertical: 8, borderRadius: 8 }}
        onPress={() => {
          setTourMode(false);
          Actions.detail({ mode: "tourAPI", title, imageUri, mainAddr });
        }}
      >
        <ImageBackground style={{ width: "100%", height: 80, borderRadius: 16 }} blurRadius={2} source={{ uri: imageUri }}>
          <CustomView height={80} radius={16} style={{ alignItems: "flex-end", justifyContent: "flex-end", marginRight: 16 }}>
            <FontText fontType="NSEB" color="white" size={16} title={title} />
          </CustomView>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <CustomView flex>
      <Modal {...props} style={{ flex: 1 }} scrollHorizontal>
        <CustomView height={48} />
        <ScrollView bounces={false}>
          {tourList.map((data, idx) => {
            console.log("[TRIP LIST MODAL] data", data);
            return <TourItem key={idx} {...data} />;
          })}
        </ScrollView>
        <CloseButton />
      </Modal>
    </CustomView>
  );
};

export default TripListModal;
