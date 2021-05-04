/* eslint-disable */
import React, {FC, useState, useRef, useEffect} from 'react';
import {Formik} from 'formik';
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
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {lightTheme, fonts} from '../constants/theming';
import GlobalStyles from '../global/globalStyles';
import {border, shadow} from '../utils/styleUtils';
import useOnLayout from '../utils/useLayout';
import useKeyboardDidShow from '../utils/useKeyboard';
import {BlurView} from '@react-native-community/blur';

const AuthScreen: FC = () => {
  const os: string = Platform.OS;
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isLoginBtnSubmitting, setIsLoginBtnSubmitting] = useState(false);
  const [isSignupShowing, setIsSignupShowing] = useState(false);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);
  const loginBtnLeft = useRef(new Animated.Value(0)).current;
  const loginBtnOpacity = useRef(new Animated.Value(1)).current;
  const isKeyboardShown = useKeyboardDidShow();
  console.log(isKeyboardShown);

  useEffect(() => {
    console.log('rendered');
  }, []);
  const loginBtnLayout = useOnLayout();
  const signupBtnLayout = useOnLayout();

  const loginBtnLeftAnim = (toValue: number) => {
    Animated.timing(loginBtnLeft, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const loginBtnOpacityAnim = (toValue: number) => {
    Animated.timing(loginBtnOpacity, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const showLoginForm = () => {
    console.log('login showing...');
    setIsSignupShowing(false);
    setIsLoginShowing(true);
    setIsLoginBtnSubmitting(true);
    loginBtnLeftAnim(1);
  };

  const showSignupForm = () => {
    console.log('signup showing...');
    setIsLoginShowing(false);
    setIsSignupShowing(true);
    setIsSignupSubmitting(true);
    loginBtnOpacityAnim(0);
  };

  const backToNothing = () => {
    console.log('back clicked...');
    setIsLoginBtnSubmitting(false);
    setIsLoginShowing(false);
    setIsSignupShowing(false);
    setIsSignupSubmitting(false);
    loginBtnLeftAnim(0);
    loginBtnOpacityAnim(1);
  };

  const loginSubmitHandler = () => {
    console.log('eh');
  };

  const inputChangeHandler = (e: any) => {
    console.log(e.target.id);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../assets/authScreenBackground.jpg')}
          style={[GlobalStyles.droidSafeArea, {marginTop: 0}]}
          blurRadius={isLoginShowing || isSignupShowing ? 5 : 0}>
          <View
            style={[
              styles.appTitleContainer,
              {top: isKeyboardShown ? '0%' : '20%'},
            ]}>
            <Text style={styles.appTitle}>I am hungry!</Text>
          </View>

          <Animated.View
            style={{
              height: 'auto',
              width: '100%',
              position: 'absolute',
              bottom: '25%',
              left: 0,
              right: 0,
              alignItems: 'center',
              // backgroundColor: 'orange',
            }}>
            <Formik
              initialValues={{email: '', password: '', username: ''}}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.resetForm();
              }}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View
                  style={{
                    width: '80%',
                    // backgroundColor: 'yellow',
                  }}>
                  {isLoginShowing && (
                    <Animated.View
                      style={{
                        opacity: loginBtnLeft.interpolate({
                          inputRange: [0.8, 1],
                          outputRange: [0, 1],
                          extrapolate: 'clamp',
                        }),
                        // transform: [
                        //   {
                        //     scaleX: loginBtnLeft.interpolate({
                        //       inputRange: [0, 1],
                        //       outputRange: [0, 1],
                        //       extrapolate: 'clamp',
                        //     }),
                        //   },
                        //   {
                        //     scaleY: loginBtnLeft.interpolate({
                        //       inputRange: [0, 1],
                        //       outputRange: [0, 1],
                        //       extrapolate: 'clamp',
                        //     }),
                        //   },
                        // ],
                      }}>
                      <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholder="Email"
                        style={[
                          styles.authInput,
                          {...shadow(os, {elevation: 10})},
                        ]}
                        editable={isLoginShowing}
                      />

                      <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="Password"
                        textContentType="password"
                        keyboardType="default"
                        style={[
                          styles.authInput,
                          {
                            ...shadow(os, {elevation: 10}),
                          },
                        ]}
                        editable={isLoginShowing}
                      />
                    </Animated.View>
                  )}

                  {isSignupShowing && (
                    <Animated.View
                      style={
                        {
                          // opacity: loginBtnLeft.interpolate({
                          //   inputRange: [0.8, 1],
                          //   outputRange: [1, 0],
                          //   extrapolate: 'clamp',
                          // }),
                          // transform: [
                          //   {
                          //     scaleX: loginBtnLeft.interpolate({
                          //       inputRange: [0, 1],
                          //       outputRange: [0, 1],
                          //       extrapolate: 'clamp',
                          //     }),
                          //   },
                          //   {
                          //     scaleY: loginBtnLeft.interpolate({
                          //       inputRange: [0, 1],
                          //       outputRange: [0, 1],
                          //       extrapolate: 'clamp',
                          //     }),
                          //   },
                          // ],
                        }
                      }>
                      <TextInput
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        textContentType="name"
                        keyboardType="default"
                        placeholder="Username"
                        style={[
                          styles.authInput,
                          {...shadow(os, {elevation: 10})},
                        ]}
                        editable={isSignupShowing}
                      />
                      <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        textContentType="emailAddress"
                        keyboardType="default"
                        placeholder="Email"
                        style={[
                          styles.authInput,
                          {...shadow(os, {elevation: 10})},
                        ]}
                        editable={isSignupShowing}
                      />

                      <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="Password"
                        textContentType="password"
                        keyboardType="default"
                        style={[
                          styles.authInput,
                          {
                            ...shadow(os, {elevation: 10}),
                          },
                        ]}
                        editable={isSignupShowing}
                      />
                    </Animated.View>
                  )}

                  <View style={styles.authScreenBtnRow}>
                    <CustomButton
                      title="Back"
                      onPress={() => backToNothing()}
                      outerContainerStyles={{
                        position: 'relative',
                        left: 0,
                        zIndex: 1,
                        opacity: isLoginShowing
                          ? loginBtnLeft.interpolate({
                              inputRange: [0.5, 1],
                              outputRange: [0, 1],
                              extrapolate: 'clamp',
                            })
                          : loginBtnOpacity.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0],
                            }),
                        // transform: [
                        //   {
                        //     scale: loginBtnLeft.interpolate({
                        //       inputRange: [0, 1],
                        //       outputRange: [0, 1],
                        //     }),
                        //   },
                        // ],
                        ...shadow(os, {elevation: 10}),
                      }}
                      containerStyle={{
                        ...border(2, 'solid', lightTheme.primary),
                        backgroundColor: 'transparent',
                        paddingHorizontal: 30,
                        // paddingVertical: 40,
                        // opacity: isLoginShowing ? 1 : 0,
                      }}
                      textStyle={{color: lightTheme.primary}}
                    />

                    <CustomButton
                      onLayout={loginBtnLayout.onLayout}
                      title="Login"
                      onPress={(e: any) => {
                        if (isLoginBtnSubmitting) handleSubmit(e);
                        else showLoginForm();
                      }}
                      outerContainerStyles={{
                        position: 'absolute',
                        zIndex: isSignupShowing ? 0 : 2,
                        left: loginBtnLeft.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                        transform: [
                          {
                            translateX: loginBtnLeft.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -loginBtnLayout.layout.width],
                            }),
                          },
                        ],
                        opacity: loginBtnOpacity,
                        ...shadow(os, {elevation: 10}),
                      }}
                      containerStyle={{
                        ...border(1, 'solid', lightTheme.primary),
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
                      ]}>
                      Or
                    </Text>

                    <CustomButton
                      onLayout={signupBtnLayout.onLayout}
                      title="Signup"
                      onPress={(e: any) => {
                        if (!isLoginShowing || isSignupShowing) {
                          if (isSignupSubmitting) handleSubmit(e);
                          else showSignupForm();
                        }
                      }}
                      outerContainerStyles={{
                        position: 'absolute',
                        zIndex: 1,
                        left: '100%',
                        transform: [
                          {
                            translateX: -signupBtnLayout.layout.width,
                          },
                        ],
                        opacity: loginBtnLeft.interpolate({
                          inputRange: [0, 0.7],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                        ...shadow(os, {elevation: 10}),
                      }}
                      containerStyle={{
                        backgroundColor: loginBtnOpacity.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            lightTheme.primary,
                            lightTheme.tertiary,
                          ],
                        }),

                        ...border(1, 'solid', lightTheme.primary),
                        // opacity: !isLoginShowing || isSignupShowing ? 1 : 0,
                      }}
                      textStyle={{
                        color: loginBtnOpacity.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            lightTheme.tertiary,
                            lightTheme.primary,
                          ],
                        }),
                      }}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitleContainer: {
    position: 'absolute',
    top: '20%',
    left: '0%',
    width: '100%',
    alignItems: 'center',

    backgroundColor: lightTheme.primary,
  },
  appTitle: {
    color: lightTheme.tertiary,
    fontSize: lightTheme.fontSizeXl,
    fontFamily: fonts.mediumItalic,
  },
  authScreenBtn: {
    padding: 30,
  },
  authScreenBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    // backgroundColor: 'pink',
  },
  authScreenBtnRowOr: {
    position: 'absolute',
    left: '48%',
  },
  authInput: {
    backgroundColor: lightTheme.tertiary,
    padding: 10,
    marginVertical: 15,
    ...border(1, 'solid', lightTheme.primary),
    borderRadius: lightTheme.borderRadius2,
    fontFamily: fonts.medium,
    fontSize: lightTheme.fontSizeM,
    zIndex: 0,
  },
});

export default AuthScreen;
