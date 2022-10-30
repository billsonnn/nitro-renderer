import { IMessageComposer } from '../../../../../../api';

export class IgnoreUserIdComposer implements IMessageComposer<ConstructorParameters<typeof IgnoreUserIdComposer>>
{
    private _data: ConstructorParameters<typeof IgnoreUserIdComposer>;

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
