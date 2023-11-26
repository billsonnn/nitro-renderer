import { IMessageComposer } from '../../../../../api';

export class PostMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof PostMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof PostMessageMessageComposer>;

    constructor(groupId: number, threadId: number, subject: string, message: string)
    {
        this._data = [groupId, threadId, subject, message];
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
