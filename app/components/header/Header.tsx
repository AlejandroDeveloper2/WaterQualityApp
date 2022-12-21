import React from "react";

import useTheme from "../../hooks/useTheme";

import ToggleThemeButton from "../toggleThemeButton/ToggleThemeButton";

import { HeaderContainer } from "./Header.style";

const Header = () => {
  const { themeColors } = useTheme();
  return (
    <HeaderContainer borderColor={themeColors?.secondaryColor}>
      <ToggleThemeButton />
    </HeaderContainer>
  );
};

export default Header;
