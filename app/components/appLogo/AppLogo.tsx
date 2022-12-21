import React from "react";
import Animated from "react-native-reanimated";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";

import {
  LogoContainer,
  Logo,
  SecondLayer,
  ThirdLayer,
  style,
} from "./AppLogo.style";

const AppLogo = () => {
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "rotate",
  });

  React.useEffect(() => {
    animateComponent(15, true, 1000);
    return () => {
      stopAnimation();
    };
  }, []);

  return (
    <LogoContainer>
      <Animated.View style={[myStyle, style]}>
        <SecondLayer
          source={require("../../../assets/images/logo-second-layer.png")}
        />
      </Animated.View>
      <Logo source={require("../../../assets/images/logo-first-layer.png")} />
      <LogoThirdLayer />
    </LogoContainer>
  );
};

const LogoThirdLayer = () => {
  const { deviceTheme } = useTheme();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "rotate",
  });

  React.useEffect(() => {
    animateComponent(360, false, 10000);
    return () => {
      stopAnimation();
    };
  }, []);

  const imageUrl: string =
    deviceTheme === "dark"
      ? require("../../../assets/images/logo-third-layer-dark-mode.png")
      : require("../../../assets/images/logo-third-layer-light-mode.png");

  return (
    <Animated.View style={[myStyle, style]}>
      <ThirdLayer source={imageUrl} />
    </Animated.View>
  );
};

export default AppLogo;
