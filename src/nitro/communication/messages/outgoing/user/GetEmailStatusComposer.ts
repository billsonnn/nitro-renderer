import { IMessageComposer } from '../../../../../api';

export class GetEmailStatusComposer implements IMessageComposer<ConstructorParameters<typeof GetEmailStatusComposer>>
{
    private _data: ConstructorParameters<typeof GetEmailStatusComposer>;

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
