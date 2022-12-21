import styled from "styled-components/native";

type ContainerMenuStyleProps = {
  backgroundColor: string;
};

type HeaderMenuStyleProps = {
  borderColor: string;
};

const ContainerMenu = styled.View<ContainerMenuStyleProps>`
  background-color: ${(props) => props.backgroundColor};
  flex: 1;
  width: 100%;
  align-items: center;
  position: relative;
`;

const HeaderMenu = styled.View<HeaderMenuStyleProps>`
  width: 100%;
  border-bottom-width: 2px;
  border-color: ${(props) => props.borderColor};
  align-items: center;
  justify-content: center;
  padding-vertical: 20px;
  margin-bottom: 30px;
`;

const FooterMenu = styled.View`
  position: absolute;
  width: 100%;
  height: 20%;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
`;

const LogoMenu = styled.Image`
  width: 133px;
  height: 133px;
  margin-bottom: 10px;
`;

export { ContainerMenu, HeaderMenu, FooterMenu, LogoMenu };
