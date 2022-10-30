import { IMessageComposer } from '../../../../../api';

export class SetPhoneNumberVerificationStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof SetPhoneNumberVerificationStatusMessageComposer>>
{
    public static readonly NO_ISSUE_ID = -1;

    private _data: ConstructorParameters<typeof SetPhoneNumberVerificationStatusMessageComposer>;

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
