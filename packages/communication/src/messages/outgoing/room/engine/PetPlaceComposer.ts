import { IMessageComposer } from '@nitrots/api';

export class PetPlaceComposer implements IMessageComposer<ConstructorParameters<typeof PetPlaceComposer>>
{
    private _data: ConstructorParameters<typeof PetPlaceComposer>;

    constructor(petId: number, x: number, y: number)
    {
        this._data = [petId, x, y];
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
