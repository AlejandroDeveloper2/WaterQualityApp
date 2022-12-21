import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";

import useTheme from "../../hooks/useTheme";
import useBackhandler from "../../hooks/useBackhandler";

import ButtonApp from "../buttonApp/ButtonApp";
import DrawerButton from "../drawerButton/DrawerButton";

import { Text } from "../../styles/GlobalStyles.style";
import {
  ContainerMenu,
  HeaderMenu,
  FooterMenu,
  LogoMenu,
} from "./CustomDrawer.style";

const CustomDrawer = (props: DrawerContentComponentProps): JSX.Element => {
  const { themeColors } = useTheme();
  const drawerState = useDrawerStatus();
  const { exitApp } = useBackhandler();

  return (
    <ContainerMenu backgroundColor={themeColors?.gray}>
      <DrawerButton
        drawerState={drawerState}
        action={() =>
          drawerState === "open"
            ? props.navigation.closeDrawer()
            : props.navigation.openDrawer()
        }
      />
      <HeaderMenu borderColor={themeColors?.secondaryColor}>
        <LogoMenu
          source={require("../../../assets/images/logo-first-layer.png")}
        />
        <Text
          fontColor={themeColors?.white}
          fontSize={18}
          fontFamily="LibreFranklin_500Medium"
        >
          Menú de opciones
        </Text>
      </HeaderMenu>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <FooterMenu>
        <ButtonApp
          label="Salir del app"
          iconName="power-settings-new"
          textWidth={60}
          backgroundColor={themeColors?.primaryColor}
          size={{ width: 160, height: 55 }}
          fontColor={themeColors?.textColor}
          action={() => exitApp()}
        />
        <Text
          fontColor={themeColors?.white}
          fontSize={14}
          fontFamily="LibreFranklin_400Regular"
        >
          Versión 1.0.0
        </Text>
      </FooterMenu>
    </ContainerMenu>
  );
};

export default CustomDrawer;
