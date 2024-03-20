import { IMessageComposer } from '@nitrots/api';

export class AcceptGameInviteMessageComposer implements IMessageComposer<ConstructorParameters<typeof AcceptGameInviteMessageComposer>>
{
    private _data: ConstructorParameters<typeof AcceptGameInviteMessageComposer>;

    constructor(k:number, _arg_2:number)
    {
        this._data = [ k, _arg_2 ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
