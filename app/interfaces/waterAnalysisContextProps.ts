import { NavigationProp } from "@react-navigation/native";
import { BluetoothDevice } from "react-native-bluetooth-classic";

import { WaterQMeasureResult } from "./resultProps";

export type WaterAnalysisContextType = {
  children?: JSX.Element | JSX.Element[];
  isAnalysisStarted: boolean;
  isBluetoothActive: boolean;
  isDeviceConnected: boolean;
  conectedDevice: BluetoothDevice | null;
  analysisResult: WaterQMeasureResult;
  results: WaterQMeasureResult[];
  enableBluetooth: (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  scanDevice: (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  connectDevice: (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  disconnectDevice: (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  startWaterAnalysis: (navigation: any) => void;
  saveMeasurementResult: (
    resultData: WaterQMeasureResult,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    navigation: any
  ) => void;
  getMeasurementResults: (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  cleanAnlysisResult: (navigation: any) => void;
};
