import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class NavigatorSettingsParser implements IMessageParser
{
    private _windowX: number;
    private _windowY: number;
    private _windowWidth: number;
    private _windowHeight: number;
    private _leftPanelHidden: boolean;
    private _resultsMode: number;

    public flush(): boolean
    {
        this._windowX = 0;
        this._windowY = 0;
        this._windowWidth = 0;
        this._windowHeight = 0;
        this._leftPanelHidden = false;
        this._resultsMode = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._windowX = wrapper.readInt();
        this._windowY = wrapper.readInt();
        this._windowWidth = wrapper.readInt();
        this._windowHeight = wrapper.readInt();
        this._leftPanelHidden = wrapper.readBoolean();
        this._resultsMode = wrapper.readInt();

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

    public get leftPanelHidden(): boolean
    {
        return this._leftPanelHidden;
    }

    public get resultsMode(): number
    {
        return this._resultsMode;
    }
}
