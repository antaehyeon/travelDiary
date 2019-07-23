/**
 * React Native TouchableOpacity, TouchableNativeFeedback을 기반으로 만들어졌습니다.
 * React Native 기본 컴포넌트가 최우선으로 적용됩니다.
 */

import React from "react";
import propTypes from "prop-types";

import { View, Text, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import { processFontType } from "src/library/components/utils/util.js";

const CustomButton = props => {
  /* *********************************************
   * Datas
   ************************************************/
  const { containerStyle, textStyle, width, height, fontType, title, textSize, textColor, btnColor, bold, borderWidth, borderColor, radius } = props;

  /* *********************************************
   * Styles
   ************************************************/
  const _containerStyle = {
    width,
    height,
    backgroundColor: btnColor,
    borderWidth,
    borderColor,
    borderRadius: radius,
    alignItems: "center",
    justifyContent: "center",
    ...containerStyle
  };
  const _textStyle = {
    fontSize: textSize,
    color: textColor,
    fontFamily: processFontType(fontType),
    ...textStyle
  };

  if (bold) _textStyle.fontWeight = "bold";

  /* *********************************************
   * Main (Return)
   ************************************************/
  if (Platform.OS === "android") {
    return (
      <View style={{ width, height, borderRadius: radius, overflow: "hidden" }}>
        <TouchableNativeFeedback {...props} background={TouchableNativeFeedback.Ripple("#1EC800")}>
          <View style={_containerStyle}>
            <Text style={_textStyle}>{title}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  } else {
    return (
      <TouchableOpacity {...props}>
        <View style={_containerStyle}>
          <Text style={_textStyle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

CustomButton.propTypes = {
  containerStyle: propTypes.object,
  textStyle: propTypes.object,
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  fontType: propTypes.string,
  title: propTypes.string,
  textSize: propTypes.number,
  textColor: propTypes.string,
  btnColor: propTypes.string,
  bold: propTypes.bool,
  borderWidth: propTypes.number,
  borderColor: propTypes.string,
  radius: propTypes.number
};

CustomButton.defaultProps = {
  containerStyle: {},
  textStyle: {},
  width: null,
  height: null,
  fontType: "NSR",
  title: "버튼명을 입력해주세요",
  type: "outline",
  textSize: 12,
  textColor: "black",
  bold: false,
  btnColor: "white",
  borderWidth: 1,
  borderColor: "black",
  radius: 4
};

export default CustomButton;
