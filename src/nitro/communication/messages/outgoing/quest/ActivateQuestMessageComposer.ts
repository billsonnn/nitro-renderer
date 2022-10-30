import { IMessageComposer } from '../../../../../api';

export class ActivateQuestMessageComposer implements IMessageComposer<ConstructorParameters<typeof ActivateQuestMessageComposer>>
{
    private _data: ConstructorParameters<typeof ActivateQuestMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
