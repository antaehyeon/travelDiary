import React, { useRef } from "react";
import Modal from "react-native-modal";
import CustomView from "src/library/components/view/CustomView.js";
import Colors from "assets/Colors.js";
import CustomButton from "src/library/components/item/CustomButton.js";

import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "react-native-elements";
import { openDB, addUserTourDataToDB } from "src/library/db/sqlite.js";

const registerMarkerContent = props => {
  console.log("[REGISTER MARKER CONTENT] props", props);
  const titleInputRef = useRef();
  const descriptionRef = useRef();

  const { currentUploadedImage, createUserTourDbData, setWritingMode } = props;

  const uploadUserTourDataToDB = () => {
    const db = openDB();
    const title = titleInputRef.current.input._lastNativeText;
    const description = descriptionRef.current.input._lastNativeText;
    const userTourData = createUserTourDbData(currentUploadedImage, { title, description });
    console.log("[REGISTER MARKER CONTENT] userTourData", userTourData);
    addUserTourDataToDB(db, userTourData);
    setWritingMode(false);
  };

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
                onPress={uploadUserTourDataToDB}
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
