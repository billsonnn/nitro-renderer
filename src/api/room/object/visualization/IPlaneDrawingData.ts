import { Point } from '@pixi/math'

export interface IPlaneDrawingData {
  z: number;
  cornerPoints: Point[];
  color: number;
  maskAssetNames: string[];
  maskAssetLocations: Point[];
  maskAssetFlipHs: boolean[];
  maskAssetFlipVs: boolean[];
  assetNameColumns: string[][];

  isBottomAligned(): boolean;
}
