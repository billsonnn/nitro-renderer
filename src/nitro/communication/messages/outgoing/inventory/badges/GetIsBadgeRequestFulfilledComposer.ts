import { IMessageComposer } from '../../../../../../api';

export class GetIsBadgeRequestFulfilledComposer implements IMessageComposer<ConstructorParameters<typeof GetIsBadgeRequestFulfilledComposer>>
{
    private _data: ConstructorParameters<typeof GetIsBadgeRequestFulfilledComposer>;

    constructor(requestCode: string)
    {
        this._data = [ requestCode ];
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
