import { Graphics } from 'pixi.js';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { Plane } from './Plane';

export class FloorPlane extends Plane
{
    public static _Str_2531: number = 0xFFFFFF;
    public static _Str_5433: number = 45;
    public static _Str_5509: number = 30;

    public render(k: Graphics, _arg_2: number, _arg_3: number, size: number, _arg_5: IVector3D, _arg_6: boolean, _arg_7: number, _arg_8: number): Graphics
    {
        const visualization = this._Str_6009(size);

        if(!visualization || !visualization.geometry) return null;

        const _local_10 = visualization.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        const _local_11 = visualization.geometry.getScreenPoint(new Vector3d(0, (_arg_3 / visualization.geometry.scale), 0));
        const _local_12 = visualization.geometry.getScreenPoint(new Vector3d((_arg_2 / visualization.geometry.scale), 0, 0));

        let _local_13   = 0;
        let _local_14   = 0;

        if(_local_10 && _local_11 && _local_12)
        {
            _arg_2 = Math.round(Math.abs((_local_10.x - _local_12.x)));
            _arg_3 = Math.round(Math.abs((_local_10.x - _local_11.x)));

            const _local_15 = (_local_10.x - visualization.geometry.getScreenPoint(new Vector3d(1, 0, 0)).x);

            _local_13 = (_arg_7 * Math.trunc(Math.abs(_local_15)));
            _local_14 = (_arg_8 * Math.trunc(Math.abs(_local_15)));
        }

        return visualization.render(k, _arg_2, _arg_3, _arg_5, _arg_6, _local_13, _local_14);
    }
}