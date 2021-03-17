import { Point } from 'pixi.js';

export class PointMath
{
    public static sum(k: Point, _arg_2: Point): Point
    {
        return new Point((k.x + _arg_2.x), (k.y + _arg_2.y));
    }

    public static _Str_15193(k: Point, _arg_2: Point): Point
    {
        return new Point((k.x - _arg_2.x), (k.y - _arg_2.y));
    }

    public static _Str_6038(k: Point, _arg_2: number): Point
    {
        return new Point((k.x * _arg_2), (k.y * _arg_2));
    }
}