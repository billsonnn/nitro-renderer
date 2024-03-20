import { IMessageComposer } from '@nitrots/api';

export class FurnitureListComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureListComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureListComposer>;

    constructor()
    {
        this._data = [];
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
