import { IMessageComposer } from '@nitrots/api';

export class ConfirmPetBreedingComposer implements IMessageComposer<ConstructorParameters<typeof ConfirmPetBreedingComposer>>
{
    private _data: ConstructorParameters<typeof ConfirmPetBreedingComposer>;

    constructor(itemId: number, name: string, petOneId: number, petTwoId: number)
    {
        this._data = [itemId, name, petOneId, petTwoId];
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
