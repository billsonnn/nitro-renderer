import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolRequestUserInfoComposer implements IMessageComposer<ConstructorParameters<typeof ModtoolRequestUserInfoComposer>>
{
    private _data: ConstructorParameters<typeof ModtoolRequestUserInfoComposer>;

    constructor(userId: number)
    {
        this._data = [ userId ];
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
