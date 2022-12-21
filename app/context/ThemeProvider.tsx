import * as React from "react";
import { useColorScheme, ColorSchemeName } from "react-native";

import { ThemeContextType } from "../interfaces/ThemeContextProps";
import { ThemeColors } from "../interfaces/themeColors";
import {
  darkThemeColors,
  lightThemeColors,
} from "../styles/GlobalStyles.style";

const ThemeContext = React.createContext<ThemeContextType>(
  {} as ThemeContextType
);

const ThemeProvider = ({ children }: ThemeContextType) => {
  const deviceTheme: ColorSchemeName = useColorScheme();
  const [themeColors, setThemeColors] =
    React.useState<ThemeColors>(darkThemeColors);

  const loadAppTheme = () => {
    if (deviceTheme === "dark") {
      setThemeColors(darkThemeColors);
      return;
    }
    setThemeColors(lightThemeColors);
  };

  React.useEffect(() => {
    loadAppTheme();
  }, [deviceTheme]);

  return (
    <ThemeContext.Provider
      value={{
        deviceTheme,
        themeColors,
        loadAppTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
export default ThemeContext;
