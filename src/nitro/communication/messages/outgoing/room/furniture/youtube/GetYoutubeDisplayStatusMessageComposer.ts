import { IMessageComposer } from '../../../../../../../api';

export class GetYoutubeDisplayStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetYoutubeDisplayStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetYoutubeDisplayStatusMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
