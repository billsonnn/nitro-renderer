import { IMessageComposer } from '../../../../../api';

export class PetRespectComposer implements IMessageComposer<ConstructorParameters<typeof PetRespectComposer>>
{
    private _data: ConstructorParameters<typeof PetRespectComposer>;

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
