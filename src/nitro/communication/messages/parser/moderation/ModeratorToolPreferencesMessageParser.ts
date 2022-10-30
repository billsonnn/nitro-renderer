import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class ModeratorToolPreferencesMessageParser implements IMessageParser
{
    private _windowX: number;
    private _windowY: number;
    private _windowWidth: number;
    private _windowHeight: number;

    public flush(): boolean
    {
        this._windowX = 0;
        this._windowY = 0;
        this._windowWidth = 0;
        this._windowHeight = 0;
        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        this._windowX = k.readInt();
        this._windowY = k.readInt();
        this._windowWidth = k.readInt();
        this._windowHeight = k.readInt();
        return true;
    }

    public get windowX(): number
    {
        return this._windowX;
    }

    public get windowY(): number
    {
        return this._windowY;
    }

    public get windowWidth(): number
    {
        return this._windowWidth;
    }

    public get windowHeight(): number
    {
        return this._windowHeight;
    }
}
