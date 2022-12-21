export type WaterQMeasureResult = {
  id: string;
  name: string;
  resultText: string;
  isSuitable: boolean;
  measuredValues: MeasuredValuesType[];
};

export type MeasuredValuesType = {
  name: "Temperatura" | "Turbidez";
  value: number;
};

export interface WaterQMeasureResultProps {
  resultInfo: WaterQMeasureResult;
}

export interface ResultContainerStyle {
  borderColor: string | undefined;
  backgroundColor: string;
}
