import { IProductData } from '@nitrots/api';
import { GetConfiguration } from '@nitrots/configuration';
import { ProductData } from './ProductData';

export class ProductDataLoader
{
    private _products: Map<string, IProductData>;

    constructor(products: Map<string, IProductData>)
    {
        this._products = products;
    }

    public async init(): Promise<void>
    {
        const url = GetConfiguration().getValue<string>('productdata.url');

        if(!url || !url.length) throw new Error('invalid product data url');

        const response = await fetch(url);

        if(response.status !== 200) throw new Error('Invalid product data file');

        const responseData = await response.json();

        this.parseProducts(responseData.productdata);
    }

    private parseProducts(data: { [index: string]: any }): void
    {
        if(!data) return;

        for(const product of data.product) (product && this._products.set(product.code, new ProductData(product.code, product.name, product.description)));
    }
}
