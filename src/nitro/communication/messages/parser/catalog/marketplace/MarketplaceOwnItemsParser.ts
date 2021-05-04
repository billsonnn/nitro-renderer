import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { ObjectDataFactory } from '../../../../../room/object/data/ObjectDataFactory';
import { IObjectData } from '../../../../../room/object/data/IObjectData';
import { LegacyDataType } from '../../../../../room/object/data/type/LegacyDataType';
import { MarketplaceOwnItem } from '../utils/MarketplaceOwnItem';


export class MarketplaceOwnItemsParser implements IMessageParser
{
    private static _Str_18070 = 500;
    private _offers: MarketplaceOwnItem[];
    private _Str_11581: number;


    public flush(): boolean
    {
        this._offers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offers = [];
        this._Str_11581 = wrapper.readInt(); // SoldPriceTotal

        const offerCount = wrapper.readInt();
        let i = 0;
        while(i < offerCount)
        {
            const offerId = wrapper.readInt();
            const status = wrapper.readInt();
            let furniType = wrapper.readInt();

            let furniId;
            let extraData;
            let stuffData:IObjectData;
            if(furniType == 1)
            {
                furniId = wrapper.readInt();
                stuffData = this.getStuffData(wrapper);
            }
            else
            {
                if(furniType == 2)
                {
                    furniId = wrapper.readInt();
                    extraData = wrapper.readString();
                }
                else if(furniType == 3)
                {
                    furniId = wrapper.readInt();
                    stuffData = ObjectDataFactory.getData(LegacyDataType.FORMAT_KEY);
                    stuffData.uniqueNumber = wrapper.readInt();
                    stuffData.uniqueSeries = wrapper.readInt();
                    furniType = 1;
                }
            }

            const price = wrapper.readInt();
            const local9 = wrapper.readInt();
            const local10 = wrapper.readInt();
            const local13 = new MarketplaceOwnItem(offerId, furniId, furniType, extraData, stuffData, price, status, local9, local10);

            if(i < MarketplaceOwnItemsParser._Str_18070)
            {
                this._offers.push(local13);
            }
            i++;
        }


        return true;
    }

    public get offers():MarketplaceOwnItem[]
    {
        return this._offers;
    }

    public get creditsWaiting():number
    {
        return this._Str_11581;
    }

    private getStuffData(wrapper: IMessageDataWrapper): IObjectData
    {
        const local2 = wrapper.readInt();
        const local3 = ObjectDataFactory.getData(local2);
        local3.parseWrapper(wrapper);
        return local3;
    }
}
