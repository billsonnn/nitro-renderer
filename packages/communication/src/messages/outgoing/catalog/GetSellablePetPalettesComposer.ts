import { IMessageComposer } from '@nitrots/api';

export class GetSellablePetPalettesComposer implements IMessageComposer<ConstructorParameters<typeof GetSellablePetPalettesComposer>>
{
    private _data: ConstructorParameters<typeof GetSellablePetPalettesComposer>;

    constructor(name: string)
    {
        this._data = [name];
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
