/**
 * react-native-elements Button을 기반으로 만들어졌습니다.
 * React Native 기본 속성들이 최우선으로 적용됩니다.
 * 다음으로 react-native-elements 속성들이 적용됩니다.
 * @ADD
 * 1. 기본 (가운데정렬) 말고 alignItems, justifyContent 적용하기
 */

import React from "react";
import CustomView from "src/library/components/view/CustomView.js";
import propTypes from "prop-types";

import { Button } from "react-native-elements";
import { processFontType } from "src/library/components/utils/util.js";

const CustomButton = props => {
  /* *********************************************
   * Datas (Default-Custom)
   ************************************************/
  const { width, height, type, title, textSize, textColor, backColor, bold, borderWidth, borderColor, radius } = props;

  /* *********************************************
   * Styles
   ************************************************/
  let buttonStyle = {};
  let containerStyle = {};
  let titleStyle = {};

  if (width) containerStyle.width = width;
  if (height) containerStyle.height = height;
  if (backColor) buttonStyle.backgroundColor = backColor;
  if (borderWidth) buttonStyle.borderWidth = borderWidth;
  if (borderColor) buttonStyle.borderColor = borderColor;
  if (textSize) titleStyle.fontSize = textSize;
  if (textColor) titleStyle.color = textColor;
  if (bold) titleStyle.fontWeight = "bold";

  if (radius) {
    buttonStyle.borderRadius = radius;
    containerStyle.borderRadius = radius;
  }

  buttonStyle = { ...buttonStyle, ...props.buttonStyle };
  containerStyle = { ...containerStyle, ...props.containerStyle };
  titleStyle = { ...titleStyle, ...props.titleStyle };

  /* *********************************************
   * Main (Return)
   ************************************************/
  return <Button {...props} type={type} containerStyle={containerStyle} titleStyle={titleStyle} />;
};

CustomButton.propTypes = {
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  type: propTypes.string,
  title: propTypes.string,
  textSize: propTypes.number,
  textColor: propTypes.string,
  backColor: propTypes.string,
  bold: propTypes.bool,
  borderWidth: propTypes.number,
  borderColor: propTypes.string,
  radius: propTypes.number
};

CustomButton.defaultProps = {
  width: null,
  height: null,
  title: "버튼명을 입력해주세요",
  type: "solid",
  textSize: 12,
  textColor: "black",
  bold: false,
  backColor: null,
  borderWidth: 1,
  borderColor: "black",
  radius: 4
};

export default CustomButton;
