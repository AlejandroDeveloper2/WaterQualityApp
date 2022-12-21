import styled from "styled-components/native";

import { BannerStyleProps } from "../../interfaces/inferiorBannerProps";

const BannerContainer = styled.View`
  width: 100%;
  height: 220px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const BannerFirstLayer = styled.View<BannerStyleProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  z-index: 10;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const BannerSecondLayer = styled(BannerFirstLayer)<BannerStyleProps>`
  z-index: 9;
  position: relative;
  margin-bottom: 20px;
`;

const BannerIcon = styled.View<BannerStyleProps>`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -25px;
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  z-index: 11;
`;

const BannerTitle = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const figureStyle = {
  position: "absolute",
  right: 0,
  top: 10,
};

export {
  BannerContainer,
  BannerFirstLayer,
  BannerSecondLayer,
  BannerIcon,
  BannerTitle,
  figureStyle,
};
