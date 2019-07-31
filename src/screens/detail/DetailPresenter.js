import React from "react";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import Colors from "assets/Colors.js";
import CustomButton from "src/library/components/item/CustomButton.js";

import { SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon } from "react-native-elements";

export default props => {
  console.log("[DETAIL PRESENTER] props", props);

  const { mode, title = "앗! 제목이 없어요", description = "앗! 설명이 없어요", imageUri = "", mainAddr } = props;

  const moveBackScreen = () => Actions.pop();

  const Header = () => (
    <CustomView width="100%" height={48} center backColor={Colors.primary} row between align style={{ paddingHorizontal: 16 }}>
      <TouchableOpacity hitSlop={{ top: 7, right: 7, bottom: 7, left: 7 }} onPress={moveBackScreen}>
        <Icon type="ionicon" name="md-arrow-round-back" size={24} color="white" />
      </TouchableOpacity>
      <FontText title="소개합니다" fontType="NSEB" size={20} color="white" />
      <CustomView width={20} height={20} />
    </CustomView>
  );

  const Divider = ({ width = 80 }) => <CustomView width={width} height={1} backColor="white" style={{ marginBottom: 8 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <CustomView flex>
        <Header />
        <CustomView flex>
          <Image source={{ uri: imageUri }} style={{ width: "100%", height: "100%" }} />
        </CustomView>
        <CustomView flex backColor={Colors.primary} style={{ padding: 16 }} between>
          <CustomView>
            <Divider />
            <FontText title={title} fontType="NSB" size={32} color="white" />
          </CustomView>

          {mode === "tourAPI" ? (
            <FontText title={`이곳의 주소는\n${mainAddr} 입니다`} fontType="NSL" size={24} color="white" />
          ) : (
            <FontText title={description} fontType="NSL" size={24} color="white" />
          )}
          <CustomView>
            <CustomButton
              title="뒤 로 가 기"
              width="100%"
              fontType="NSL"
              height={40}
              textSize={16}
              btnColor="transparent"
              textColor="white"
              borderColor="white"
              borderWidth={0.5}
              onPress={moveBackScreen}
            />
          </CustomView>
        </CustomView>
      </CustomView>
    </SafeAreaView>
  );
};
