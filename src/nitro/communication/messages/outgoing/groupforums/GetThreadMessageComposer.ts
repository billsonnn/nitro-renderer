import { IMessageComposer } from '../../../../../api';

export class GetThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetThreadMessageComposer>;

    constructor(mode: number, forumState: number)
    {
        this._data = [mode, forumState];
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
