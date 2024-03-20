import { IMessageComposer } from '@nitrots/api';

export class SendMessageComposer implements IMessageComposer<ConstructorParameters<typeof SendMessageComposer>>
{
    private _data: ConstructorParameters<typeof SendMessageComposer>;

    constructor(userId: number, message: string)
    {
        this._data = [userId, message];
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
