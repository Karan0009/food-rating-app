import React, { FC, useState, useRef } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Button,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { lightTheme, fonts } from "../constants/theming";
import GlobalStyles from "../global/globalStyles";
import { border, shadow } from "../utils/styleUtils";
import useOnLayout from "../utils/useLayout";
// import { BlurView } from "@react-native-community/blur";

const AuthScreen: FC = () => {
  const os: string = Platform.OS;
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isLoginBtnSubmitting, setIsLoginBtnSubmitting] = useState(false);
  const [isSignupShowing, setIsSignupShowing] = useState(false);
  const loginBtnLeft = useRef(new Animated.Value(0)).current;

  const loginBtnLayout = useOnLayout();
  const signupBtnLayout = useOnLayout();

  const loginBtnLeftAnim = (toValue: number) => {
    Animated.timing(loginBtnLeft, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const showLoginForm = () => {
    console.log(12);
    setIsLoginShowing(true);
    setIsLoginBtnSubmitting(true);

    loginBtnLeftAnim(1);
  };

  const backToNothing = () => {
    setIsLoginBtnSubmitting(false);
    setIsLoginShowing(false);
    setIsSignupShowing(false);
    loginBtnLeftAnim(0);
  };

  const loginSubmitHandler = () => {
    console.log("eh");
  };

  const inputChangeHandler = (e: any) => {
    console.log(e.target.id);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../../assets/authScreenBackground.jpg")}
          style={[GlobalStyles.droidSafeArea, { marginTop: 0 }]}
          blurRadius={isLoginShowing ? 5 : 0}
        >
          <View style={styles.appTitleContainer}>
            <Text style={styles.appTitle}>I am hungry!</Text>
          </View>

          <Animated.View
            style={{
              height: "auto",
              width: "100%",
              position: "absolute",
              bottom: "25%",
              left: 0,
              right: 0,
              alignItems: "center",
              backgroundColor: "orange",
            }}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.resetForm();
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View
                  style={{
                    width: "80%",
                    backgroundColor: "yellow",
                  }}
                >
                  <View
                    style={{
                      opacity: isLoginShowing ? 1 : 0,
                    }}
                  >
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      placeholder="Email"
                      style={[
                        styles.authInput,
                        { ...shadow(os, { elevation: 10 }) },
                      ]}
                      editable={isLoginShowing}
                    />

                    <TextInput
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Password"
                      textContentType="password"
                      keyboardType="default"
                      style={[
                        styles.authInput,
                        {
                          ...shadow(os, { elevation: 10 }),
                        },
                      ]}
                      editable={isLoginShowing}
                    />
                  </View>

                  <View style={styles.authScreenBtnRow}>
                    <CustomButton
                      title="Back"
                      onPress={() => backToNothing()}
                      outerContainerStyles={{
                        position: "relative",
                        left: 0,
                        zIndex: 1,
                        opacity: loginBtnLeft.interpolate({
                          inputRange: [0.5, 1],
                          outputRange: [0, 1],
                          extrapolate: "clamp",
                        }),
                        // transform: [
                        //   {
                        //     scale: loginBtnLeft.interpolate({
                        //       inputRange: [0, 1],
                        //       outputRange: [0, 1],
                        //     }),
                        //   },
                        // ],
                        ...shadow(os, { elevation: 10 }),
                      }}
                      containerStyle={{
                        ...border(2, "solid", lightTheme.primary),
                        backgroundColor: "transparent",
                        paddingHorizontal: 30,
                        // paddingVertical: 40,
                        // opacity: isLoginShowing ? 1 : 0,
                      }}
                    />

                    <CustomButton
                      onLayout={loginBtnLayout.onLayout}
                      title="Login"
                      onPress={(e: any) => {
                        console.log("hello");
                        if (isLoginBtnSubmitting) handleSubmit(e);
                        else showLoginForm();
                      }}
                      outerContainerStyles={{
                        position: "absolute",
                        zIndex: 2,
                        left: loginBtnLeft.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        }),
                        transform: [
                          {
                            translateX: loginBtnLeft.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -loginBtnLayout.layout.width],
                            }),
                          },
                        ],
                        // opacity: 1,
                        ...shadow(os, { elevation: 10 }),
                      }}
                      containerStyle={{
                        ...border(1, "solid", lightTheme.primary),
                        paddingHorizontal: 30,
                        backgroundColor: lightTheme.primary,
                      }}
                    />

                    <Text
                      style={[
                        styles.authScreenBtnRowOr,
                        {
                          opacity: !isLoginShowing && !isSignupShowing ? 1 : 0,
                        },
                      ]}
                    >
                      Or
                    </Text>
                    {/* <CustomButton
                      title="Signup"
                      containerStyle={{
                        backgroundColor: lightTheme.tertiary,
                        ...border(1, "solid", lightTheme.primary),
                        position: "absolute",
                        right: "0%",
                        ...shadow(os, { elevation: 10 }),
                        opacity: !isLoginShowing || isSignupShowing ? 1 : 0,
                      }}
                      textStyle={{ color: lightTheme.primary }}
                    /> */}
                  </View>
                </View>
              )}
            </Formik>
          </Animated.View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appTitleContainer: {
    position: "absolute",
    top: "20%",
    left: "0%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  appTitle: {
    fontSize: lightTheme.fontSizeXl,
    fontFamily: fonts.mediumItalic,
  },
  authScreenBtn: {
    padding: 30,
  },
  authScreenBtnRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    // backgroundColor: "pink",
  },
  authScreenBtnRowOr: {
    position: "absolute",
    left: "50%",
  },
  authInput: {
    backgroundColor: lightTheme.tertiary,
    padding: 10,
    marginVertical: 15,
    ...border(1, "solid", lightTheme.primary),
    borderRadius: lightTheme.borderRadius2,
    fontFamily: fonts.medium,
    fontSize: lightTheme.fontSizeM,
    zIndex: 0,
  },
});

export default AuthScreen;
