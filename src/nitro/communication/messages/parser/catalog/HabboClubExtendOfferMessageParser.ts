import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { ClubOfferExtendedData } from '../../incoming/catalog/ClubOfferExtendedData';

export class HabboClubExtendOfferMessageParser implements IMessageParser
{
    private _offer: ClubOfferExtendedData;

    public flush(): boolean
    {
        this._offer = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offer = new ClubOfferExtendedData(wrapper);

        return true;
    }

    public get offer(): ClubOfferExtendedData
    {
        return this._offer;
    }
}
