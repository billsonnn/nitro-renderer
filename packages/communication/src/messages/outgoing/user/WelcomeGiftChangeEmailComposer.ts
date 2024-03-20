import { IMessageComposer } from '@nitrots/api';

export class WelcomeGiftChangeEmailComposer implements IMessageComposer<ConstructorParameters<typeof WelcomeGiftChangeEmailComposer>>
{
    private _data: ConstructorParameters<typeof WelcomeGiftChangeEmailComposer>;

    constructor(newEmail: string)
    {
        this._data = [newEmail];
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
