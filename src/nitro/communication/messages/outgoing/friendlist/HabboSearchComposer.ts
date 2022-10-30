import { IMessageComposer } from '../../../../../api';

export class HabboSearchComposer implements IMessageComposer<ConstructorParameters<typeof HabboSearchComposer>>
{
    private _data: ConstructorParameters<typeof HabboSearchComposer>;

    constructor(search: string)
    {
        this._data = [search];
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
