import React from "react";
import { Icon } from "@rneui/themed";

import useTheme from "../../hooks/useTheme";
import { DrawerButtonProps } from "../../interfaces/buttonProps";

import { DrawerButtonContainer } from "./DrawerButton.style";

const DrawerButton = (props: DrawerButtonProps) => {
  const { themeColors } = useTheme();

  return (
    <DrawerButtonContainer
      backgroundColor={
        props.drawerState === "open"
          ? themeColors?.secondaryColor
          : "transparent"
      }
      onPress={props.action}
    >
      <Icon
        name={props.drawerState === "open" ? "clear" : "apps"}
        brand={true}
        type="material"
        color={
          props.drawerState === "open"
            ? themeColors?.white
            : themeColors?.textColor
        }
        iconStyle={{ fontSize: 36 }}
      />
    </DrawerButtonContainer>
  );
};

export default DrawerButton;
