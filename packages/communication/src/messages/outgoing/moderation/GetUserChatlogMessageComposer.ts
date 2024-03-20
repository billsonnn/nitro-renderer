import { IMessageComposer } from '@nitrots/api';

export class GetUserChatlogMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetUserChatlogMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetUserChatlogMessageComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
