import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';

export class MarketplaceCancelItemParser implements IMessageParser
{

    private _offerId: number;
    private _success: boolean;


    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId = wrapper.readInt();
        this._success = wrapper.readBoolean();

        return true;
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get success(): boolean
    {
        return this._success;
    }
}
