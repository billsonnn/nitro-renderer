import { IMessageComposer } from '@nitrots/api';

export class FurnitureMannequinSaveNameComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureMannequinSaveNameComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureMannequinSaveNameComposer>;

    constructor(itemId: number, name: string)
    {
        this._data = [itemId, name];
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
