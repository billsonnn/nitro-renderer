import { IMessageComposer } from '../../../../../api';

export class TryPhoneNumberMessageComposer implements IMessageComposer<ConstructorParameters<typeof TryPhoneNumberMessageComposer>>
{
    private _data: ConstructorParameters<typeof TryPhoneNumberMessageComposer>;

    constructor(k: string, _arg_2: string)
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
