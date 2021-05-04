import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { ObjectDataFactory } from '../../../../../room/object/data/ObjectDataFactory';
import { IObjectData } from '../../../../../room/object/data/IObjectData';
import { LegacyDataType } from '../../../../../room/object/data/type/LegacyDataType';
import { MarketplaceOwnItem } from '../utils/MarketplaceOwnItem';
import { MarketplaceOfferItem } from '../utils/MarketplaceOfferItem';


export class MarketplaceOffersReceivedParser implements IMessageParser
{

    private readonly _Str_8964 = 1;
    private readonly _Str_13000 = 2;
    private readonly _Str_14245 = 3;

    private readonly _Str_18070 = 500;

    private _offers: MarketplaceOfferItem[];
    private _Str_11687: number;

    public flush(): boolean
    {
        this._offers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offers = [];

        const offerCount = wrapper.readInt();
        let i = 0;

        while(i < offerCount)
        {
            const offerId = wrapper.readInt();
            const local3 = wrapper.readInt();
            let itemId = wrapper.readInt();

            let local5: number;
            let local6: string;
            let local7: IObjectData;
            if(itemId === this._Str_8964)
            {
                local5 = wrapper.readInt();
                local7 = this.getStuffData(wrapper);
            }
            else
            {
                if(itemId == this._Str_13000)
                {
                    local5 = wrapper.readInt();
                    local6 = wrapper.readString();
                }
                else
                {
                    if(itemId == this._Str_14245)
                    {
                        local5 = wrapper.readInt();
                        local7 =     ObjectDataFactory.getData(LegacyDataType.FORMAT_KEY);
                        local7.uniqueNumber = wrapper.readInt();
                        local7.uniqueSeries = wrapper.readInt();
                        itemId = this._Str_8964;
                    }
                }
            }

            const local8 = wrapper.readInt();
            const local9 = wrapper.readInt();
            const local10 = wrapper.readInt();
            const local11 = wrapper.readInt();

            const offerItem = new MarketplaceOfferItem(offerId, local5, itemId, local6, local7, local8, local3, local9, local10, local11);
            if(i < this._Str_18070)
            {
                this._offers.push(offerItem);
            }
            i++;
        }

        this._Str_11687 = wrapper.readInt();
        return true;
    }

    public get offers():MarketplaceOfferItem[]
    {
        return this._offers;
    }

    public get totalItemsFound():number
    {
        return this._Str_11687;
    }

    private getStuffData(wrapper: IMessageDataWrapper): IObjectData
    {
        const local2 = wrapper.readInt();
        const local3 = ObjectDataFactory.getData(local2);
        local3.parseWrapper(wrapper);
        return local3;
    }
}
