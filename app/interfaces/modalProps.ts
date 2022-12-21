export interface ModalProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPropsModal: (modalParams: LoadingContentType) => void;
  Modal: () => JSX.Element;
}

export type LoadingContentType = {
  message: string;
  iconColor: string | undefined;
  iconName: string;
};
