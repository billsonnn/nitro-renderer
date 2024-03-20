import { IMessageComposer } from '@nitrots/api';

export class GroupDeleteComposer implements IMessageComposer<ConstructorParameters<typeof GroupDeleteComposer>>
{
    private _data: ConstructorParameters<typeof GroupDeleteComposer>;

    constructor(groupId: number)
    {
        this._data = [groupId];
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
