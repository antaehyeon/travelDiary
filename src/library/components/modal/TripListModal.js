import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import Colors from "assets/Colors.js";
import CustomButton from "src/library/components/item/CustomButton.js";

import { ScrollView } from "react-native";
import { openDB } from "src/library/db/sqlite.js";

const TripListModal = props => {
  const [tourList, setTourList] = useState([]);

  useEffect(() => {
    const db = openDB();
  }, []);

  return (
    <CustomView flex>
      <Modal {...props}>
        <ScrollView contentContainerStyle={{ flex: 1 }} />
      </Modal>
    </CustomView>
  );
};

export default TripListModal;
