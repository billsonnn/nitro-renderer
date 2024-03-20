import { IMessageComposer } from '@nitrots/api';

export class RejectQuestMessageComposer implements IMessageComposer<ConstructorParameters<typeof RejectQuestMessageComposer>>
{
    private _data: ConstructorParameters<typeof RejectQuestMessageComposer>;

    constructor()
    {
        this._data = [];
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
