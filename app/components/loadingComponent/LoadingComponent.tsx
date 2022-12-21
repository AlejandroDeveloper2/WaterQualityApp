import { ActivityIndicator } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";

import useTheme from "../../hooks/useTheme";
import { LoadingComponentProps } from "../../interfaces/loadingComponentProps";

import { Text } from "../../styles/GlobalStyles.style";
import { LoadingContainer } from "./LoadingComponent.style";

const LoadingComponent = (props: LoadingComponentProps): JSX.Element => {
  const { themeColors } = useTheme();

  return (
    <LoadingContainer>
      <Icon
        name={props.iconName}
        brand={true}
        type="material"
        color={props.iconColor}
        style={{ marginBottom: 10 }}
      />
      <Text
        fontColor={themeColors?.textColor}
        fontSize={18}
        fontFamily="LibreFranklin_400Regular"
      >
        {props.message}
      </Text>
      <ActivityIndicator size="large" color={themeColors?.textColor} />
    </LoadingContainer>
  );
};

export default LoadingComponent;
