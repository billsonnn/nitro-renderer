import { IMessageComposer } from '../../../../../api';

export class TalentTrackComposer implements IMessageComposer<ConstructorParameters<typeof TalentTrackComposer>>
{
    private _data: ConstructorParameters<typeof TalentTrackComposer>;

    constructor(type: string)
    {
        this._data = [type];
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
