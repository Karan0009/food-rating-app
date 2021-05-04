import {StyleSheet, Platform} from 'react-native';
import {lightTheme} from '../constants/theming';

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: lightTheme.tertiary,
    // marginTop: Platform.OS === 'android' ? 0 : 0,
  },
});
