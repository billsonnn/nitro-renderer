import { IMessageComposer } from '../../../../../api';

export class PollRejectComposer implements IMessageComposer<ConstructorParameters<typeof PollRejectComposer>>
{
    private _data: ConstructorParameters<typeof PollRejectComposer>;

    constructor(pollId: number)
    {
        this._data = [pollId];
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
