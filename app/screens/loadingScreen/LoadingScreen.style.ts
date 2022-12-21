import styled from "styled-components/native";

const Loading = styled.View`
  justify-content: space-evenly;
  align-items: center;
  height: 45px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  height: 60px;
  position: absolute;
  top: 50px;
  right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const firstFigureStyle = {
  position: "absolute",
  top: 80,
  left: 20,
};

const secondFigureStyle = {
  position: "absolute",
  bottom: 80,
  right: 40,
};

export { Loading, ButtonContainer, firstFigureStyle, secondFigureStyle };
