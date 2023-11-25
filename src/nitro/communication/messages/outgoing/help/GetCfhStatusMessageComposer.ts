import { IMessageComposer } from '../../../../../api';

export class GetCfhStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCfhStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCfhStatusMessageComposer>;

    constructor(hasSanction: boolean)
    {
        this._data = [hasSanction];
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
