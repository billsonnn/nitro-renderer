import { NitroToolbarEvent } from './NitroToolbarEvent';

export class NitroToolbarAnimateIconEvent extends NitroToolbarEvent
{
    public static ANIMATE_ICON: string = 'NTAIE_ANIMATE_ICON';

    private _image: HTMLImageElement;
    private _x: number;
    private _y: number;

    constructor(image: HTMLImageElement, x: number, y: number)
    {
        super(NitroToolbarAnimateIconEvent.ANIMATE_ICON);

        this._image = image;
        this._x = x;
        this._y = y;
    }

    public get image(): HTMLImageElement
    {
        return this._image;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }
}