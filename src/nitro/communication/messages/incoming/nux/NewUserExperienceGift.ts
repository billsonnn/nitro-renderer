import { IMessageDataWrapper } from '../../../../../api';
import { ProductOffer } from './ProductOffer';

export class NewUserExperienceGift
{
    private _thumbnailUrl: string;
    private _productOfferList: ProductOffer[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._thumbnailUrl = wrapper.readString();
        if(this._thumbnailUrl == '')
        {
            this._thumbnailUrl = null;
        }

        this._productOfferList = [];
        const count:number = wrapper.readInt();
        let index = 0;

        while(index < count)
        {
            this._productOfferList.push(new ProductOffer(wrapper));
            index++;
        }
    }

    public get productOfferList(): ProductOffer[]
    {
        return this._productOfferList;
    }

    public get thumbnailUrl(): string
    {
        return this._thumbnailUrl;
    }
}
