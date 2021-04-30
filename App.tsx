import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AuthScreen from "./src/screens/authScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { fonts, lightTheme } from "./src/constants/theming";
import CustomButton from "./src/components/CustomButton";
import { border } from "./src/utils/styleUtils";
import useOnLayout from "./src/utils/useLayout";

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
  const [animatedVal] = useState(new Animated.Value(0));
  const [isFadeIn, setIsFadeIn] = useState(false);

  const [{ width }, onLayout] = useOnLayout();

  useEffect(() => {
    Animated.timing(animatedVal, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
    // console.log(animatedVal);
  }, []);

  let percent = 0 / 100;

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
      <View
        onLayout={onLayout}
        style={{
          position: "absolute",
          width: "100%",
          height: 100,
          top: "50%",
          backgroundColor: "yellow",
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: animatedVal.interpolate({
              inputRange: [0, 1],
              outputRange: ["black", "yellow"],
            }),
            width: "100%",
            height: "100%",
            left: "-100%",

            transform: [
              {
                translateX: animatedVal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width * 0.1, width * 1],
                }),
              },
            ],
          }}
        ></Animated.View>
      </View>
      <CustomButton
        title="start"
        outerContainerStyles={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
        onPress={() => startAnim(width)}
        containerStyle={{
          width: "100%",
          backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {/* <View
        style={{
          position: "absolute",
          bottom: "20%",
          height: 40,
          backgroundColor: "yellow",
          alignSelf: "center",
          width: "80%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          outerContainerStyles={{
            position: "absolute",
            left: "0%",
          }}
          containerStyle={{
            backgroundColor: "red",
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}
        />
        <TouchableHighlight
          onPress={() => console.log(2)}
          style={{
            position: "absolute",
            left: "100%",
            paddingVertical: 10,
            paddingHorizontal: 30,

            transform: [{ translateX: 100 }],
            backgroundColor: "green",
          }}
        >
          <View>
            <Text>btn</Text>
          </View>
        </TouchableHighlight>
      </View> */}
      {/* <Animated.View
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
              inputRange: [0, 50,100],
              outputRange: ["black", "orange","black"],
              extrapolate:"clamp"
            }),
          }}
        />
      </Animated.View> */}
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
