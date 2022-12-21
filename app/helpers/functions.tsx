import {
  WaterQMeasureResult,
  MeasuredValuesType,
} from "../interfaces/resultProps";
import { ConfigOptions } from "../interfaces/inferiorBannerProps";
import { ThemeColors } from "../interfaces/themeColors";
import { getOptionButtonsData } from "../data";

import Result from "../components/result/Result";
import ButtonApp from "../components/buttonApp/ButtonApp";

import {
  Text,
  MeasuredValuesContainer,
  MeasuredValues,
} from "../styles/GlobalStyles.style";

const renderMeasureResultList = (
  data: WaterQMeasureResult[]
): JSX.Element[] => {
  const itemList = data.map((item) => {
    return <Result key={generateRandomId()} resultInfo={item} />;
  });

  return itemList;
};

const renderMeasuredValues = (
  data: MeasuredValuesType[],
  setResultColor: () => string | undefined
): JSX.Element[] => {
  const measuredValues = data.map((measuredValue) => {
    return (
      <MeasuredValuesContainer key={generateRandomId()}>
        <MeasuredValues borderColor={setResultColor()}>
          <Text
            fontSize={32}
            fontFamily="LibreFranklin_500Medium"
            fontColor={setResultColor()}
          >
            {measuredValue.value + setMeasurementUnit(measuredValue.name)}
          </Text>
        </MeasuredValues>
        <Text
          fontSize={16}
          fontFamily="LibreFranklin_500Medium"
          fontColor={setResultColor()}
        >
          {measuredValue.name}
        </Text>
      </MeasuredValuesContainer>
    );
  });
  return measuredValues;
};

const setMeasurementUnit = (unitName: string): string => {
  if (unitName === "Temperatura") return "°C";
  return "";
};

const renderResultOptions = (
  themeColors: ThemeColors | undefined,
  config: ConfigOptions,
  analysisResult: WaterQMeasureResult
): JSX.Element[] => {
  const buttonsData = getOptionButtonsData(themeColors, config, analysisResult);
  const options = buttonsData.map((buttonData) => {
    return (
      <ButtonApp
        key={generateRandomId()}
        label={buttonData.label}
        iconName={buttonData.iconName}
        size={buttonData.size}
        action={buttonData.action}
        textWidth={buttonData.textWidth}
        backgroundColor={buttonData.backgroundColor}
      />
    );
  });

  return options;
};

const generateRandomId = (idLength: number = 8): string => {
  let randomId = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < idLength; i++) {
    randomId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomId;
};

export {
  renderMeasureResultList,
  renderMeasuredValues,
  renderResultOptions,
  generateRandomId,
};
