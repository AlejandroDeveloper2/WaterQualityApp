import React from "react";
import { Icon } from "@rneui/themed";

import useTheme from "../../hooks/useTheme";
import { ButtonAppProps } from "../../interfaces/buttonProps";

import { ButtonContainer } from "./ButtonApp.style";
import { Text } from "../../styles/GlobalStyles.style";

const ButtonApp = (props: ButtonAppProps) => {
  const { themeColors } = useTheme();

  return (
    <ButtonContainer
      onPress={props.action}
      backgroundColor={
        props.backgroundColor
          ? props.backgroundColor
          : themeColors?.secondaryColor
      }
      size={props.size ? props.size : { width: 200, height: 57 }}
    >
      <Icon
        name={props.iconName}
        brand={true}
        type="material"
        color={props.fontColor ? props.fontColor : themeColors?.white}
      />
      {props.textWidth && props.label && (
        <Text
          fontColor={props.fontColor ? props.fontColor : themeColors?.white}
          fontSize={16}
          fontFamily="LibreFranklin_500Medium"
          width={props.textWidth}
        >
          {props.label}
        </Text>
      )}
    </ButtonContainer>
  );
};

export default ButtonApp;
