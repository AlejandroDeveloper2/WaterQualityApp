import React from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";

import Logo from "../../components/appLogo/AppLogo";
import ToggleThemeButton from "../../components/toggleThemeButton/ToggleThemeButton";
import Figure from "../../components/figure/Figure";

import { Text, Container, AppFooter } from "../../styles/GlobalStyles.style";
import {
  Loading,
  ButtonContainer,
  firstFigureStyle,
  secondFigureStyle,
} from "./LoadingScreen.style";

const LoadingScreen = () => {
  const { themeColors } = useTheme();
  const navigation = useNavigation();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "bounce",
  });

  React.useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate("Home");
    }, 3000);
  }, []);

  React.useEffect(() => {
    animateComponent(20, true, 1500);
    return () => {
      stopAnimation();
    };
  }, []);

  return (
    <Container backgroundColor={themeColors?.primaryColor}>
      <ButtonContainer>
        <ToggleThemeButton />
      </ButtonContainer>
      <Animated.View style={[myStyle, firstFigureStyle]}>
        <Figure
          color={themeColors?.mediumGray}
          size={{ transform: 1 }}
          svgName={{ name: "circuit-1" }}
        />
      </Animated.View>
      <Logo />
      <Loading>
        <ActivityIndicator size="large" color={themeColors?.textColor} />
        <Text
          fontColor={themeColors?.textColor}
          fontSize={14}
          fontFamily="LibreFranklin_700Bold"
        >
          Cargando..
        </Text>
      </Loading>
      <Animated.View style={[myStyle, secondFigureStyle]}>
        <Figure
          color={themeColors?.mediumGray}
          size={{ transform: 0.8 }}
          svgName={{ name: "circuit-1" }}
        />
      </Animated.View>
      <AppFooter>
        <Text
          fontColor={themeColors?.textColor}
          fontSize={14}
          fontFamily="LibreFranklin_400Regular"
        >
          Versión 1.0.0
        </Text>
      </AppFooter>
    </Container>
  );
};

export default LoadingScreen;
