export type FigureSize = {
  transform: number;
};

export type SvgName = {
  name: "circuit-1" | "circuit-2";
};

export interface FigureProps {
  color: string | undefined;
  size: FigureSize;
  svgName: SvgName;
}
