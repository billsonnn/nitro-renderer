import { IMessageComposer } from '../../../../../../api';

export class RequestABadgeComposer implements IMessageComposer<ConstructorParameters<typeof RequestABadgeComposer>>
{
    private _data: ConstructorParameters<typeof RequestABadgeComposer>;

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
