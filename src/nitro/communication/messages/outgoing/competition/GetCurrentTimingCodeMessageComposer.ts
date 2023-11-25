import { IMessageComposer } from '../../../../../api';

export class GetCurrentTimingCodeMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCurrentTimingCodeMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCurrentTimingCodeMessageComposer>;

    constructor(schedulingStr: string)
    {
        this._data = [schedulingStr];
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
