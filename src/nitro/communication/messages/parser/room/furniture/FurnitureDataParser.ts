import { IMessageDataWrapper, IMessageParser, IObjectData, ObjectDataFactory } from '../../../../../../api';

export class FurnitureDataParser implements IMessageParser
{
    private _itemId: number;
    private _data: IObjectData;

    public flush(): boolean
    {
        this._itemId = 0;
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = parseInt(wrapper.readString());
        this._data = FurnitureDataParser.parseObjectData(wrapper);

        return true;
    }

    public static parseObjectData(wrapper: IMessageDataWrapper): IObjectData
    {
        if(!wrapper) return null;

        const data = ObjectDataFactory.getData(wrapper.readInt());

        if(!data) return null;

        data.parseWrapper(wrapper);

        return data;
    }

    public get furnitureId(): number
    {
        return this._itemId;
    }

    public get objectData(): IObjectData
    {
        return this._data;
    }
}
