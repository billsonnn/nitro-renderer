import { IMessageComposer } from '@nitrots/api';

export class PetMessageComposer implements IMessageComposer<ConstructorParameters<typeof PetMessageComposer>>
{
    private _data: ConstructorParameters<typeof PetMessageComposer>;

    constructor(id: number)
    {
        this._data = [id];
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
