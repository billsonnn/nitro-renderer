import { IMessageComposer } from '../../../../../../api';

export class BreedPetsMessageComposer implements IMessageComposer<ConstructorParameters<typeof BreedPetsMessageComposer>>
{
    public static readonly STATE_START: number = 0;
    public static readonly STATE_CANCEL: number = 1;
    public static readonly STATE_ACCEPT: number = 2;

    private _data: ConstructorParameters<typeof BreedPetsMessageComposer>;

    constructor(state: number, petOneId: number, petTwoId: number)
    {
        this._data = [state, petOneId, petTwoId];
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
