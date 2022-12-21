import React from "react";
import { Overlay } from "@rneui/themed";

import useTheme from "./useTheme";

import LoadingComponent from "../components/loadingComponent/LoadingComponent";

import { ModalProps, LoadingContentType } from "../interfaces/modalProps";

const useOverlay = (): ModalProps => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [modalProps, setModalProps] = React.useState<LoadingContentType>({
    message: "",
    iconColor: "",
    iconName: "",
  });
  const { themeColors } = useTheme();

  const setPropsModal = (modalParams: LoadingContentType): void => {
    setModalProps(modalParams);
  };

  const Modal = (): JSX.Element => {
    return (
      <Overlay
        isVisible={isModalVisible}
        animationType="fade"
        overlayStyle={{ backgroundColor: themeColors?.primaryColor }}
      >
        <LoadingComponent
          message={modalProps.message}
          iconColor={modalProps.iconColor}
          iconName={modalProps.iconName}
        />
      </Overlay>
    );
  };

  return {
    setIsModalVisible,
    setPropsModal,
    Modal,
  };
};

export default useOverlay;
