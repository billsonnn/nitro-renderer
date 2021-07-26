import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogPageOfferData } from './utils/CatalogPageOfferData';
import { ClubGiftData } from './utils/ClubGiftData';

export class ClubGiftInfoParser implements IMessageParser
{
    private _daysUntilNextGift:number;
    private _giftsAvailable:number;
    private _offers: CatalogPageOfferData[];
    private _giftData:Map<number, ClubGiftData>;

    public flush(): boolean
    {

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offers = [];
        this._giftData = new Map<number, ClubGiftData>();
        this._daysUntilNextGift = wrapper.readInt();
        this._giftsAvailable = wrapper.readInt();

        const offerCount = wrapper.readInt();

        for(let i = 0; i < offerCount; i ++)
        {
            this._offers.push(new CatalogPageOfferData(wrapper));
        }

        const giftDataCount = wrapper.readInt();

        for(let i = 0; i < giftDataCount; i++)
        {
            const item = new ClubGiftData(wrapper);
            this._giftData.set(item.offerId, item);
        }

        return true;
    }

    public get offers(): CatalogPageOfferData[]
    {
        return this._offers;
    }

    public  get daysUntilNextGift():number
    {
        return this._daysUntilNextGift;
    }

    public get giftsAvailable():number
    {
        return this._giftsAvailable;
    }

    public set giftsAvailable(gifts: number)
    {
        this._giftsAvailable = gifts;
    }

    public getOfferExtraData(offerId: number): ClubGiftData
    {
        if(!offerId) return null;

        return this._giftData.get(offerId);
    }


    public  get giftData():Map<number, ClubGiftData>
    {
        return this._giftData;
    }
}
