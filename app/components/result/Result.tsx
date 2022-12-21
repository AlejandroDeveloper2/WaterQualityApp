import React from "react";
import Animated from "react-native-reanimated";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";
import { WaterQMeasureResultProps } from "../../interfaces/resultProps";
import { renderMeasuredValues } from "../../helpers/functions";

import ButtonApp from "../buttonApp/ButtonApp";

import { Text } from "../../styles/GlobalStyles.style";
import {
  ResultContainer,
  ResultDetails,
  ButtonContainer,
  resultDetailsStyle,
} from "./Result.style";

const Result = (props: WaterQMeasureResultProps): JSX.Element => {
  const { resultInfo } = props;
  const { themeColors } = useTheme();
  const {
    myStyle,
    hideMeasurementResultsDetails,
    showMeasurementResultsDetails,
  } = useAnimation({
    name: "toggle",
  });

  const setResultColor = (): string | undefined => {
    if (resultInfo.isSuitable) return themeColors?.secondaryColor;
    return themeColors?.mediumGray;
  };

  return (
    <ResultContainer
      borderColor={setResultColor()}
      backgroundColor={themeColors?.gray}
    >
      <Text
        fontSize={20}
        fontFamily="LibreFranklin_500Medium"
        fontColor={themeColors?.textColor}
      >
        {resultInfo.name}
      </Text>
      <Text
        fontSize={16}
        fontFamily="LibreFranklin_500Medium"
        fontColor={setResultColor()}
      >
        {resultInfo.resultText}
      </Text>
      <ButtonApp
        iconName="keyboard-arrow-down"
        size={{ width: 60, height: 60 }}
        backgroundColor={setResultColor()}
        action={() => showMeasurementResultsDetails()}
      />
      <Animated.View style={[myStyle, resultDetailsStyle]}>
        <ResultDetails backgroundColor={themeColors?.gray}>
          {renderMeasuredValues(resultInfo.measuredValues, setResultColor)}
          <ButtonContainer>
            <ButtonApp
              iconName="keyboard-arrow-up"
              size={{ width: 50, height: 50 }}
              backgroundColor={setResultColor()}
              action={() => hideMeasurementResultsDetails()}
            />
          </ButtonContainer>
        </ResultDetails>
      </Animated.View>
    </ResultContainer>
  );
};

export default Result;
