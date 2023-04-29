import { RenderTexture } from '@pixi/core';

export class PlaneBitmapData
{
    private _texture: RenderTexture;
    private _timeStamp: number;

    constructor(texture: RenderTexture, timestamp: number)
    {
        this._texture = texture;
        this._timeStamp = timestamp;
    }

    public dispose(): void
    {
        this._texture = null;
    }

    public get texture(): RenderTexture
    {
        return this._texture;
    }

    public get timeStamp(): number
    {
        return this._timeStamp;
    }
}
