import { Texture } from 'pixi.js';

export class BadgeInfo
{
    private _image: Texture;
    private _placeHolder: boolean;

    constructor(image: Texture, placeHolder: boolean)
    {
        this._image = image;
        this._placeHolder = placeHolder;
    }

    public get image(): Texture
    {
        return this._image;
    }

    public get placeHolder(): boolean
    {
        return this._placeHolder;
    }
}
