import { IMessageComposer } from '../../../../../api';

export class GuideSessionCreateMessageComposer implements IMessageComposer<ConstructorParameters<typeof GuideSessionCreateMessageComposer>>
{
    private _data: ConstructorParameters<typeof GuideSessionCreateMessageComposer>;

    constructor(k: number, _arg_2: string)
    {
        this._data = [k, _arg_2];
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
