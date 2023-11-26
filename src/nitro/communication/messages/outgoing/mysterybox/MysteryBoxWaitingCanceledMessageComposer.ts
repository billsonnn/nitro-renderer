import { IMessageComposer } from '../../../../../api';

export class MysteryBoxWaitingCanceledMessageComposer implements IMessageComposer<ConstructorParameters<typeof MysteryBoxWaitingCanceledMessageComposer>>
{
    private _data: ConstructorParameters<typeof MysteryBoxWaitingCanceledMessageComposer>;

    constructor(ownerId: number)
    {
        this._data = [ ownerId ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
