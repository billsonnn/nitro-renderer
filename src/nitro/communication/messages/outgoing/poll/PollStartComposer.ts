import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class PollStartComposer implements IMessageComposer<ConstructorParameters<typeof PollStartComposer>>
{
    private _data: ConstructorParameters<typeof PollStartComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
