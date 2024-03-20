import { IMessageComposer } from '@nitrots/api';

export class AvatarEffectActivatedComposer implements IMessageComposer<ConstructorParameters<typeof AvatarEffectActivatedComposer>>
{
    private _data: ConstructorParameters<typeof AvatarEffectActivatedComposer>;

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
