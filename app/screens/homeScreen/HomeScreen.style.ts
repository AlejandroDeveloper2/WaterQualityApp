import styled from "styled-components/native";

import { ToggleButtonProps } from "../../interfaces/buttonProps";

const ScreenTitle = styled.View`
  width: 220px;
  flex-direction: row;
  justify-content: space-between;
`;

const StartAnalysisButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-vertical: 160px;
  position: relative;
`;

const StartAnalysisButton = styled.TouchableOpacity<ToggleButtonProps>`
  width: 206px;
  height: 206px;
  border-radius: 103px;
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ButtonSecondLayer = styled.View<ToggleButtonProps>`
  width: 220px;
  height: 220px;
  border-radius: 110px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  z-index: 9;
`;

const ButtonThirdLayer = styled.ImageBackground`
  width: 240px;
  height: 240px;
`;

const firstFigureStyle = {
  position: "absolute",
  transform: [{ rotate: "45deg" }],
  top: 180,
  right: 20,
};

const secondFigureStyle = {
  position: "absolute",
  top: 220,
  left: 20,
};

const thirdFigureStyle = {
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
};

export {
  ScreenTitle,
  StartAnalysisButtonContainer,
  StartAnalysisButton,
  ButtonSecondLayer,
  ButtonThirdLayer,
  firstFigureStyle,
  secondFigureStyle,
  thirdFigureStyle,
};
