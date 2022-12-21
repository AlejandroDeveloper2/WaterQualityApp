import React from "react";
import { Icon } from "@rneui/themed";
import Animated from "react-native-reanimated";

import useTheme from "../../hooks/useTheme";
import useAnimation from "../../hooks/useAnimation";
import useWaterAnalysis from "../../hooks/useWaterAnalysis";
import useOverlay from "../../hooks/useOverlay";
import { BannerProps } from "../../interfaces/inferiorBannerProps";

import Figure from "../figure/Figure";
import ButtonApp from "../buttonApp/ButtonApp";
import ToastComponent from "../toastComponent/ToastComponent";

import {
  BannerContainer,
  BannerFirstLayer,
  BannerSecondLayer,
  BannerIcon,
  BannerTitle,
  figureStyle,
} from "./InferiorPanel.style";
import { Text } from "../../styles/GlobalStyles.style";

const InferirorPanel = (): JSX.Element => {
  const { themeColors } = useTheme();
  const { myStyle, animateComponent, stopAnimation } = useAnimation({
    name: "bounce",
  });
  const { isBluetoothActive, conectedDevice } = useWaterAnalysis();
  const { setIsModalVisible, setPropsModal, Modal } = useOverlay();

  React.useEffect(() => {
    animateComponent(10, true, 1000);
    return () => {
      stopAnimation();
    };
  }, []);

  return (
    <>
      <Modal />
      <ToastComponent />
      <BannerContainer>
        <BannerFirstLayer backgroundColor={themeColors?.gray}>
          <BannerIcon backgroundColor={themeColors?.secondaryColor}>
            <Icon
              name="keyboard-arrow-down"
              brand={true}
              type="material"
              color={themeColors?.white}
            />
          </BannerIcon>
          <Animated.View style={[myStyle, figureStyle]}>
            <Figure
              color={themeColors?.mediumGray}
              size={{ transform: 0.6 }}
              svgName={{ name: "circuit-1" }}
            />
          </Animated.View>
          {/* Dinamic content */}
          {isBluetoothActive && conectedDevice === null ? (
            <ActiveBluetoothBanner
              setIsModalVisible={setIsModalVisible}
              setPropsModal={setPropsModal}
            />
          ) : isBluetoothActive && conectedDevice ? (
            <FoundDeviceBanner
              setIsModalVisible={setIsModalVisible}
              setPropsModal={setPropsModal}
            />
          ) : (
            <InactiveBluetoothBanner
              setIsModalVisible={setIsModalVisible}
              setPropsModal={setPropsModal}
            />
          )}
        </BannerFirstLayer>
        <BannerSecondLayer
          backgroundColor={themeColors?.secondaryColor}
        ></BannerSecondLayer>
      </BannerContainer>
    </>
  );
};

const InactiveBluetoothBanner = (props: BannerProps): JSX.Element => {
  const { themeColors } = useTheme();
  const { enableBluetooth } = useWaterAnalysis();

  return (
    <>
      <BannerTitle>
        <Icon
          name="bluetooth-disabled"
          brand={true}
          type="material"
          color={themeColors?.white}
          style={{ marginBottom: 10 }}
        />
        <Text
          fontColor={themeColors?.white}
          fontSize={18}
          fontFamily="LibreFranklin_400Regular"
          width={60}
        >
          La conexión bluetooth no esta activada
        </Text>
      </BannerTitle>
      <ButtonApp
        iconName="bluetooth"
        label="Activar Bluetooth"
        textWidth={70}
        action={() => {
          props.setPropsModal({
            message: "Activando bluetooth..",
            iconColor: themeColors?.secondaryColor,
            iconName: "bluetooth",
          });
          enableBluetooth(props.setIsModalVisible);
        }}
      />
    </>
  );
};

const ActiveBluetoothBanner = (props: BannerProps): JSX.Element => {
  const { themeColors } = useTheme();
  const { scanDevice } = useWaterAnalysis();
  return (
    <>
      <BannerTitle>
        <Icon
          name="devices"
          brand={true}
          type="material"
          color={themeColors?.white}
          style={{ marginBottom: 10 }}
        />
        <Text
          fontColor={themeColors?.white}
          fontSize={18}
          fontFamily="LibreFranklin_400Regular"
          width={60}
        >
          Conectate al dispositivo medidor
        </Text>
      </BannerTitle>
      <ButtonApp
        iconName="search"
        label="Buscar dispositivo"
        textWidth={70}
        action={() => {
          props.setPropsModal({
            message: "Buscando dispositivo..",
            iconColor: themeColors?.secondaryColor,
            iconName: "devices",
          });
          scanDevice(props.setIsModalVisible);
        }}
      />
    </>
  );
};

const FoundDeviceBanner = (props: BannerProps): JSX.Element => {
  const { themeColors } = useTheme();
  const { conectedDevice, isDeviceConnected, connectDevice, disconnectDevice } =
    useWaterAnalysis();

  return (
    <>
      <BannerTitle>
        <Icon
          name="scanner"
          brand={true}
          type="material"
          color={themeColors?.white}
          style={{ marginBottom: 10 }}
        />
        <Text
          fontColor={themeColors?.white}
          fontSize={18}
          fontFamily="LibreFranklin_400Regular"
          width={60}
        >
          {conectedDevice?.name}
        </Text>
      </BannerTitle>
      {isDeviceConnected ? (
        <ButtonApp
          iconName="power-settings-new"
          label="Desconectar"
          textWidth={50}
          action={() => {
            props.setPropsModal({
              message: "Desconectando dispositivo..",
              iconColor: themeColors?.secondaryColor,
              iconName: "power-settings-new",
            });
            disconnectDevice(props.setIsModalVisible);
          }}
        />
      ) : (
        <ButtonApp
          iconName="sync-alt"
          label="Conectar"
          textWidth={40}
          action={() => {
            props.setPropsModal({
              message: "Conectando dispositivo..",
              iconColor: themeColors?.secondaryColor,
              iconName: "sync-alt",
            });
            connectDevice(props.setIsModalVisible);
          }}
        />
      )}
    </>
  );
};

export default InferirorPanel;
