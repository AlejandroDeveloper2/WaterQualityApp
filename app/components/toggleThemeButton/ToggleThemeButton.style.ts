import styled from "styled-components/native";

import { ToggleButtonProps } from "../../interfaces/buttonProps";

const SwitchContainer = styled.View`
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
`;

const Button = styled.TouchableOpacity<ToggleButtonProps>`
  width: 50%;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
`;

export { SwitchContainer, Button };
