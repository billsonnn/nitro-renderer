import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { ClubOfferExtendData } from './ClubOfferExtendData';

export class HabboClubExtendOfferMessageParser implements IMessageParser
{
    private _offer: ClubOfferExtendData;

    public flush(): boolean
    {
        this._offer = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offer = new ClubOfferExtendData(wrapper);

        return true;
    }

    public get offer(): ClubOfferExtendData
    {
        return this._offer;
    }
}
