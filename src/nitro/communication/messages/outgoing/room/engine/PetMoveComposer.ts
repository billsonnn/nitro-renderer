import { IMessageComposer } from '../../../../../../api';

export class PetMoveComposer implements IMessageComposer<ConstructorParameters<typeof PetMoveComposer>>
{
    private _data: ConstructorParameters<typeof PetMoveComposer>;

    constructor(petId: number, x: number, y: number, direction: number)
    {
        this._data = [petId, x, y, direction];
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
