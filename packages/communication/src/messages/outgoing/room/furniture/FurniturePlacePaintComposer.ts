import { IMessageComposer } from '@nitrots/api';

export class FurniturePlacePaintComposer implements IMessageComposer<ConstructorParameters<typeof FurniturePlacePaintComposer>>
{
    private _data: ConstructorParameters<typeof FurniturePlacePaintComposer>;

    constructor(furniId: number)
    {
        this._data = [furniId];
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
