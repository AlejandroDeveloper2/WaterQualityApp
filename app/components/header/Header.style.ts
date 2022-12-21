import styled from "styled-components/native";

import { HeaderStyleProps } from "../../interfaces/headerProps";

const HeaderContainer = styled.View<HeaderStyleProps>`
  width: 90%;
  height: 60px;
  border-color: ${(props) => props.borderColor};
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  border-bottom-width: 2px;
  position: absolute;
  top: 30px;
`;

export { HeaderContainer };
