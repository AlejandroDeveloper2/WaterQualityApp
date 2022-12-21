import { BackHandler, Alert } from "react-native";

import { BackHandlerProps } from "../interfaces/backhandlerProps";

const useBackhandler = (): BackHandlerProps => {
  const exitApp = (): boolean => {
    Alert.alert("Mensaje!", "¿Seguro que quieres salir del aplicación?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Salir", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  return {
    exitApp,
  };
};

export default useBackhandler;
