import { IMessageDataWrapper, IMessageParser } from '../../../../../../core';
import { IObjectData } from '../../../../../room/object/data/IObjectData';
import { ObjectDataFactory } from '../../../../../room/object/data/ObjectDataFactory';
import { LegacyDataType } from '../../../../../room/object/data/type/LegacyDataType';
import { MarketplaceOffer } from './MarketplaceOffer';


export class MarketplaceOffersReceivedParser implements IMessageParser
{

    private static readonly FURNITYPE_STUFF = 1;
    private static readonly FURNITYPE_WALL = 2;
    private static readonly FAKE_FURNITYPE_UNIQUE = 3;

    private readonly MAX_LIST_LENGTH = 500;

    private _offers: MarketplaceOffer[];
    private _totalItemsFound: number;

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

        for(let i = 0; i < offerCount; i++)
        {
            const offerId = wrapper.readInt();
            const local3 = wrapper.readInt();
            let itemId = wrapper.readInt();

            let local5: number;
            let local6: string;
            let local7: IObjectData;
            if(itemId === MarketplaceOffersReceivedParser.FURNITYPE_STUFF)
            {
                local5 = wrapper.readInt();
                local7 = this.getStuffData(wrapper);
            }
            else
            {
                if(itemId == MarketplaceOffersReceivedParser.FURNITYPE_WALL)
                {
                    local5 = wrapper.readInt();
                    local6 = wrapper.readString();
                }
                else
                {
                    if(itemId == MarketplaceOffersReceivedParser.FAKE_FURNITYPE_UNIQUE)
                    {
                        local5 = wrapper.readInt();
                        local7 =     ObjectDataFactory.getData(LegacyDataType.FORMAT_KEY);
                        local7.uniqueNumber = wrapper.readInt();
                        local7.uniqueSeries = wrapper.readInt();
                        itemId = MarketplaceOffersReceivedParser.FURNITYPE_STUFF;
                    }
                }
            }

            const local8 = wrapper.readInt();
            const local9 = wrapper.readInt();
            const local10 = wrapper.readInt();
            const local11 = wrapper.readInt();

            const offerItem = new MarketplaceOffer(offerId, local5, itemId, local6, local7, local8, local3, local9, local10, local11);
            if(i < this.MAX_LIST_LENGTH)
            {
                this._offers.push(offerItem);
            }
        }

        this._totalItemsFound = wrapper.readInt();
        return true;
    }

    public get offers():MarketplaceOffer[]
    {
        return this._offers;
    }

    public get totalItemsFound():number
    {
        return this._totalItemsFound;
    }

    private getStuffData(wrapper: IMessageDataWrapper): IObjectData
    {
        const local2 = wrapper.readInt();
        const local3 = ObjectDataFactory.getData(local2);
        local3.parseWrapper(wrapper);
        return local3;
    }
}
