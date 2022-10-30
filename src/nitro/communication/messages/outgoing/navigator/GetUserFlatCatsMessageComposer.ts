import { IMessageComposer } from '../../../../../api';

export class GetUserFlatCatsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetUserFlatCatsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetUserFlatCatsMessageComposer>;

    constructor()
    {
        this._data = [];
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
