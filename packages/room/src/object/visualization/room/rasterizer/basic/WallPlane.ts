import { IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';
import { Texture } from 'pixi.js';
import { Plane } from './Plane';

export class WallPlane extends Plane
{
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    public render(planeId: string, canvas: Texture, width: number, height: number, size: number, normal: IVector3D, useTexture: boolean): Texture
    {
        const visualization = this.getPlaneVisualization(size);

        if(!visualization || !visualization.geometry) return null;

        const _local_8 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_9 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, (height / visualization.geometry.scale)));
        const _local_10 = visualization.geometry.getScreenPoint(new Vector3d(0, (width / visualization.geometry.scale), 0));

        if(_local_8 && _local_9 && _local_10)
        {
            width = Math.round(Math.abs((_local_8.x - _local_10.x)));
            height = Math.round(Math.abs((_local_8.y - _local_9.y)));
        }

        return visualization.render(planeId, canvas, width, height, normal, useTexture);
    }
}
