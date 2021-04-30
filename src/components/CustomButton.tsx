import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Button,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { fonts, lightTheme } from "../constants/theming";

const CustomButton: FC<CustomButtonProps> = (props: CustomButtonProps) => {
  const defaultPressHandler = () => console.log("clicked");

  return (
    <TouchableWithoutFeedback onPress={props?.onPress || defaultPressHandler}>
      <Animated.View
        style={[styles.defaultBtnContainer, props?.containerStyle]}
      >
        <Text style={[styles.defaultBtnText, props?.textStyle]}>
          {props?.title || "btn"}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  defaultBtnContainer: {
    backgroundColor: lightTheme.primary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: lightTheme.borderRadius2,
  },

  defaultBtnText: {
    color: lightTheme.tertiary,
    fontFamily: fonts.bold,
    margin: 0,
    lineHeight: 20,
  },
});

export interface CustomButtonProps {
  title?: string;
  onPress?: any;
  containerStyle?: object;
  textStyle?: object;
  animation?: object;
}
