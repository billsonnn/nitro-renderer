import { IMessageComposer } from '../../../../../api';

export class UpdateRoomThumbnailMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateRoomThumbnailMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateRoomThumbnailMessageComposer>;

    constructor(flatId: number, bgImgId: number, frontImgId: number, objCount: number)
    {
        this._data = [flatId, bgImgId, frontImgId, objCount];
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
