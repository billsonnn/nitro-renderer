import { IMessageDataWrapper, IObjectData } from '../../../../../../api';
import { GetTickerTime } from '../../../../../../pixi-proxy';
import { FurnitureDataParser } from '../../room';
import { IFurnitureItemData } from '../furniture';

export class ItemDataStructure implements IFurnitureItemData
{
    private _expirationTimeStamp: number;
    private _isWallItem: boolean;
    private _itemId: number;
    private _furniType: string;
    private _ref: number;
    private _spriteId: number;
    private _category: number;
    private _stuffData: IObjectData;
    private _extra: number;
    private _secondsToExpiration: number;
    private _creationDay: number;
    private _creationMonth: number;
    private _creationYear: number;
    private _isGroupable: boolean;
    private _songId: number;
    private _flatId: number;
    private _rentable: boolean;
    private _hasRentPeriodStarted: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._itemId = wrapper.readInt();
        this._furniType = wrapper.readString().toUpperCase();
        this._ref = wrapper.readInt();
        this._spriteId = wrapper.readInt();
        this._category = wrapper.readInt();
        this._isGroupable = wrapper.readBoolean();
        this._stuffData = FurnitureDataParser.parseObjectData(wrapper);
        this._secondsToExpiration = -1;
        this._expirationTimeStamp = GetTickerTime();
        this._hasRentPeriodStarted = false;
        this._creationDay = wrapper.readInt();
        this._creationMonth = wrapper.readInt();
        this._creationYear = wrapper.readInt();
        this._extra = ((this.furniType === 'S') ? wrapper.readInt() : -1);
        this._flatId = -1;
        this._rentable = false;
        this._isWallItem = (this._furniType === 'I');
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get furniType(): string
    {
        return this._furniType;
    }

    public get ref(): number
    {
        return this._ref;
    }

    public get spriteId(): number
    {
        return this._spriteId;
    }

    public get category(): number
    {
        return this._category;
    }

    public get stuffData(): IObjectData
    {
        return this._stuffData;
    }

    public get extra(): number
    {
        return this._extra;
    }

    public get secondsToExpiration(): number
    {
        return this._secondsToExpiration;
    }

    public get creationDay(): number
    {
        return this._creationDay;
    }

    public get creationMonth(): number
    {
        return this._creationMonth;
    }

    public get creationYear(): number
    {
        return this._creationYear;
    }

    public get isGroupable(): boolean
    {
        return this._isGroupable;
    }

    public get songId(): number
    {
        return this._extra;
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get rentable(): boolean
    {
        return this._rentable;
    }

    public get isWallItem(): boolean
    {
        return this._isWallItem;
    }

    public get hasRentPeriodStarted(): boolean
    {
        return this._hasRentPeriodStarted;
    }

    public get expirationTimeStamp(): number
    {
        return this._expirationTimeStamp;
    }

    public get isRecycleable(): boolean
    {
        return true;
    }

    public get tradable(): boolean
    {
        return true;
    }

    public get sellable(): boolean
    {
        return true;
    }

    public get slotId(): string
    {
        return null;
    }

    public get isExternalImageFurni(): boolean
    {
        return (this._furniType.indexOf('external_image') !== -1);
    }
}
