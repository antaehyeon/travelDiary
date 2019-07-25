import React from "react";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import CustomButton from "src/library/components/item/CustomButton.js";
import Colors from "assets/Colors.js";

import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { Actions } from "react-native-router-flux";

const naverColor = "#62c92e";

export default () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <CustomView flex>
        <CustomView flex />
        <CustomView flex align between>
          <FontText fontType="NSL" title="T R A V E L    D I A R Y" size={24} color="white" style={{ alignSelf: "flex-end", marginRight: 24 }} />

          <CustomView width="100%" style={{ marginBottom: 40, paddingHorizontal: 24 }}>
            <CustomButton
              title="일단 시작하기"
              width="100%"
              fontType="NSL"
              height={40}
              textSize={16}
              btnColor="transparent"
              textColor="white"
              borderColor="white"
              borderWidth={0.5}
              onPress={() => Actions.main()}
            />
            <CustomButton
              title="네이버로 시작하기"
              width="100%"
              height={40}
              fontType="NSL"
              textSize={16}
              btnColor="transparent"
              textColor={naverColor}
              borderColor={naverColor}
              borderWidth={0.5}
              style={{ marginTop: 24 }}
            />
          </CustomView>
        </CustomView>
      </CustomView>
    </SafeAreaView>
  );
};
