import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class RoomWidgetCameraConfigurationParser implements IMessageParser
{
    private _credits: number;
    private _points: number;
    private _pointsType: number;

    public flush(): boolean
    {
        this._credits       = 0;
        this._points        = 0;
        this._pointsType    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._credits       = wrapper.readInt();
        this._points        = wrapper.readInt();
        this._pointsType    = wrapper.readInt();

        return true;
    }

    public get credits(): number
    {
        return this._credits;
    }

    public get points(): number
    {
        return this._points;
    }

    public get pointsType(): number
    {
        return this._pointsType;
    }
}
