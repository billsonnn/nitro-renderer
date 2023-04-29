import { IMessageComposer } from '../../../../../../api';

export class CancelPetBreedingComposer implements IMessageComposer<ConstructorParameters<typeof CancelPetBreedingComposer>>
{
    private _data: ConstructorParameters<typeof CancelPetBreedingComposer>;

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
