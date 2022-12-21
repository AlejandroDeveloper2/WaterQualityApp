import React from "react";
import { Icon } from "@rneui/themed";

import useTheme from "../../hooks/useTheme";

import { SwitchContainer, Button } from "./ToggleThemeButton.style";

const ToggleThemeButton = () => {
  const { deviceTheme, themeColors } = useTheme();

  return (
    <SwitchContainer>
      <Button
        left={0}
        backgroundColor={
          deviceTheme === "light"
            ? themeColors?.secondaryColor
            : themeColors?.white
        }
      >
        <Icon
          name="brightness-5"
          brand={true}
          type="material"
          color={
            deviceTheme === "light" ? themeColors?.white : themeColors?.gray
          }
        />
      </Button>
      <Button
        right={0}
        backgroundColor={
          deviceTheme === "dark"
            ? themeColors?.secondaryColor
            : themeColors?.white
        }
      >
        <Icon
          name="brightness-2"
          brand={true}
          type="material"
          color={
            deviceTheme === "dark" ? themeColors?.white : themeColors?.textColor
          }
        />
      </Button>
    </SwitchContainer>
  );
};

export default ToggleThemeButton;
