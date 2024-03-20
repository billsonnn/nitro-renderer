import { IMessageComposer } from '@nitrots/api';

export class PetSupplementComposer implements IMessageComposer<ConstructorParameters<typeof PetSupplementComposer>>
{
    private _data: ConstructorParameters<typeof PetSupplementComposer>;

    constructor(petId: number, supplement: number)
    {
        this._data = [petId, supplement];
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
