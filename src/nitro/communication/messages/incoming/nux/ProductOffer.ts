import { IMessageDataWrapper } from '../../../../../api';

export class ProductOffer
{
    private _itemName: string;
    private _extraInfo: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._itemName = wrapper.readString();
        this._extraInfo = wrapper.readString();

        if(this._extraInfo == '')
        {
            this._extraInfo = null;
        }
    }

    public get itemName(): string
    {
        return this._itemName;
    }

    public get extraInfo(): string
    {
        return this._extraInfo;
    }
}
