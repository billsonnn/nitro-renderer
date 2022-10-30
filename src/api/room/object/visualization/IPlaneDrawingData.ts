import { Point } from '@pixi/math';

export interface IPlaneDrawingData
{
    isBottomAligned(): boolean;
    z: number;
    cornerPoints: Point[];
    color: number;
    maskAssetNames: string[];
    maskAssetLocations: Point[];
    maskAssetFlipHs: boolean[];
    maskAssetFlipVs: boolean[];
    assetNameColumns: string[][];
}
