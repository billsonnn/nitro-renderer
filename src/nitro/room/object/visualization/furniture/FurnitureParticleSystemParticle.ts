import { GraphicAsset } from '../../../../../room/object/visualization/utils/GraphicAsset';
import { Vector3D } from '../../../../avatar/geometry/Vector3D';

export class FurnitureParticleSystemParticle
{
    private _x: number;
    private _y: number;
    private _z: number;
    private _lastX: number;
    private _lastY: number;
    private _lastZ: number;
    private _hasMoved: boolean = false;
    protected _direction: Vector3D;
    private _age: number = 0;
    private _lifeTime: number;
    private _isEmitter: boolean = false;
    private _fade: boolean = false;
    private _fadeTime: number;
    private _alphaMultiplier: number = 1;
    private _frames: GraphicAsset[];

    public init(k: number, _arg_2: number, _arg_3: number, _arg_4: Vector3D, _arg_5: number, _arg_6: number, _arg_7: number, _arg_8: boolean = false, _arg_9: GraphicAsset[] = null, _arg_10: boolean = false): void
    {
        this._x = k;
        this._y = _arg_2;
        this._z = _arg_3;
        this._direction = new Vector3D(_arg_4.x, _arg_4.y, _arg_4.z);

        this._direction.x *= _arg_5;
        this._direction.y *= _arg_5;
        this._direction.z *= _arg_5;

        this._lastX = (this._x - (this._direction.x * _arg_6));
        this._lastY = (this._y - (this._direction.y * _arg_6));
        this._lastZ = (this._z - (this._direction.z * _arg_6));
        this._age = 0;
        this._hasMoved = false;
        this._lifeTime = _arg_7;
        this._isEmitter = _arg_8;
        this._frames = _arg_9;
        this._fade = _arg_10;
        this._alphaMultiplier = 1;
        this._fadeTime = (0.5 + (Math.random() * 0.5));
    }

    public dispose(): void
    {
        this._direction = null;
    }

    public update(): void
    {
        this._age++;
        if(this._age == this._lifeTime)
        {
            this.ignite();
        }
        if(this._fade)
        {
            if((this._age / this._lifeTime) > this._fadeTime)
            {
                this._alphaMultiplier = ((this._lifeTime - this._age) / (this._lifeTime * (1 - this._fadeTime)));
            }
        }
    }

    public getAsset(): GraphicAsset
    {
        if(((this._frames) && (this._frames.length > 0)))
        {
            return this._frames[(this._age % this._frames.length)];
        }
        return null;
    }

    protected ignite(): void
    {
    }

    public get fade(): boolean
    {
        return this._fade;
    }

    public get alphaMultiplier(): number
    {
        return this._alphaMultiplier;
    }

    public get direction(): Vector3D
    {
        return this._direction;
    }

    public get age(): number
    {
        return this._age;
    }

    public get isEmitter(): boolean
    {
        return this._isEmitter;
    }

    public get _Str_16034(): boolean
    {
        return this._age <= this._lifeTime;
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(k: number)
    {
        this._x = k;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(k: number)
    {
        this._y = k;
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(k: number)
    {
        this._z = k;
    }

    public get _Str_10744(): number
    {
        return this._lastX;
    }

    public set _Str_10744(k: number)
    {
        this._hasMoved = true;
        this._lastX = k;
    }

    public get _Str_12459(): number
    {
        return this._lastY;
    }

    public set _Str_12459(k: number)
    {
        this._hasMoved = true;
        this._lastY = k;
    }

    public get _Str_11680(): number
    {
        return this._lastZ;
    }

    public set _Str_11680(k: number)
    {
        this._hasMoved = true;
        this._lastZ = k;
    }

    public get _Str_22611(): boolean
    {
        return this._hasMoved;
    }

    public toString(): string
    {
        return [ this._x, this._y, this._z ].toString();
    }

    public copy(k:FurnitureParticleSystemParticle, _arg_2: number): void
    {
        this._x = (k._x * _arg_2);
        this._y = (k._y * _arg_2);
        this._z = (k._z * _arg_2);
        this._lastX = (k._lastX * _arg_2);
        this._lastY = (k._lastY * _arg_2);
        this._lastZ = (k._lastZ * _arg_2);
        this._hasMoved = k._Str_22611;
        this._direction = k._direction;
        this._age = k._age;
        this._lifeTime = k._lifeTime;
        this._isEmitter = k._isEmitter;
        this._fade = k._fade;
        this._fadeTime = k._fadeTime;
        this._alphaMultiplier = k._alphaMultiplier;
    }
}