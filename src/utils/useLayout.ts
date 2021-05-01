import React, { useState, useCallback } from "react";
import { LayoutChangeEvent } from "react-native";

interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function useOnLayout() {
  const [layout, setLayout] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  }, []);

  return { layout, onLayout };
}
