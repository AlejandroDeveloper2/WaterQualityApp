import { LoadingContentType } from "./modalProps";
import { WaterQMeasureResult } from "./resultProps";

export interface BannerStyleProps {
  backgroundColor: string;
}

export interface BannerProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPropsModal: (modalParams: LoadingContentType) => void;
}

export type ConfigOptions = {
  saveMeasurementResult: (
    resultData: WaterQMeasureResult,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    navigation: any
  ) => void;
  cleanAnlysisResult: (navigation: any) => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPropsModal: (modalParams: LoadingContentType) => void;
  navigation: any;
};
