import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Button,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { fonts, lightTheme } from "../constants/theming";

const CustomInput: FC<CustomInputProps> = (props: CustomInputProps) => {
  const defaultPressHandler = () => console.log("clicked");
  return <View></View>;
};

export default CustomInput;

const styles = StyleSheet.create({});

export interface CustomInputProps {}
