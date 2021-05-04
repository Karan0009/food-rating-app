const border = (
  borderWidth: number,
  borderStyle: "solid" | "dotted" | "dashed",
  borderColor: string
) => {
  return { borderWidth, borderStyle, borderColor };
};

const shadow = (platform: string, data: any) => {
  if (platform === "ios") {
    return {
      shadowColor: data.shadowColor,
      shadowOffset: { width: data.shadowWidth, height: data.shadowHeight },
      shadowOpacity: data.shadowOpacity,
    };
  } else {
    return { elevation: data.elevation };
  }
};

export { border, shadow };
