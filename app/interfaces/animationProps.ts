export type Animation = {
  name: "rotate" | "bounce" | "toggle";
};

export interface AnimationHookProps {
  myStyle: any;
  animateComponent: (
    animationValue: number,
    reverse: boolean,
    duration: number
  ) => void;
  stopAnimation: () => void;
  hideMeasurementResultsDetails: () => void;
  showMeasurementResultsDetails: () => void;
}
