import { Graphics } from '@pixi/graphics';
import { IVector3D } from '../../../../../../room/utils/IVector3D';
import { PlaneBitmapData } from '../utils/PlaneBitmapData';
import { PlaneVisualizationLayer } from './basic/PlaneVisualizationLayer';

export interface IPlaneRasterizer
{
    initializeDimensions(_arg_1: number, _arg_2: number): boolean;
    render(_arg_1: Graphics, _arg_2: string, _arg_3: number, _arg_4: number, _arg_5: number, _arg_6: IVector3D, _arg_7: boolean, _arg_8?: number, _arg_9?: number, _arg_10?: number, _arg_11?: number, _arg_12?: number): PlaneBitmapData;
    getTextureIdentifier(_arg_1: number, _arg_2: IVector3D): string;
    getLayers(_arg_1: string): PlaneVisualizationLayer[];
    reinitialize(): void;
}
