import { Graphics } from '@pixi/graphics';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { Plane } from './Plane';

export class FloorPlane extends Plane
{
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    public render(canvas: Graphics, width: number, height: number, scale: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number): Graphics
    {
        const visualization = this.getPlaneVisualization(scale);

        if(!visualization || !visualization.geometry) return null;

        const _local_10 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_11 = visualization.geometry.getScreenPoint(new Vector3d(0, (height / visualization.geometry.scale), 0));
        const _local_12 = visualization.geometry.getScreenPoint(new Vector3d((width / visualization.geometry.scale), 0, 0));

        let x = 0;
        let y = 0;

        if(_local_10 && _local_11 && _local_12)
        {
            width = Math.round(Math.abs((_local_10.x - _local_12.x)));
            height = Math.round(Math.abs((_local_10.x - _local_11.x)));

            const _local_15 = (_local_10.x - visualization.geometry.getScreenPoint(new Vector3d(1, 0, 0)).x);

            x = (offsetX * Math.trunc(Math.abs(_local_15)));
            y = (offsetY * Math.trunc(Math.abs(_local_15)));
        }

        return visualization.render(canvas, width, height, normal, useTexture, x, y);
    }
}
