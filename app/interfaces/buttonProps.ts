import { DrawerStatus } from "@react-navigation/native";

export interface ToggleButtonProps {
  backgroundColor: string;
}

export interface ButtonStyleProps {
  backgroundColor: string;
  size: ButtonSize;
  fontColor: string;
}

type ButtonSize = {
  width: number;
  height: number;
};

export interface ButtonAppProps {
  iconName: string;
  label?: string;
  textWidth?: number;
  size?: ButtonSize;
  backgroundColor?: string;
  fontColor?: string | undefined;
  action: () => void;
}

export interface DrawerButtonProps {
  drawerState: DrawerStatus;
  action: () => void;
}
