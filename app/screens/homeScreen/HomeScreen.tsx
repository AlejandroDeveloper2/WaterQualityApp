import React from "react";
import { BackHandler } from "react-native";
import { Icon } from "@rneui/themed";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";
import useWaterAnalysis from "../../hooks/useWaterAnalysis";
import useBackhandler from "../../hooks/useBackhandler";

import Header from "../../components/header/Header";
import Figure from "../../components/figure/Figure";
import InferirorPanel from "../../components/inferiorPanel/InferirorPanel";
import ToastComponent from "../../components/toastComponent/ToastComponent";

import { Container, Text } from "../../styles/GlobalStyles.style";
import {
  ScreenTitle,
  StartAnalysisButtonContainer,
  StartAnalysisButton,
  ButtonSecondLayer,
  ButtonThirdLayer,
  firstFigureStyle,
  secondFigureStyle,
  thirdFigureStyle,
} from "./HomeScreen.style";

const HomeScreen = () => {
  const { themeColors } = useTheme();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "rotate",
  });
  const {
    isBluetoothActive,
    isDeviceConnected,
    isAnalysisStarted,
    startWaterAnalysis,
  } = useWaterAnalysis();
  const { exitApp } = useBackhandler();
  const navigation = useNavigation();

  React.useEffect(() => {
    animateComponent(90, true, 1000);
    return () => {
      stopAnimation();
    };
  }, []);

  React.useEffect(() => {
    if (navigation.getState().index === 0) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        exitApp
      );
      return () => backHandler.remove();
    }
  }, [navigation.getState().index]);

  return (
    <>
      <ToastComponent />
      <Container backgroundColor={themeColors?.primaryColor}>
        <Header />
        <ScreenTitle>
          <Icon
            name="dashboard"
            brand={true}
            type="material"
            color={themeColors?.textColor}
            iconStyle={{ fontSize: 30 }}
          />
          <Text
            fontColor={themeColors?.textColor}
            fontSize={24}
            fontFamily="LibreFranklin_700Bold"
          >
            Panel de control
          </Text>
        </ScreenTitle>
        <Animated.View style={[myStyle, firstFigureStyle]}>
          <Figure
            color={themeColors?.gray}
            size={{ transform: 0.7 }}
            svgName={{ name: "circuit-1" }}
          />
        </Animated.View>
        <Animated.View style={[myStyle, secondFigureStyle]}>
          <Figure
            color={themeColors?.mediumGray}
            size={{ transform: 1 }}
            svgName={{ name: "circuit-2" }}
          />
        </Animated.View>
        <StartAnalysisButtonContainer>
          <ButtonThirdLayerComponent />
          <ButtonSecondLayer backgroundColor={themeColors?.mediumGray}>
            <StartAnalysisButton
              backgroundColor={
                isBluetoothActive && isDeviceConnected
                  ? themeColors?.secondaryColor
                  : themeColors?.gray
              }
              onPress={
                isDeviceConnected
                  ? () => startWaterAnalysis(navigation)
                  : () => console.log("Dispositivo no conectado")
              }
            >
              <Icon
                name="analytics"
                brand={true}
                type="material"
                color={themeColors?.white}
                iconStyle={{ fontSize: 30 }}
              />
              <Text
                fontColor={themeColors?.white}
                fontSize={20}
                fontFamily="LibreFranklin_400Regular"
              >
                {isAnalysisStarted ? "Analizando..." : "Iniciar analisis"}
              </Text>
            </StartAnalysisButton>
          </ButtonSecondLayer>
        </StartAnalysisButtonContainer>
        <InferirorPanel />
      </Container>
    </>
  );
};

const ButtonThirdLayerComponent = (): JSX.Element => {
  const { deviceTheme } = useTheme();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "rotate",
  });
  const { isAnalysisStarted } = useWaterAnalysis();

  const imageUrl: string =
    deviceTheme === "dark"
      ? require("../../../assets/images/logo-third-layer-dark-mode.png")
      : require("../../../assets/images/logo-third-layer-light-mode.png");

  React.useEffect(() => {
    if (isAnalysisStarted) {
      animateComponent(90, false, 1000);
    } else {
      stopAnimation();
    }
    return () => {
      stopAnimation();
    };
  }, [isAnalysisStarted]);

  return (
    <Animated.View style={[myStyle, thirdFigureStyle]}>
      <ButtonThirdLayer source={imageUrl}></ButtonThirdLayer>
    </Animated.View>
  );
};

export default HomeScreen;
