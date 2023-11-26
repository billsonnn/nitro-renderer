import { IMessageComposer } from '../../../../../api';

export class PollStartComposer implements IMessageComposer<ConstructorParameters<typeof PollStartComposer>>
{
    private _data: ConstructorParameters<typeof PollStartComposer>;

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
