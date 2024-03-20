import { IMessageComposer } from '@nitrots/api';

export class PetSelectedMessageComposer implements IMessageComposer<ConstructorParameters<typeof PetSelectedMessageComposer>>
{
    private _data: ConstructorParameters<typeof PetSelectedMessageComposer>;

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
