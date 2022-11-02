import { IMessageDataWrapper, IMessageParser, IObjectData, LegacyDataType, ObjectDataFactory } from '../../../../../api';
import { FurnitureDataParser } from '../room';
import { MarketplaceOffer } from './MarketplaceOffer';

export class MarketplaceOffersParser implements IMessageParser
{
    private static FURNITYPE_STUFF: number = 1;
    private static FURNITYPE_WALL: number = 2;
    private static FAKE_FURNITYPE_UNIQUE: number = 3;

    private readonly MAX_LIST_LENGTH = 500;

    private _offers: MarketplaceOffer[];
    private _totalItemsFound: number;

    public flush(): boolean
    {
        this._offers = [];
        this._totalItemsFound = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();

        let i = 0;

        while(i < count)
        {
            const offerId = wrapper.readInt();
            const status = wrapper.readInt();
            let furniType = wrapper.readInt();

            let furniId = -1;
            let extraData = '';
            let stuffData: IObjectData = null;

            if(furniType === MarketplaceOffersParser.FURNITYPE_STUFF)
            {
                furniId = wrapper.readInt();
                stuffData = FurnitureDataParser.parseObjectData(wrapper);
            }

            else if(furniType === MarketplaceOffersParser.FURNITYPE_WALL)
            {
                furniId = wrapper.readInt();
                extraData = wrapper.readString();
            }

            else if(furniType == MarketplaceOffersParser.FAKE_FURNITYPE_UNIQUE)
            {
                furniId = wrapper.readInt();
                stuffData = ObjectDataFactory.getData(LegacyDataType.FORMAT_KEY);
                stuffData.uniqueNumber = wrapper.readInt();
                stuffData.uniqueSeries = wrapper.readInt();
                furniType = MarketplaceOffersParser.FURNITYPE_STUFF;
            }

            const price = wrapper.readInt();
            const timeLeftMinutes = wrapper.readInt();
            const averagePrice = wrapper.readInt();
            const offerCount = wrapper.readInt();

            const offerItem = new MarketplaceOffer(offerId, furniId, furniType, extraData, stuffData, price, status, timeLeftMinutes, averagePrice, offerCount);

            if(i < this.MAX_LIST_LENGTH) this._offers.push(offerItem);

            i++;
        }

        this._totalItemsFound = wrapper.readInt();

        return true;
    }

    public get offers(): MarketplaceOffer[]
    {
        return this._offers;
    }

    public get totalItemsFound(): number
    {
        return this._totalItemsFound;
    }
}
