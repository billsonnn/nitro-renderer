import { PrizeMessageSubProduct } from '.';
import { IMessageDataWrapper } from '../../../../../api';

export class PrizeMessageData
{
    private _productConfigurationSize: number = 1;
    private _productCode: string;
    private _subProducts: PrizeMessageSubProduct[];
    private _productItemType: string;
    private _productItemTypeId: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        let totalPrizes: number = wrapper.readInt();
        this._subProducts = [];

        this._productCode = wrapper.readString();
        this._productConfigurationSize = wrapper.readInt();

        if(!this.hasProductConfigurationSize)
        {
            this._productItemType = wrapper.readString();
            this._productItemTypeId = wrapper.readInt();
        }
        else
        {
            while(totalPrizes < this._productConfigurationSize)
            {
                this._subProducts.push(new PrizeMessageSubProduct(wrapper));
                totalPrizes++;
            }
        }
    }

    public get productItemType(): string
    {
        return this._productItemType;
    }

    public get productItemTypeId(): number
    {
        return this._productItemTypeId;
    }

    public get hasProductConfigurationSize(): boolean
    {
        return this._productConfigurationSize > 1;
    }

    public get subProducts(): PrizeMessageSubProduct[]
    {
        return this._subProducts;
    }

    public get productCode(): string
    {
        return this._productCode;
    }
}
