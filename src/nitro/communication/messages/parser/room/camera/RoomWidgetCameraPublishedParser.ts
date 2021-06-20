import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class RoomWidgetCameraPublishedParser implements IMessageParser
{
    private _wasSuccessful: boolean;
    private _cooldownSeconds: number;
    private _extraDataId: number;

    public flush(): boolean
    {
        this._wasSuccessful     = false;
        this._cooldownSeconds   = 0;
        this._extraDataId       = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._wasSuccessful     = wrapper.readBoolean();
        this._cooldownSeconds   = wrapper.readInt();
        this._extraDataId       = wrapper.readInt();
        
        return true;
    }

    public get wasSuccessful(): boolean
    {
        return this._wasSuccessful;
    }

    public get cooldownSeconds(): number
    {
        return this._cooldownSeconds;
    }

    public get extraDataId(): number
    {
        return this._extraDataId;
    }
}
