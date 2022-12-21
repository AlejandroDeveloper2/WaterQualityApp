import * as React from "react";
import Toast from "react-native-toast-message";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import { BluetoothDevice } from "react-native-bluetooth-classic";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { WaterAnalysisContextType } from "../interfaces/waterAnalysisContextProps";
import { WaterQMeasureResult } from "../interfaces/resultProps";
import {
  activateBluetooth,
  scanForDevice,
  syncUpDevice,
  desyncDevice,
  startWaterQualityAnalysis,
} from "../helpers";

const WaterAnalysisContext = React.createContext<WaterAnalysisContextType>(
  {} as WaterAnalysisContextType
);

const WaterAnalysisProvider = ({ children }: WaterAnalysisContextType) => {
  const [isAnalysisStarted, setIsAnalysisStarted] =
    React.useState<boolean>(false);
  const [isBluetoothActive, setIsBluetoothActive] =
    React.useState<boolean>(false);
  const [isDeviceConnected, setIsDeviceConnected] =
    React.useState<boolean>(false);
  const [conectedDevice, setConectedDevice] =
    React.useState<BluetoothDevice | null>(null);
  const [analysisResult, setAnalysisResult] =
    React.useState<WaterQMeasureResult>({
      id: "",
      name: "",
      resultText: "",
      isSuitable: false,
      measuredValues: [],
    });
  const [results, setResults] = React.useState<WaterQMeasureResult[]>([]);
  const [counter, setCounter] = React.useState<number>(0);

  const enableBluetooth = (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    activateBluetooth(setIsBluetoothActive, showToast, setIsModalVisible);
  };

  const scanDevice = (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    scanForDevice(setConectedDevice, showToast, setIsModalVisible);
  };

  const connectDevice = (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    syncUpDevice(
      conectedDevice,
      setIsDeviceConnected,
      showToast,
      setIsModalVisible
    );
  };

  const disconnectDevice = (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    desyncDevice(
      conectedDevice,
      setIsDeviceConnected,
      setConectedDevice,
      showToast,
      setIsModalVisible
    );
  };

  const startWaterAnalysis = (navigation: any): void => {
    setCounter((prevState) => {
      const newState = prevState + 1;
      return newState;
    });
    startWaterQualityAnalysis(
      conectedDevice,
      isAnalysisStarted,
      counter,
      setCounter,
      setIsAnalysisStarted,
      setAnalysisResult,
      showToast,
      navigation
    );
  };

  const saveMeasurementResult = async (
    resultData: WaterQMeasureResult,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    navigation: any
  ) => {
    const convertedData = JSON.stringify([...results, resultData]);
    setIsModalVisible(true);
    await AsyncStorage.setItem("@results", convertedData)
      .then(() => {
        setIsModalVisible(false);
        getMeasurementResults(setIsModalVisible);
        showToast("Resultado de medición guardado con exito!", "success");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 2000);
      })
      .catch((error) => {
        setIsModalVisible(false);
        showToast("Hubo un error al realizar al guardar la medición!", "error");
        console.log(error);
      });
  };

  const getMeasurementResults = async (
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsModalVisible(true);
    await AsyncStorage.getItem("@results")
      .then((resultsLS) => {
        setIsModalVisible(false);
        if (resultsLS !== null) {
          const convertedResultsLS: WaterQMeasureResult[] =
            JSON.parse(resultsLS);
          setResults(convertedResultsLS);
          showToast("Resultados encontrados exitosamente!", "success");
        }
      })
      .catch((error) => {
        showToast("Hubo un error al buscar resultados!", "error");
        setIsModalVisible(false);
        console.log(error);
      });
  };

  const cleanAnlysisResult = (navigation: any): void => {
    setAnalysisResult({
      id: "",
      name: "",
      resultText: "",
      isSuitable: false,
      measuredValues: [],
    });
    navigation.navigate("Home");
  };

  const showToast = (message: string, type: string): void => {
    Toast.show({
      type,
      text1: "Mensaje",
      text2: message,
    });
  };

  React.useEffect(() => {
    BluetoothStateManager.onStateChange((bluetoothState) => {
      if (bluetoothState === "PoweredOn") {
        setIsBluetoothActive(true);
      } else if (bluetoothState === "PoweredOff") {
        setIsBluetoothActive(false);
        setIsBluetoothActive(false);
        setConectedDevice(null);
        setIsDeviceConnected(false);
      }
    }, true);
  }, []);

  const value = React.useMemo(
    () => ({
      isAnalysisStarted,
      isBluetoothActive,
      isDeviceConnected,
      conectedDevice,
      analysisResult,
      results,
      enableBluetooth,
      scanDevice,
      connectDevice,
      disconnectDevice,
      startWaterAnalysis,
      saveMeasurementResult,
      getMeasurementResults,
      cleanAnlysisResult,
    }),
    [
      isAnalysisStarted,
      isBluetoothActive,
      isDeviceConnected,
      conectedDevice,
      analysisResult,
      results,
      enableBluetooth,
      scanDevice,
      connectDevice,
      disconnectDevice,
      startWaterAnalysis,
      saveMeasurementResult,
      getMeasurementResults,
      cleanAnlysisResult,
    ]
  );

  return (
    <WaterAnalysisContext.Provider value={value}>
      {children}
    </WaterAnalysisContext.Provider>
  );
};

export { WaterAnalysisProvider };
export default WaterAnalysisContext;
