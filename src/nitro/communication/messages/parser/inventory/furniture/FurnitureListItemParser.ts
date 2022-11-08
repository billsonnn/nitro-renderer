import { IMessageDataWrapper, IObjectData } from '../../../../../../api';
import { GetTickerTime } from '../../../../../../pixi-proxy';
import { FurnitureDataParser } from '../../room';
import { IFurnitureItemData } from './IFurnitureItemData';

export class FurnitureListItemParser implements IFurnitureItemData
{
    private static WALL_ITEM: string = 'I';
    private static FLOOR_ITEM: string = 'S';

    private _rentable: boolean;
    private _itemId: number;
    private _furniType: string;
    private _ref: number;
    private _spriteId: number;
    private _category: number;
    private _stuffData: IObjectData;
    private _isGroupable: boolean;
    private _isRecyclable: boolean;
    private _tradable: boolean;
    private _sellable: boolean;
    private _secondsToExpiration: number;
    private _extra: number;
    private _flatId: number;
    private _isWallItem: boolean;
    private _hasRentPeriodStarted: boolean;
    private _expirationTimeStamp: number;
    private _slotId: string;
    private _songId: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._rentable = false;
        this._itemId = 0;
        this._furniType = null;
        this._ref = 0;
        this._spriteId = 0;
        this._category = 0;
        this._stuffData = null;
        this._isGroupable = false;
        this._isRecyclable = false;
        this._tradable = false;
        this._sellable = false;
        this._secondsToExpiration = 0;
        this._extra = 0;
        this._flatId = 0;
        this._isWallItem = false;
        this._hasRentPeriodStarted = false;
        this._expirationTimeStamp = 0;
        this._slotId = '';
        this._songId = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = wrapper.readInt();
        this._furniType = wrapper.readString();
        this._ref = wrapper.readInt();
        this._spriteId = wrapper.readInt();
        this._category = wrapper.readInt();
        this._stuffData = FurnitureDataParser.parseObjectData(wrapper);
        this._isRecyclable = wrapper.readBoolean();
        this._tradable = wrapper.readBoolean();
        this._isGroupable = wrapper.readBoolean();
        this._sellable = wrapper.readBoolean();
        this._secondsToExpiration = wrapper.readInt();
        this._expirationTimeStamp = GetTickerTime();

        if(this.secondsToExpiration > -1)
        {
            this._rentable = true;
        }
        else
        {
            this._rentable = false;
            this._secondsToExpiration = -1;
        }

        this._hasRentPeriodStarted = wrapper.readBoolean();
        this._flatId = wrapper.readInt();
        this._isWallItem = (this._furniType === FurnitureListItemParser.WALL_ITEM);

        if(this._furniType === FurnitureListItemParser.FLOOR_ITEM)
        {
            this._slotId = wrapper.readString();
            this._extra = wrapper.readInt();
        }

        return true;
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

    public get isGroupable(): boolean
    {
        return this._isGroupable;
    }

    public get isRecycleable(): boolean
    {
        return this._isRecyclable;
    }

    public get tradable(): boolean
    {
        return this._tradable;
    }

    public get sellable(): boolean
    {
        return this._sellable;
    }

    public get secondsToExpiration(): number
    {
        return this._secondsToExpiration;
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get slotId(): string
    {
        return this._slotId;
    }

    public get songId(): number
    {
        return this._songId;
    }

    public get extra(): number
    {
        return this._extra;
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

    public get creationDay(): number
    {
        return 0;
    }

    public get creationMonth(): number
    {
        return 0;
    }

    public get creationYear(): number
    {
        return 0;
    }

    public get isExternalImageFurni(): boolean
    {
        return !(this._furniType.indexOf('external_image') === -1);
    }
}
