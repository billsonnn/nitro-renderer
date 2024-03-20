import { IMessageComposer } from '@nitrots/api';

export class GetSoundMachinePlayListMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetSoundMachinePlayListMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetSoundMachinePlayListMessageComposer>;

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
