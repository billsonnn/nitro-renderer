import { IMessageComposer } from '@nitrots/api';

export class TogglePetBreedingComposer implements IMessageComposer<ConstructorParameters<typeof TogglePetBreedingComposer>>
{
    private _data: ConstructorParameters<typeof TogglePetBreedingComposer>;

    constructor(petId: number)
    {
        this._data = [petId];
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
