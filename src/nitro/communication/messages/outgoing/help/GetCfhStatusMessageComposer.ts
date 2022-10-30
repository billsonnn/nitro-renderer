import { IMessageComposer } from '../../../../../api';

export class GetCfhStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCfhStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCfhStatusMessageComposer>;

    constructor(k: boolean)
    {
        this._data = [k];
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
