import { IMessageComposer } from '../../../../../../api';

export class GetIsBadgeRequestFulfilledComposer implements IMessageComposer<ConstructorParameters<typeof GetIsBadgeRequestFulfilledComposer>>
{
    private _data: ConstructorParameters<typeof GetIsBadgeRequestFulfilledComposer>;

    constructor(k: string)
    {
        this._data = [ k ];
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
