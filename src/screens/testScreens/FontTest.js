import React from "react";

import { View, Text, StyleSheet } from "react-native";

export default () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.NSL}>NanumSquareL</Text>
      <Text style={styles.NSR}>NanumSquareR</Text>
      <Text style={styles.NSB}>NanumSquareB</Text>
      <Text style={styles.NSEB}>NanumSquareEB</Text>
      <Text style={styles.NBGR}>NanumBarunGothicOTF</Text>
      <Text style={styles.NBGB}>NanumBarunGothicOTFBold</Text>
    </View>
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
