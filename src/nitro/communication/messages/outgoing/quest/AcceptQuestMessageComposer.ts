import { IMessageComposer } from '../../../../../api';

export class AcceptQuestMessageComposer implements IMessageComposer<ConstructorParameters<typeof AcceptQuestMessageComposer>>
{
    private _data: ConstructorParameters<typeof AcceptQuestMessageComposer>;

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
