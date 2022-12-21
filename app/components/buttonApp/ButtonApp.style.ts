import styled from "styled-components/native";

import { ButtonStyleProps } from "../../interfaces/buttonProps";

const ButtonContainer = styled.TouchableOpacity<ButtonStyleProps>`
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export { ButtonContainer };
