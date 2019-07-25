/**
 * @FIX
 * Custom View 컴포넌트 바꾸기
 */

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default ({ children, style, flex, row, center, align, justify, between, backColor, width, height, elevation = 0, radius }) => {
  let container = {
    backgroundColor: "transparent"
  };

  if (flex) container.flex = typeof flex === "string" ? flex : 1;
  if (row) container.flexDirection = "row";
  if (align || center) container.alignItems = "center";
  if (justify || center) container.justifyContent = "center";
  if (between) container.justifyContent = "space-between";
  if (backColor) container.backgroundColor = backColor;
  if (width) container.width = width;
  if (height) container.height = height;
  if (style) container = { ...container, ...style };
  if (radius) container.borderRadius = radius;

  return (
    <View style={container} elevation={elevation}>
      {children}
    </View>
  );
};
