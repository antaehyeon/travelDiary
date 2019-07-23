/**
 * Font를 쉽게 변경하기 위한 Font Component 입니다.
 * React Native 기본 속성들이 최우선으로 적용됩니다.
 * Nested text를 지원합니다.
 * https://facebook.github.io/react-native/docs/text#ontextlayout
 * @param {Object} props
 */

import React from "react";
import propTypes from "prop-types";

import { Text, StyleSheet } from "react-native";
import { processFontType } from "src/library/components/utils/util.js";

const FontText = props => {
  /* *********************************************
   * Datas (Default-Custom)
   ************************************************/
  const { style, children } = props;
  const { title, bold, size, color, fontType } = props;

  /* *********************************************
   * Styles
   ************************************************/
  const textStyle = { color, fontSize: size, fontFamily: processFontType(fontType), ...style };
  if (bold) textStyle.fontWeight = "bold";

  /* *********************************************
   * Main (Return)
   ************************************************/
  return (
    <Text {...props} style={textStyle}>
      {title}
      {children}
    </Text>
  );
};

FontText.propTypes = {
  title: propTypes.string,
  style: propTypes.object,
  bold: propTypes.bool,
  size: propTypes.number,
  color: propTypes.string,
  fontType: propTypes.string
};

FontText.defaultProps = {
  style: {},
  title: "텍스트를 입력하세요",
  bold: false,
  size: 12,
  color: "black",
  fontType: "NSR"
};

export default FontText;
