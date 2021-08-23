import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class CampaignCalendarDoorOpenedMessageParser implements IMessageParser
{
    private _Str_17229: boolean;
    private _productName: string;
    private _customImage: string;
    private _Str_6002: string;

    public flush(): boolean
    {
        this._Str_17229 = false;
        this._productName = null;
        this._customImage = null;
        this._Str_6002 = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_17229 = wrapper.readBoolean();
        this._productName = wrapper.readString();
        this._customImage = wrapper.readString();
        this._Str_6002 = wrapper.readString();

        return true;
    }

    public get _Str_22341(): boolean
    {
        return this._Str_17229;
    }

    public get productName(): string
    {
        return this._productName;
    }

    public get customImage(): string
    {
        return this._customImage;
    }

    public get _Str_8979(): string
    {
        return this._Str_6002;
    }
}
