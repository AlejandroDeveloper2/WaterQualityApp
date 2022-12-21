import styled from "styled-components/native";

import { ResultContainerStyle } from "../../interfaces/resultProps";

const ResultContainer = styled.View<ResultContainerStyle>`
  width: 315px;
  height: 190px;
  border-width: 5px;
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 20px;
  padding-vertical: 10px;
  position: relative;
  overflow: hidden;
`;

const ResultDetails = styled.View<ResultContainerStyle>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${(props) => props.backgroundColor};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 5px;
  left: 40%;
`;

const resultDetailsStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: 10,
  justifyContent: "center",
  alignItems: "center",
};

export { ResultContainer, ResultDetails, ButtonContainer, resultDetailsStyle };
