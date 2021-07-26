import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetCraftableProductsComposer implements IMessageComposer<ConstructorParameters<typeof GetCraftableProductsComposer>>
{
  private _data: ConstructorParameters<typeof GetCraftableProductsComposer>;

  constructor(k: string)
  {
      this._data = [k];
  }

  public getMessageArray()
  {
      return this._data;
  }

  public dispose(): void
  {
      return;
  }
}
