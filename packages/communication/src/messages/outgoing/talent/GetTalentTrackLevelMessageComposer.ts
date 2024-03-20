import { IMessageComposer } from '@nitrots/api';

export class GetTalentTrackLevelMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetTalentTrackLevelMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetTalentTrackLevelMessageComposer>;

    constructor(name: string)
    {
        this._data = [name];
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
