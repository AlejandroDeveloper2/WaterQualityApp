import React from "react";
import { ScrollView } from "react-native";
import { Icon } from "@rneui/themed";
import Animated from "react-native-reanimated";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";
import useWaterAnalysis from "../../hooks/useWaterAnalysis";
import useOverlay from "../../hooks/useOverlay";
import { renderMeasureResultList } from "../../helpers/functions";

import Header from "../../components/header/Header";
import Figure from "../../components/figure/Figure";
import ToastComponent from "../../components/toastComponent/ToastComponent";

import {
  TitleContainer,
  ResultListContainer,
  figureStyle,
  scrollViewContentStyle,
  scrollViewStyle,
  Empty,
} from "./MeasurementScreen.style";
import { Text, Container, Illustration } from "../../styles/GlobalStyles.style";

const MeasurementScreen = (): JSX.Element => {
  const { themeColors } = useTheme();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "rotate",
  });
  const { results, getMeasurementResults } = useWaterAnalysis();
  const { Modal, setPropsModal, setIsModalVisible } = useOverlay();

  React.useEffect(() => {
    animateComponent(180, true, 1500);
    return () => {
      stopAnimation();
    };
  }, []);

  React.useEffect(() => {
    setPropsModal({
      message: "Obteniendo resultados...",
      iconColor: themeColors?.secondaryColor,
      iconName: "grading",
    });
    getMeasurementResults(setIsModalVisible);
  }, []);

  return (
    <>
      <ToastComponent />
      <Modal />
      <Container backgroundColor={themeColors?.primaryColor}>
        <Header />
        <TitleContainer>
          <Icon
            name="format-list-numbered"
            brand={true}
            type="material"
            color={themeColors?.textColor}
            iconStyle={{ fontSize: 30 }}
          />
          <Text
            fontColor={themeColors?.textColor}
            fontSize={24}
            fontFamily="LibreFranklin_500Medium"
          >
            Mis mediciones
          </Text>
        </TitleContainer>
        <Animated.View style={[myStyle, figureStyle]}>
          <Figure
            color={themeColors?.mediumGray}
            size={{ transform: 0.5 }}
            svgName={{ name: "circuit-1" }}
          />
        </Animated.View>

        <ResultListContainer backgroundColor={themeColors?.gray}>
          <ScrollView
            style={scrollViewStyle}
            contentContainerStyle={scrollViewContentStyle}
          >
            {results.length > 0 ? (
              renderMeasureResultList(results)
            ) : (
              <Empty>
                <Illustration
                  source={require("../../../assets/images/illustration-1.png")}
                />
                <Text
                  fontColor={themeColors?.white}
                  fontSize={18}
                  fontFamily="LibreFranklin_700Bold"
                >
                  No hay mediciones guardadas!
                </Text>
              </Empty>
            )}
          </ScrollView>
        </ResultListContainer>
      </Container>
    </>
  );
};

export default MeasurementScreen;
