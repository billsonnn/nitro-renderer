import { IProductData } from '../../../api';
import { EventDispatcher } from '../../../core';
import { NitroEvent } from '../../../events';
import { ProductData } from './ProductData';

export class ProductDataLoader extends EventDispatcher
{
    public static PDP_PRODUCT_DATA_READY: string = 'PDP_PRODUCT_DATA_READY';
    public static PDP_PRODUCT_DATA_FAILED: string = 'PDP_PRODUCT_DATA_FAILED';

    private _products: Map<string, IProductData>;

    constructor(products: Map<string, IProductData>)
    {
        super();

        this._products = products;
    }

    public dispose(): void
    {
        this._products = null;
    }

    public loadProductData(url: string): void
    {
        if(!url) return;

        fetch(url)
            .then(response => response.json())
            .then(data => this.onProductDataLoadedEvent(data))
            .catch(err => this.onProductDataError(err));
    }

    private onProductDataLoadedEvent(data: { [index: string]: any }): void
    {
        if(!data) return;

        this.parseProducts(data.productdata);

        this.dispatchEvent(new NitroEvent(ProductDataLoader.PDP_PRODUCT_DATA_READY));
    }

    private onProductDataError(error: Error): void
    {
        if(!error) return;

        this.dispatchEvent(new NitroEvent(ProductDataLoader.PDP_PRODUCT_DATA_FAILED));
    }

    private parseProducts(data: { [index: string]: any }): void
    {
        if(!data) return;

        for(const product of data.product) (product && this._products.set(product.code, new ProductData(product.code, product.name, product.description)));
    }
}
