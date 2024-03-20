import { Texture } from 'pixi.js';

export class PlaneBitmapData
{
    private _texture: Texture;
    private _timeStamp: number;

    constructor(texture: Texture, timestamp: number)
    {
        this._texture = texture;
        this._timeStamp = timestamp;
    }

    public dispose(): void
    {
        this._texture = null;
    }

    public get texture(): Texture
    {
        return this._texture;
    }

    public get timeStamp(): number
    {
        return this._timeStamp;
    }
}
