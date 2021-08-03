import { Point } from '@pixi/math';

export class PointMath
{
    public static sum(k: Point, _arg_2: Point): Point
    {
        return new Point((k.x + _arg_2.x), (k.y + _arg_2.y));
    }

    public static sub(k: Point, _arg_2: Point): Point
    {
        return new Point((k.x - _arg_2.x), (k.y - _arg_2.y));
    }

    public static mul(k: Point, _arg_2: number): Point
    {
        return new Point((k.x * _arg_2), (k.y * _arg_2));
    }
}
