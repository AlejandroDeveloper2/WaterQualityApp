import React from "react";
import { View, Text, StatusBar, useColorScheme, LogBox } from "react-native";
import {
  useFonts,
  LibreFranklin_400Regular,
  LibreFranklin_500Medium,
  LibreFranklin_600SemiBold,
  LibreFranklin_700Bold,
} from "@expo-google-fonts/libre-franklin";

import {
  darkThemeColors,
  lightThemeColors,
} from "./app/styles/GlobalStyles.style";

import AppNavigator from "./app/navigation/AppNavigatior";
import { ThemeProvider } from "./app/context/ThemeProvider";
import { WaterAnalysisProvider } from "./app/context/WaterAnalysisProvider";
import { ThemeColors } from "./app/interfaces/themeColors";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  let [fontsLoaded] = useFonts({
    LibreFranklin_400Regular,
    LibreFranklin_500Medium,
    LibreFranklin_600SemiBold,
    LibreFranklin_700Bold,
  });

  const deviceTheme = useColorScheme();

  if (!fontsLoaded)
    return (
      <View>
        <Text>Cargando..</Text>
      </View>
    );
  return (
    <WaterAnalysisProvider
      isAnalysisStarted={false}
      isBluetoothActive={false}
      isDeviceConnected={false}
      conectedDevice={null}
      analysisResult={{
        id: "",
        name: "",
        resultText: "",
        isSuitable: false,
        measuredValues: [
          {
            name: "Temperatura",
            value: 0,
          },
        ],
      }}
      enableBluetooth={function (): void {
        throw new Error("Function not implemented.");
      }}
      scanDevice={function (): void {
        throw new Error("Function not implemented.");
      }}
      startWaterAnalysis={function (): void {
        throw new Error("Function not implemented.");
      }}
      saveMeasurementResult={function (): void {
        throw new Error("Function not implemented.");
      }}
      getMeasurementResults={function (): void {
        throw new Error("Function not implemented.");
      }}
      connectDevice={function (
        setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
      ): void {
        throw new Error("Function not implemented.");
      }}
      disconnectDevice={function (
        setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
      ): void {
        throw new Error("Function not implemented.");
      }}
      results={[]}
      cleanAnlysisResult={function (navigation: any): void {
        throw new Error("Function not implemented.");
      }}
    >
      <ThemeProvider
        deviceTheme={"dark"}
        loadAppTheme={function (): ThemeColors {
          throw new Error("Function not implemented.");
        }}
        themeColors={undefined}
      >
        <StatusBar
          barStyle={deviceTheme === "light" ? "dark-content" : "dark-content"}
          backgroundColor={
            deviceTheme === "light"
              ? lightThemeColors.primaryColor
              : darkThemeColors.primaryColor
          }
        />
        <AppNavigator />
      </ThemeProvider>
    </WaterAnalysisProvider>
  );
};

export default App;
