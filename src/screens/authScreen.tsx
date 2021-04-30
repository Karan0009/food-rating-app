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
} from "react-native";
import CustomButton from "../components/CustomButton";
import { lightTheme, fonts } from "../constants/theming";
import GlobalStyles from "../global/globalStyles";
import { border, shadow } from "../utils/styleUtils";

const AuthScreen: FC = () => {
  const os: string = Platform.OS;
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isLoginBtnSubmitting, setIsLoginBtnSubmitting] = useState(false);
  const [isSignupShowing, setIsSignupShowing] = useState(false);
  const loginBtnLeft = useRef(new Animated.Value(0)).current;

  const loginBtnLeftAnim = (toValue: number) => {
    Animated.timing(loginBtnLeft, {
      toValue,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  const showLoginForm = () => {
    console.log(12);
    setIsLoginShowing(true);
    setIsLoginBtnSubmitting(true);

    loginBtnLeftAnim(100);
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

  const inputChangeHandler = (e) => {
    console.log(e.target.id);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../../assets/authScreenBackground.jpg")}
          style={[GlobalStyles.droidSafeArea, { marginTop: 0 }]}
          blurRadius={2}
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
                    />
                  </View>

                  <View style={styles.authScreenBtnRow}>
                    {/* <CustomButton
                      title="Back"
                      onPress={() => backToNothing()}
                      containerStyle={{
                        ...border(1, "solid", lightTheme.primary),
                        paddingHorizontal: 30,
                        ...shadow(os, { elevation: 10 }),
                        // opacity: isLoginShowing ? 1 : 0,
                        transform: [
                          { scaleX: isLoginShowing ? 1 : 0 },
                          { scaleY: isLoginShowing ? 1 : 0 },
                        ],
                        // position: "absolute",
                        zIndex: 20,
                        left: 0,
                      }}
                    /> */}
                    <CustomButton
                      title="Login"
                      onPress={(e: any) => {
                        if (isLoginBtnSubmitting) handleSubmit(e);
                        else showLoginForm();
                      }}
                      containerStyle={{
                        ...border(1, "solid", lightTheme.primary),
                        paddingHorizontal: 30,
                        ...shadow(os, { elevation: 10 }),
                        opacity: isLoginShowing || !isSignupShowing ? 1 : 0,
                        position: "absolute",
                        // left: isLoginShowing ? "100%" : "0%",
                        left: loginBtnLeft.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"],
                        }),
                        transform: [{ translateX: isLoginShowing ? -100 : 0 }],
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
                    <CustomButton
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
                    />
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
    marginTop: 50,
    backgroundColor: "pink",
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
