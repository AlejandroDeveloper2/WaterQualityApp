import styled from "styled-components/native";

import { ThemeColors } from "../interfaces/themeColors";
import { TextProps } from "../interfaces/textProps";
import { ContainerProps } from "../interfaces/containerProps";

const darkThemeColors: ThemeColors = {
  primaryColor: "#2B2828",
  secondaryColor: "#26A3EA",
  textColor: "#ffffff",
  mediumGray: "#8D9FA9",
  gray: "#3D3939",
  white: "#ffffff",
};

const lightThemeColors: ThemeColors = {
  primaryColor: "#F5ECEC",
  secondaryColor: "#26A3EA",
  textColor: "#5F5858",
  mediumGray: "#BBB1B1",
  gray: "#5F5858",
  white: "#ffffff",
};

interface MeasureValuesStyle {
  borderColor: string | undefined;
}

const Text = styled.Text<TextProps>`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize}px;
  text-align: center;
  font-family: ${(props) => props.fontFamily};
  width: ${(props) => (props.width ? props.width : 100)}%;
`;

const Container = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const AppFooter = styled.View`
  position: absolute;
  bottom: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const MeasuredValuesContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const MeasuredValues = styled.View<MeasureValuesStyle>`
  width: 100px;
  height: 70px;
  background-color: transparent;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${(props) => props.borderColor};
  justify-content: center;
  align-items: center;
`;

const Illustration = styled.Image`
  width: 150px;
  height: 150px;
`;

export {
  Text,
  Container,
  AppFooter,
  darkThemeColors,
  lightThemeColors,
  MeasuredValuesContainer,
  MeasuredValues,
  Illustration,
};
