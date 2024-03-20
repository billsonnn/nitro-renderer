import { IMessageComposer } from '@nitrots/api';

export class ExtendRentOrBuyoutFurniMessageComposer implements IMessageComposer<ConstructorParameters<typeof ExtendRentOrBuyoutFurniMessageComposer>>
{
    private _data: ConstructorParameters<typeof ExtendRentOrBuyoutFurniMessageComposer>;

    constructor(isWall: boolean, roomInstanceId: number, isBuyout: boolean)
    {
        this._data = [isWall, roomInstanceId, isBuyout];
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
