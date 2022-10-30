import { IMessageComposer } from '../../../../../api';

export class PetMountComposer implements IMessageComposer<ConstructorParameters<typeof PetMountComposer>>
{
    private _data: ConstructorParameters<typeof PetMountComposer>;

    constructor(petId: number, flag: boolean)
    {
        this._data = [petId, flag];
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
