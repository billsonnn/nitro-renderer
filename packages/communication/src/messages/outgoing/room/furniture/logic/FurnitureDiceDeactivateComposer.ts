import { IMessageComposer } from '@nitrots/api';

export class FurnitureDiceDeactivateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureDiceDeactivateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureDiceDeactivateComposer>;

    constructor(itemId: number)
    {
        this._data = [itemId];
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
