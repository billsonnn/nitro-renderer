import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class CallForHelpDisabledNotifyMessageParser implements IMessageParser
{
    private _infoUrl: string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._infoUrl = wrapper.readString();

        return true;
    }

    public get infoUrl(): string
    {
        return this._infoUrl;
    }
}
