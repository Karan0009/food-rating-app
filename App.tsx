import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";
import AuthScreen from "./src/screens/authScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { lightTheme } from "./src/constants/theming";
import CustomButton from "./src/components/CustomButton";

const fetchFonts = () => {
  return Font.loadAsync({
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-mediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const animatedVal = useRef(new Animated.Value(1)).current;
  const [isFadeIn, setIsFadeIn] = useState(false);

  const startAnim = (toValue: number) => {
    Animated.timing(animatedVal, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => setIsFadeIn(!isFadeIn));
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => setDataLoaded(false)}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightTheme.primary,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: "50%",
          left: animatedVal.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "80%"],
          }),
        }}
      >
        <CustomButton
          onPress={() => startAnim(isFadeIn ? 100 : 0)}
          containerStyle={{
            backgroundColor: animatedVal.interpolate({
              inputRange: [0, 100],
              outputRange: ["black", "orange"],
            }),
          }}
        />
      </Animated.View>
      {/* <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: animatedVal.interpolate({
            inputRange: [0, 100],
            outputRange: ["red", "yellow"],
          }),
          position: "absolute",
          top: "50%",
          // left: animatedVal.interpolate({
          //   inputRange: [0, 100],
          //   outputRange: ["0%", "75%"],
          // }),
          // transform: [
          //   { perspective: 55 },
          //   {
          //     rotateY: animatedVal.interpolate({
          //       inputRange: [0, 100],
          //       outputRange: ["0deg", "-180deg"],
          //     }),
          //   },
          // ],
          // opacity: animatedVal,
        }}
      >
        <Animated.Text
          style={{
            color: animatedVal.interpolate({
              inputRange: [0, 100],
              outputRange: ["black", "white"],
            }),
          }}
        >
          hello
        </Animated.Text>
      </Animated.View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Button onPress={() => startAnim(isFadeIn ? 100 : 0)} title="start" />
      </View> */}
      {/* <AuthScreen /> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
