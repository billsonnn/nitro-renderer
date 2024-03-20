import { IMessageComposer } from '@nitrots/api';

export class ScrGetKickbackInfoMessageComposer implements IMessageComposer<ConstructorParameters<typeof ScrGetKickbackInfoMessageComposer>>
{
    private _data: ConstructorParameters<typeof ScrGetKickbackInfoMessageComposer>;

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
