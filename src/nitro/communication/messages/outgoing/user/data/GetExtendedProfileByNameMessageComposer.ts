import { IMessageComposer } from '../../../../../../api';

export class GetExtendedProfileByNameMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetExtendedProfileByNameMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetExtendedProfileByNameMessageComposer>;

    constructor(username: string)
    {
        this._data = [username];
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
