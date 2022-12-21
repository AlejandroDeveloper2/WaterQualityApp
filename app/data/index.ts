import { ButtonAppProps } from "../interfaces/buttonProps";
import { ConfigOptions } from "../interfaces/inferiorBannerProps";
import { WaterQMeasureResult } from "../interfaces/resultProps";
import { ThemeColors } from "../interfaces/themeColors";

const getOptionButtonsData = (
  themeColors: ThemeColors | undefined,
  config: ConfigOptions,
  analysisResult: WaterQMeasureResult
): ButtonAppProps[] => {
  return [
    {
      label: "Guardar datos",
      iconName: "add",
      size: {
        width: 160,
        height: 57,
      },
      textWidth: 70,
      backgroundColor: themeColors?.secondaryColor,
      action: () => {
        config.setPropsModal({
          message: "Guardando resultado...",
          iconColor: themeColors?.secondaryColor,
          iconName: "add",
        });
        config.saveMeasurementResult(
          analysisResult,
          config.setIsModalVisible,
          config.navigation
        );
      },
    },
    {
      label: "No guardar",
      iconName: "clear",
      size: {
        width: 160,
        height: 57,
      },
      textWidth: 60,
      backgroundColor: themeColors?.mediumGray,
      action: () => config.cleanAnlysisResult(config.navigation),
    },
  ];
};

export { getOptionButtonsData };
