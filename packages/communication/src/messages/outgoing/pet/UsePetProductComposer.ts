import { IMessageComposer } from '@nitrots/api';

export class UsePetProductComposer implements IMessageComposer<ConstructorParameters<typeof UsePetProductComposer>>
{
    private _data: ConstructorParameters<typeof UsePetProductComposer>;

    constructor(itemId: number, petId: number)
    {
        this._data = [itemId, petId];
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
