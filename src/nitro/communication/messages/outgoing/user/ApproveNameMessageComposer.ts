import { IMessageComposer } from '../../../../../api';

export class ApproveNameMessageComposer implements IMessageComposer<ConstructorParameters<typeof ApproveNameMessageComposer>>
{
    private _data: ConstructorParameters<typeof ApproveNameMessageComposer>;

    constructor(name: string, type: number)
    {
        this._data = [name, type];
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
