import styled from "styled-components/native";

import { ToggleButtonProps } from "../../interfaces/buttonProps";

const DrawerButtonContainer = styled.TouchableOpacity<ToggleButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 30px;
  left: 100%;
`;

export { DrawerButtonContainer };
