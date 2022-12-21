import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Animation, AnimationHookProps } from "../interfaces/animationProps";

const useAnimation = (animationName: Animation): AnimationHookProps => {
  const offset = useSharedValue(animationName.name === "toggle" ? 190 : 0);
  // @ts-ignore
  const myStyle = useAnimatedStyle(() => {
    if (animationName.name === "rotate") {
      return {
        transform: [{ rotate: `${offset.value}deg` }],
      };
    }
    if (animationName.name === "bounce") {
      return {
        transform: [{ translateY: offset.value }],
      };
    }
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  const animateComponent = (
    animationValue: number,
    reverse: boolean,
    duration: number
  ): void => {
    offset.value = withRepeat(
      withTiming(animationValue, { duration }),
      2000,
      reverse
    );
  };

  const stopAnimation = (): void => {
    offset.value = 0;
  };

  const hideMeasurementResultsDetails = (): void => {
    offset.value = withTiming(190, { duration: 800 });
  };

  const showMeasurementResultsDetails = (): void => {
    offset.value = withTiming(0, { duration: 800 });
  };

  return {
    myStyle,
    animateComponent,
    stopAnimation,
    hideMeasurementResultsDetails,
    showMeasurementResultsDetails,
  };
};
export default useAnimation;
