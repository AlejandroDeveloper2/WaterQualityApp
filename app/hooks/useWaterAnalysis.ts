import { useContext } from "react";

import WaterAnalysisContext from "../context/WaterAnalysisProvider";

const useWaterAnalysis = () => {
  return useContext(WaterAnalysisContext);
};

export default useWaterAnalysis;
