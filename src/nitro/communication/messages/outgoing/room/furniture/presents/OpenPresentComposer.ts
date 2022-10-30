import { IMessageComposer } from '../../../../../../../api';

export class OpenPresentComposer implements IMessageComposer<ConstructorParameters<typeof OpenPresentComposer>>
{
    private _data: ConstructorParameters<typeof OpenPresentComposer>;

    constructor(k: number)
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
