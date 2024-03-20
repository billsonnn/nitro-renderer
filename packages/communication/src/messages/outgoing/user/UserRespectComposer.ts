import { IMessageComposer } from '@nitrots/api';

export class UserRespectComposer implements IMessageComposer<ConstructorParameters<typeof UserRespectComposer>>
{
    private _data: ConstructorParameters<typeof UserRespectComposer>;

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
