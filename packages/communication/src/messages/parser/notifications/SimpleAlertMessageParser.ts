import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class SimpleAlertMessageParser implements IMessageParser
{
    private _alertMessage: string;
    private _titleMessage: string;

    public flush(): boolean
    {
        this._alertMessage = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._alertMessage = wrapper.readString();

        if(wrapper.bytesAvailable)
        {
            this._titleMessage = wrapper.readString();
        }

        return true;
    }

    public get alertMessage(): string
    {
        return this._alertMessage;
    }

    public get titleMessage(): string
    {
        return this._titleMessage;
    }
}
