import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

// interface Layout {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

export default function useKeyboardDidShow() {
  const [keyboardShown, setKeyboardShown] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardShown(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardShown(false));

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setKeyboardShown(true));
      Keyboard.removeListener('keyboardDidHide', () => setKeyboardShown(false));
    };
  }, []);

  return keyboardShown;
}
