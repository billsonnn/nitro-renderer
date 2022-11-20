import { IMessageComposer } from '../../../../../api';

export class MysteryBoxWaitingCanceledMessageComposer implements IMessageComposer<ConstructorParameters<typeof MysteryBoxWaitingCanceledMessageComposer>>
{
    private _data: ConstructorParameters<typeof MysteryBoxWaitingCanceledMessageComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
