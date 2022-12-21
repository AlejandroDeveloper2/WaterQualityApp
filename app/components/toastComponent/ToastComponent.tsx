import React from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

import useTheme from "../../hooks/useTheme";

const ToastComponent = () => {
  const { themeColors } = useTheme();

  const toastConfig: ToastConfig = {
    success: (props): JSX.Element => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: themeColors?.secondaryColor }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontFamily: "LibreFranklin_500Medium",
          color: themeColors?.secondaryColor,
        }}
        text2Style={{
          fontSize: 15,
          fontFamily: "LibreFranklin_400Regular",
        }}
      />
    ),
    error: (props): JSX.Element => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: themeColors?.mediumGray }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontFamily: "LibreFranklin_500Medium",
          color: themeColors?.mediumGray,
        }}
        text2Style={{
          fontSize: 15,
          fontFamily: "LibreFranklin_400Regular",
        }}
      />
    ),
  };

  return <Toast position="top" topOffset={85} config={toastConfig} />;
};

export default ToastComponent;
