import { IMessageComposer } from '@nitrots/api';

export class VotePollCounterMessageComposer implements IMessageComposer<ConstructorParameters<typeof VotePollCounterMessageComposer>>
{
    private _data: ConstructorParameters<typeof VotePollCounterMessageComposer>;

    constructor(counter: number)
    {
        this._data = [counter];
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
