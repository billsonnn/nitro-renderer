import { IDisposable } from '../../../core/common/disposable/IDisposable';

export interface IProductDataListener extends IDisposable
{
    loadProductData(): void;
}
