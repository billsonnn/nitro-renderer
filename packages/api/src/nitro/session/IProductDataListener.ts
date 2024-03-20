import { IDisposable } from '../../common';

export interface IProductDataListener extends IDisposable
{
    loadProductData(): void;
}
