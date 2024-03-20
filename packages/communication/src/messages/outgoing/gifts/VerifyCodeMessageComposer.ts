import { IMessageComposer } from '@nitrots/api';

export class VerifyCodeMessageComposer implements IMessageComposer<ConstructorParameters<typeof VerifyCodeMessageComposer>>
{
    private _data: ConstructorParameters<typeof VerifyCodeMessageComposer>;

    constructor(k: string)
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
