import { IDisposable } from '../../../api';

export interface IProductDataListener extends IDisposable
{
    loadProductData(): void;
}
