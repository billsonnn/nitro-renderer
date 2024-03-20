import { IMessageComposer } from '@nitrots/api';

export class AvatarEffectSelectedComposer implements IMessageComposer<ConstructorParameters<typeof AvatarEffectSelectedComposer>>
{
    private _data: ConstructorParameters<typeof AvatarEffectSelectedComposer>;

    constructor(type: number)
    {
        this._data = [ type ];
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
