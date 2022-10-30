import { IMessageComposer } from '../../../../../api';

export class VisitUserComposer implements IMessageComposer<ConstructorParameters<typeof VisitUserComposer>>
{
    private _data: ConstructorParameters<typeof VisitUserComposer>;

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
