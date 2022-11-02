import { IMessageDataWrapper } from '../../../../../api';

export class CatalogPageMessageProductData
{
    public static I: string = 'i';
    public static S: string = 's';
    public static E: string = 'e';
    public static B: string = 'b';

    private _productType: string;
    private _furniClassId: number;
    private _extraParam: string;
    private _productCount: number;
    private _uniqueLimitedItem: boolean;
    private _uniqueLimitedItemSeriesSize: number;
    private _uniqueLimitedItemsLeft: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._productType = null;
        this._furniClassId = -1;
        this._extraParam = null;
        this._productCount = 0;
        this._uniqueLimitedItem = false;
        this._uniqueLimitedItemSeriesSize = 0;
        this._uniqueLimitedItemsLeft = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._productType = wrapper.readString();

        switch(this._productType)
        {
            case CatalogPageMessageProductData.B:
                this._extraParam = wrapper.readString();
                this._productCount = 1;
                return true;
            default:
                this._furniClassId = wrapper.readInt();
                this._extraParam = wrapper.readString();
                this._productCount = wrapper.readInt();
                this._uniqueLimitedItem = wrapper.readBoolean();

                if(this._uniqueLimitedItem)
                {
                    this._uniqueLimitedItemSeriesSize = wrapper.readInt();
                    this._uniqueLimitedItemsLeft = wrapper.readInt();
                }
                return true;
        }
    }

    public get productType(): string
    {
        return this._productType;
    }

    public get furniClassId(): number
    {
        return this._furniClassId;
    }

    public get extraParam(): string
    {
        return this._extraParam;
    }

    public get productCount(): number
    {
        return this._productCount;
    }

    public get uniqueLimitedItem(): boolean
    {
        return this._uniqueLimitedItem;
    }

    public get uniqueLimitedSeriesSize(): number
    {
        return this._uniqueLimitedItemSeriesSize;
    }

    public get uniqueLimitedItemsLeft(): number
    {
        return this._uniqueLimitedItemsLeft;
    }
}
