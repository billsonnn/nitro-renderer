import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class PresentOpenedMessageParser implements IMessageParser
{
    private _itemType: string;
    private _classId: number;
    private _productCode: string;
    private _placedItemId: number;
    private _placedItemType: string;
    private _placedInRoom: boolean;
    private _petFigureString: string;

    public flush(): boolean
    {
        this._itemType = '';
        this._classId = 0;
        this._productCode = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemType = wrapper.readString();
        this._classId = wrapper.readInt();
        this._productCode = wrapper.readString();
        this._placedItemId = wrapper.readInt();
        this._placedItemType = wrapper.readString();
        this._placedInRoom = wrapper.readBoolean();
        this._petFigureString = wrapper.readString();
        return true;
    }

    public get itemType(): string
    {
        return this._itemType;
    }

    public get classId(): number
    {
        return this._classId;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get placedItemId(): number
    {
        return this._placedItemId;
    }

    public get placedItemType(): string
    {
        return this._placedItemType;
    }

    public get placedInRoom(): boolean
    {
        return this._placedInRoom;
    }

    public get petFigureString(): string
    {
        return this._petFigureString;
    }
}
