import { IMessageComposer } from '@nitrots/api';

export class ResetPhoneNumberStateMessageComposer implements IMessageComposer<ConstructorParameters<typeof ResetPhoneNumberStateMessageComposer>>
{
    private _data: ConstructorParameters<typeof ResetPhoneNumberStateMessageComposer>;

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
