import { ViewStyle } from "react-native";
import styled from "styled-components/native";

import { ContainerProps } from "../../interfaces/containerProps";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-top: 110px;
`;

const ResultListContainer = styled.SafeAreaView<ContainerProps>`
  width: 100%;
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-top: 60px;
`;

const figureStyle = {
  position: "absolute",
  top: 90,
  right: 20,
};

const scrollViewContentStyle: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const scrollViewStyle: ViewStyle = {
  width: "100%",
};

const Empty = styled.View`
  margin-vertical: 25%;
  align-items: center;
`;

export {
  TitleContainer,
  ResultListContainer,
  figureStyle,
  scrollViewContentStyle,
  scrollViewStyle,
  Empty,
};
