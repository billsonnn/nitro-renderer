import { IMessageComposer } from '../../../../../api';

export class ActivateQuestMessageComposer implements IMessageComposer<ConstructorParameters<typeof ActivateQuestMessageComposer>>
{
    private _data: ConstructorParameters<typeof ActivateQuestMessageComposer>;

    constructor(questId: number)
    {
        this._data = [questId];
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
