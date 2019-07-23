import React from "react";
import FontText from "src/library/components/item/FontText.js";
import CustomView from "src/library/components/view/CustomView.js";

import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import CustomButton from "src/library/components/item/CustomButton.js";

export default () => {
  return (
    <CustomView flex center backColor="white">
      <Text style={styles.NSL}>NanumSquareL</Text>
      <Text style={styles.NSR}>NanumSquareR</Text>
      <Text style={styles.NSB}>NanumSquareB</Text>
      <Text style={styles.NSEB}>NanumSquareEB</Text>
      <Text style={styles.NBGR}>NanumBarunGothicOTF</Text>
      <Text style={styles.NBGB}>NanumBarunGothicOTFBold</Text>
      <FontText title="여행일기장" fontType="NSL" style={{ fontSize: 48 }} />
      <CustomView height={24} />
      <CustomButton title="CUSTOM BUTTON" />
      <CustomView height={24} />
      <CustomButton title="HELLO" />
      <CustomView height={24} />
      <CustomButton width={320} height={48} title="버튼" textSize={24} fontType="NBGR" radius={16} />
    </CustomView>
  );
};

const styles = StyleSheet.create({
  NSL: {
    fontFamily: "NanumSquareL"
  },
  NSR: {
    fontFamily: "NanumSquareR"
  },
  NSB: {
    fontFamily: "NanumSquareB"
  },
  NSEB: {
    fontFamily: "NanumSquareEB"
  },
  NBGR: {
    fontFamily: "NanumBarunGothicOTF"
  },
  NBGB: {
    fontFamily: "NanumBarunGothicOTFBold"
  }
});
