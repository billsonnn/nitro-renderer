import { Resource, Texture } from '@pixi/core';

export class BadgeInfo
{
    private _image: Texture<Resource>;
    private _placeHolder: boolean;

    constructor(image: Texture<Resource>, placeHolder: boolean)
    {
        this._image = image;
        this._placeHolder = placeHolder;
    }

    public get image(): Texture<Resource>
    {
        return this._image;
    }

    public get placeHolder(): boolean
    {
        return this._placeHolder;
    }
}
