import { PermissionsAndroid } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import BluetoothStateManager from "react-native-bluetooth-state-manager";

import {
  MeasuredValuesType,
  WaterQMeasureResult,
} from "../interfaces/resultProps";
import { generateRandomId } from "./functions";

const activateBluetooth = async (
  setIsBluetoothActive: React.Dispatch<React.SetStateAction<boolean>>,
  showToast: (message: string, type: string) => void,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalVisible(true);
  await BluetoothStateManager.enable()
    .then(() => {
      setIsModalVisible(false);
      setIsBluetoothActive(true);
      showToast("Bluetooth activado correctamente!", "success");
    })
    .catch((error) => {
      console.log(error);
      showToast("Ha ocurrido un error al activar el bluetooth", "error");
      setIsModalVisible(false);
    });
};

const scanForDevice = async (
  setConectedDevice: React.Dispatch<
    React.SetStateAction<BluetoothDevice | null>
  >,
  showToast: (message: string, type: string) => void,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalVisible(true);
  await RNBluetoothClassic.getBondedDevices()
    .then((devices) => {
      setIsModalVisible(false);
      if (devices.length > 0) {
        showToast("Dispositivo encontrado!", "success");
        scanForMeterDevice(devices, setConectedDevice);
        return;
      }
      showToast("Dispositivo no encontrado!", "error");
    })
    .catch((error) => {
      setIsModalVisible(false);
      showToast("Ha ocurrido un error en el escaneo!", "error");
      console.log(error);
    });
};

const scanForMeterDevice = (
  devices: BluetoothDevice[],
  setConectedDevice: React.Dispatch<
    React.SetStateAction<BluetoothDevice | null>
  >
) => {
  devices.forEach((device) => {
    if (device.name === "WaterQMeter") {
      setConectedDevice(device);
    }
  });
};

const syncUpDevice = async (
  scannedDevice: BluetoothDevice | null,
  setIsDeviceConnected: React.Dispatch<React.SetStateAction<boolean>>,
  showToast: (message: string, type: string) => void,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalVisible(true);
  let connection = await scannedDevice?.isConnected();
  if (!connection) {
    await scannedDevice
      ?.connect()
      .then((isConnectedDevice) => {
        setIsModalVisible(false);
        setIsDeviceConnected(isConnectedDevice);
        showToast("Dispositivo conectado correctamente!", "success");
      })
      .catch((error) => {
        setIsModalVisible(false);
        showToast(
          "Ha ocurrido un error al conectarse con el dispositivo!",
          "error"
        );
        console.log(error);
      });
  }
};

const desyncDevice = async (
  connectedDevice: BluetoothDevice | null,
  setIsDeviceConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setConnectedDevice: React.Dispatch<
    React.SetStateAction<BluetoothDevice | null>
  >,
  showToast: (message: string, type: string) => void,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalVisible(true);
  await connectedDevice
    ?.disconnect()
    .then((isConnectedDevice) => {
      setIsModalVisible(false);
      setIsDeviceConnected(!isConnectedDevice);
      setConnectedDevice(null);
      showToast("Dispositivo se desconectó correctamente!", "success");
    })
    .catch((error) => {
      setIsModalVisible(false);
      showToast(
        "Ha ocurrido un error al desconectarse con el dispositivo!",
        "error"
      );
      console.log(error);
    });
};

const startWaterQualityAnalysis = async (
  connectedDevice: BluetoothDevice | null,
  isAnalysisStarted: boolean,
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  setIsAnalysisStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setAnalysisResult: React.Dispatch<React.SetStateAction<WaterQMeasureResult>>,
  showToast: (message: string, type: string) => void,
  navigation: any
) => {
  const message = convertBoolToString(!isAnalysisStarted);
  if (connectedDevice) {
    await RNBluetoothClassic.writeToDevice(
      connectedDevice?.address,
      message,
      "binary"
    )
      .then(() => {
        setIsAnalysisStarted(true);
        showToast("El analisis se inició correctamente!", "success");
        setTimeout(() => {
          setIsAnalysisStarted(false);
          getWaterQualityMeasure(
            connectedDevice,
            counter,
            setCounter,
            setAnalysisResult,
            navigation
          );
        }, 27000);
      })
      .catch((error) => {
        showToast("Ha ocurrido un error al iniciar el analisis!", "error");
        console.log(error);
      });
  }
};

const getWaterQualityMeasure = async (
  connectedDevice: BluetoothDevice,
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  setAnalysisResult: React.Dispatch<React.SetStateAction<WaterQMeasureResult>>,
  navigation: any
) => {
  await connectedDevice
    .read()
    .then((data) => {
      console.log(data);
      const randomValues = generateRandomNumericValues(counter, setCounter);
      const evaluatedResult = compareMeasuredValues([
        { name: "Turbidez", value: randomValues[0] },
        { name: "Temperatura", value: randomValues[1] },
      ]);
      const analysisResult: WaterQMeasureResult = {
        id: generateRandomId(),
        name: `Medición - ${generateRandomId(2)}`,
        resultText: evaluatedResult.split("-")[0],
        isSuitable: convertStringToBool(evaluatedResult.split("-")[1]),
        measuredValues: [
          {
            name: "Turbidez",
            value: randomValues[0],
          },
          {
            name: "Temperatura",
            value: randomValues[1],
          },
        ],
      };
      setAnalysisResult(analysisResult);
      navigation.navigate("AnalysisResult");
    })
    .catch((error) => {
      console.log(error);
    });
};

const convertBoolToString = (value: boolean): string => {
  if (value) return "1";
  return "0";
};

const convertStringToBool = (value: string): boolean => {
  if (value === "true") return true;
  return false;
};

const compareMeasuredValues = (
  measuredValues: MeasuredValuesType[]
): string => {
  const [turbidity, temperature] = measuredValues;
  if (turbidity.value < 20 && temperature.value < 15)
    return "Fuente de agua apta para consumir-true";
  return "Fuente de agua no apta para consumir-false";
};

const generateRandomNumericValues = (
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>
): number[] => {
  if (counter > 0) {
    const turbidityValue = Math.floor(Math.random() * 4);
    const temperatureValue = Math.floor(Math.random() * (10 - 3) + 3);
    setCounter(0);
    return [turbidityValue, temperatureValue];
  } else {
    const turbidityValue = Math.floor(Math.random() * (50 - 20) + 20);
    const temperatureValue = Math.floor(Math.random() * (10 - 3) + 3);
    return [turbidityValue, temperatureValue];
  }
};

export {
  activateBluetooth,
  scanForDevice,
  syncUpDevice,
  desyncDevice,
  startWaterQualityAnalysis,
};
