import { IMessageDataWrapper } from '../../../../../api';

export class PrizeMessageSubProduct
{
    private _productItemType: string;
    private _productItemTypeId: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._productItemType = wrapper.readString();
        this._productItemTypeId = wrapper.readInt();
    }

    public get productItemType(): string
    {
        return this._productItemType;
    }

    public get productItemTypeId(): number
    {
        return this._productItemTypeId;
    }
}
