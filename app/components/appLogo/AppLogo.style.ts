import styled from "styled-components/native";

const LogoContainer = styled.View`
  width: 261px;
  height: 387px;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 180px;
  height: 180px;
`;

const SecondLayer = styled(Logo)`
  width: 261px;
  height: 387px;
`;

const ThirdLayer = styled(Logo)`
  width: 210px;
  height: 210px;
`;

const style = {
  position: "absolute",
};

export { LogoContainer, Logo, SecondLayer, ThirdLayer, style };
