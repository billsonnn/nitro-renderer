import { IMessageComposer } from '../../../../../api';

export class RemovePetSaddleComposer implements IMessageComposer<ConstructorParameters<typeof RemovePetSaddleComposer>>
{
    private _data: ConstructorParameters<typeof RemovePetSaddleComposer>;

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
