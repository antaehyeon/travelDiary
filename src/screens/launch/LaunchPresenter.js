import React from "react";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import CustomButton from "src/library/components/item/CustomButton.js";
import Colors from "assets/Colors.js";

import { View, Text, Button, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const naverColor = "#62c92e";

export default () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <CustomView flex>
        <CustomView flex />
        <CustomView flex align between>
          <FontText fontType="NSEB" title="...Travel Diary" size={32} color="white" style={{ alignSelf: "flex-end", marginRight: 24 }} />

          <CustomView style={{ marginBottom: 40 }}>
            <CustomButton title="이메일로 시작하기" width={320} height={40} textSize={16} btnColor="transparent" textColor="white" borderColor="white" borderWidth={2} />
            <CustomButton
              title="네이버로 시작하기"
              width={320}
              height={40}
              textSize={16}
              btnColor="transparent"
              textColor={naverColor}
              borderColor={naverColor}
              borderWidth={2}
              style={{ marginTop: 24 }}
            />
          </CustomView>
        </CustomView>
      </CustomView>
    </SafeAreaView>
  );
};
