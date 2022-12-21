import styled from "styled-components/native";

import { ContainerProps } from "../../interfaces/containerProps";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  position: absolute;
  top: 15%;
`;

const ScreenContent = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const PanelContainer = styled.View<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  height: 260px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
`;

const LabelResultContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const WaterFigure = styled.Image`
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;
`;

const PanelContainerVariant = styled(PanelContainer)`
  width: 98%;
  height: 100%;
  margin-top: 15px;
`;

const FirstLayer = styled(PanelContainer)`
  height: 325px;
  border-radius: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  z-index: 10;
  margin-top: -15px;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  margin-top: 20px;
`;

const ResultValuesContainer = styled(OptionsContainer)`
  width: 60%;
  margin-top: 40px;
`;

const firstFigureStyle = {
  position: "absolute",
  top: 150,
  left: 20,
};

const secondFigureStyle = {
  position: "absolute",
  top: 170,
  right: 20,
};

export {
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
};
