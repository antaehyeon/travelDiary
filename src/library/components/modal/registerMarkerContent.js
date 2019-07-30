import React, { useRef } from "react";
import Modal from "react-native-modal";
import CustomView from "src/library/components/view/CustomView.js";
import FontText from "src/library/components/item/FontText.js";
import Colors from "assets/Colors.js";
import CustomButton from "src/library/components/item/CustomButton.js";

import { View, Text, Dimensions, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "react-native-elements";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const registerMarkerContent = props => {
  const titleInputRef = useRef();
  const descriptionRef = useRef();

  return (
    <CustomView flex>
      <Modal {...props}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={Platform.OS === "android" ? -500 : 32}>
          <ScrollView contentContainerStyle={{ flex: 1 }} keyboardDismissMode="on-drag" keyboardShouldPersistTaps={true}>
            <CustomView flex />
            <CustomView style={{ width: "100%", height: 240, paddingTop: 8 }} backColor="white" radius={16}>
              <Input
                ref={titleInputRef}
                containerStyle={{ marginBottom: 8 }}
                inputContainerStyle={[styles.textInputContainer, { height: 48 }]}
                inputStyle={{ fontSize: 16 }}
                leftIcon={{ type: "material-community", name: "format-title" }}
                leftIconContainerStyle={{ marginRight: 8 }}
                placeholder="해당 사진의 제목을 입력해주세요"
                returnKeyType="next"
                onEndEditing={() => {
                  descriptionRef.current.focus();
                }}
              />
              <Input
                ref={descriptionRef}
                containerStyle={{ marginBottom: 8 }}
                inputContainerStyle={[styles.textInputContainer, { height: 112, padding: 8 }]}
                inputStyle={{ fontSize: 16, height: "100%" }}
                placeholder="해당 사진의 스토리를 간략하게 입력해주세요"
                maxLength={80}
                multiline={true}
                returnKeyType="done"
                onEndEditing={() => {
                  descriptionRef.current.blur();
                }}
              />
              <CustomButton
                title="입력"
                height={48}
                style={{ marginHorizontal: 10 }}
                radius={8}
                btnColor={Colors.primary}
                textColor="white"
                textSize={16}
              />
            </CustomView>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: { borderWidth: 1, borderColor: Colors.primary, borderRadius: 8 }
});

export default registerMarkerContent;
