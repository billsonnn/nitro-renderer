import { IMessageComposer } from '../../../../../api';

export class GetSecondsUntilMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetSecondsUntilMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetSecondsUntilMessageComposer>;

    constructor(timeStr: string)
    {
        this._data = [timeStr];
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
