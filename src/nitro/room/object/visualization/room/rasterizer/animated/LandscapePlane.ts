import { Graphics } from '@pixi/graphics';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { Plane } from '../basic/Plane';

export class LandscapePlane extends Plane
{
    public static DEFAULT_COLOR: number = 0xFFFFFF;
    public static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static VERTICAL_ANGLE_DEFAULT: number = 30;

    private _width: number = 0;
    private _height: number = 0;

    public isStatic(k: number): boolean
    {
        const _local_2 = this.getPlaneVisualization(k);

        if(_local_2) return !(_local_2.hasAnimationLayers);

        return super.isStatic(k);
    }

    public initializeDimensions(k: number, _arg_2: number): void
    {
        if(k < 0) k = 0;

        if(_arg_2 < 0) _arg_2 = 0;

        if((k !== this._width) || (_arg_2 !== this._height))
        {
            this._width = k;
            this._height = _arg_2;
        }
    }

    public render(k: Graphics, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: IVector3D, _arg_6: boolean, _arg_7: number, _arg_8: number, _arg_9: number, _arg_10: number, _arg_11: number): Graphics
    {
        const visualization = this.getPlaneVisualization(_arg_4);

        if(!visualization || !visualization.geometry) return null;

        const _local_13 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_14 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 1));
        const _local_15 = visualization.geometry.getScreenPoint(new Vector3d(0, 1, 0));

        if(_local_13 && _local_14 && _local_15)
        {
            _arg_2 = Math.round(Math.abs((((_local_13.x - _local_15.x) * _arg_2) / visualization.geometry.scale)));
            _arg_3 = Math.round(Math.abs((((_local_13.y - _local_14.y) * _arg_3) / visualization.geometry.scale)));

            const _local_16 = (_arg_7 * Math.abs((_local_13.x - _local_15.x)));
            const _local_17 = (_arg_8 * Math.abs((_local_13.y - _local_14.y)));
            const _local_18 = (_arg_9 * Math.abs((_local_13.x - _local_15.x)));
            const _local_19 = (_arg_10 * Math.abs((_local_13.y - _local_14.y)));

            return visualization.render(k, _arg_2, _arg_3, _arg_5, _arg_6, _local_16, _local_17, _local_18, _local_19, _arg_9, _arg_10, _arg_11);
        }

        return null;
    }
}
