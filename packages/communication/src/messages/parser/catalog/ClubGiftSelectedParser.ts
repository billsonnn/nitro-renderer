import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { CatalogPageMessageProductData } from './CatalogPageMessageProductData';

export class ClubGiftSelectedParser implements IMessageParser
{
    private _productCode: string;
    private _products: CatalogPageMessageProductData[];

    public flush(): boolean
    {
        this._productCode = null;
        this._products = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._productCode = wrapper.readString();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._products.push(new CatalogPageMessageProductData(wrapper));

            count--;
        }

        return true;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get products(): CatalogPageMessageProductData[]
    {
        return this._products;
    }
}
