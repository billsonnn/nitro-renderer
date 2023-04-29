import { IMessageComposer } from '../../../../../../api';

export class SnowStormOnStageEndingComposer implements IMessageComposer<ConstructorParameters<typeof SnowStormOnStageEndingComposer>>
{
    private _data: ConstructorParameters<typeof SnowStormOnStageEndingComposer>;

    constructor(habboGameId: number)
    {
        this._data = [habboGameId];
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
