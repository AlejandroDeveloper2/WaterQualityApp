import React from "react";
import { Icon } from "@rneui/themed";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";
import useWaterAnalysis from "../../hooks/useWaterAnalysis";
import useOverlay from "../../hooks/useOverlay";
import {
  renderMeasuredValues,
  renderResultOptions,
} from "../../helpers/functions";
import {
  ConfigOptions,
  BannerProps,
} from "../../interfaces/inferiorBannerProps";

import Figure from "../../components/figure/Figure";
import Header from "../../components/header/Header";
import ToastComponent from "../../components/toastComponent/ToastComponent";

import {
  TitleContainer,
  ScreenContent,
  PanelContainer,
  LabelResultContainer,
  WaterFigure,
  PanelContainerVariant,
  FirstLayer,
  OptionsContainer,
  ResultValuesContainer,
  firstFigureStyle,
  secondFigureStyle,
} from "./AnalysisResultScreen.style";
import { Text, Container } from "../../styles/GlobalStyles.style";

const AnalysisResultScreen = () => {
  const { themeColors } = useTheme();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "rotate",
  });
  const { Modal, setIsModalVisible, setPropsModal } = useOverlay();

  React.useEffect(() => {
    animateComponent(180, true, 1000);
    return () => {
      stopAnimation();
    };
  }, []);

  return (
    <>
      <Modal />
      <ToastComponent />
      <Container backgroundColor={themeColors?.primaryColor}>
        <Header />
        <TitleContainer>
          <Icon
            name="leaderboard"
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
            Resultados
          </Text>
        </TitleContainer>
        <Animated.View style={[myStyle, firstFigureStyle]}>
          <Figure
            color={themeColors?.gray}
            size={{ transform: 0.7 }}
            svgName={{ name: "circuit-2" }}
          />
        </Animated.View>
        <Animated.View style={[myStyle, secondFigureStyle]}>
          <Figure
            color={themeColors?.mediumGray}
            size={{ transform: 0.7 }}
            svgName={{ name: "circuit-1" }}
          />
        </Animated.View>
        <ScreenContent>
          <AnalysisResultPanel />
          <ResultPanel
            setIsModalVisible={setIsModalVisible}
            setPropsModal={setPropsModal}
          />
        </ScreenContent>
      </Container>
    </>
  );
};

const AnalysisResultPanel = (): JSX.Element => {
  const { themeColors } = useTheme();
  const { analysisResult } = useWaterAnalysis();

  const setResultColor = (): string | undefined => {
    if (analysisResult.isSuitable) return themeColors?.secondaryColor;
    return themeColors?.mediumGray;
  };

  return (
    <PanelContainer backgroundColor={setResultColor()}>
      <WaterFigure
        source={require("../../../assets/images/water-figure.png")}
      />
      <LabelResultContainer>
        <Icon
          name={analysisResult.isSuitable ? "check" : "clear"}
          brand={true}
          type="material"
          color={themeColors?.white}
          iconStyle={{ fontSize: 45 }}
        />
        <Text
          fontColor={themeColors?.white}
          fontSize={18}
          fontFamily="LibreFranklin_400Regular"
          width={80}
        >
          {Object.values(analysisResult).includes("" || [])
            ? "No hay datos que evaluar"
            : analysisResult.resultText}
        </Text>
      </LabelResultContainer>
    </PanelContainer>
  );
};

const ResultPanel = (props: BannerProps): JSX.Element => {
  const { themeColors } = useTheme();
  const { analysisResult, saveMeasurementResult, cleanAnlysisResult } =
    useWaterAnalysis();
  const navigation = useNavigation();

  const config: ConfigOptions = {
    saveMeasurementResult,
    cleanAnlysisResult,
    setIsModalVisible: props.setIsModalVisible,
    setPropsModal: props.setPropsModal,
    navigation,
  };

  const setResultColor = (): string | undefined => {
    if (analysisResult.isSuitable) return themeColors?.secondaryColor;
    return themeColors?.mediumGray;
  };

  return (
    <FirstLayer backgroundColor={themeColors?.white}>
      <PanelContainerVariant backgroundColor={themeColors?.gray}>
        <TitleContainer>
          <Icon
            name="device-thermostat"
            brand={true}
            type="material"
            color={themeColors?.white}
            iconStyle={{ fontSize: 30 }}
          />
          <Text
            fontColor={themeColors?.white}
            fontSize={18}
            fontFamily="LibreFranklin_700Bold"
            width={100}
          >
            Valores medidos
          </Text>
        </TitleContainer>
        <ResultValuesContainer>
          {renderMeasuredValues(analysisResult.measuredValues, setResultColor)}
        </ResultValuesContainer>
        <OptionsContainer>
          {renderResultOptions(themeColors, config, analysisResult)}
        </OptionsContainer>
      </PanelContainerVariant>
    </FirstLayer>
  );
};

export default AnalysisResultScreen;
