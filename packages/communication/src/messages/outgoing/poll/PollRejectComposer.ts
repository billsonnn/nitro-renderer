import { IMessageComposer } from '@nitrots/api';

export class PollRejectComposer implements IMessageComposer<ConstructorParameters<typeof PollRejectComposer>>
{
    private _data: ConstructorParameters<typeof PollRejectComposer>;

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
