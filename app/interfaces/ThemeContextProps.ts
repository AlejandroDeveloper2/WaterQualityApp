import { ThemeColors } from "./themeColors";
import { ColorSchemeName } from "react-native";

export type ThemeContextType = {
  children?: JSX.Element | JSX.Element[];
  deviceTheme: ColorSchemeName;
  themeColors: ThemeColors | undefined;
  loadAppTheme: () => void;
};
