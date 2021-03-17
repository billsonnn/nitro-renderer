import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { Nitro } from '../../../../../Nitro';
import { IObjectData } from '../../../../../room/object/data/IObjectData';
import { FurnitureDataParser } from '../../../parser/room/furniture/FurnitureDataParser';
import { IFurnitureItemData } from '../furni/IFurnitureItemData';

export class TradingListItem implements IFurnitureItemData
{
    private _Str_5390: number;
    private _isWallItem: boolean;
    private _itemId: number;
    private _furniType: string;
    private _ref: number;
    private _spriteId: number;
    private _category: number;
    private _stuffData: IObjectData;
    private _Str_3182: number;
    private _secondsToExpiration: number;
    private _Str_9291: number;
    private _Str_8744: number;
    private _Str_9700: number;
    private _isGroupable: boolean;
    private _Str_2808: number;
    private _flatId: number;
    private _rentable: boolean;
    private _hasRentPeriodStarted: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._itemId                = wrapper.readInt();
        this._furniType             = wrapper.readString().toUpperCase();
        this._ref                   = wrapper.readInt();
        this._spriteId              = wrapper.readInt();
        this._category              = wrapper.readInt();
        this._isGroupable           = wrapper.readBoolean();
        this._stuffData             = FurnitureDataParser.parseObjectData(wrapper);
        this._secondsToExpiration   = -1;
        this._Str_5390              = Nitro.instance.time;
        this._hasRentPeriodStarted  = false;
        this._Str_9291              = wrapper.readInt();
        this._Str_8744              = wrapper.readInt();
        this._Str_9700              = wrapper.readInt();
        this._Str_3182              = ((this.furniType === 'S') ? wrapper.readInt() : -1);
        this._flatId                = -1;
        this._rentable              = false;
        this._isWallItem            = (this._furniType === 'I');
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

    public get _Str_2794(): number
    {
        return this._Str_3182;
    }

    public get secondsToExpiration(): number
    {
        return this._secondsToExpiration;
    }

    public get _Str_8932(): number
    {
        return this._Str_9291;
    }

    public get _Str_9050(): number
    {
        return this._Str_8744;
    }

    public get _Str_9408(): number
    {
        return this._Str_9700;
    }

    public get isGroupable(): boolean
    {
        return this._isGroupable;
    }

    public get _Str_3951(): number
    {
        return this._Str_3182;
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

    public get _Str_10616(): number
    {
        return this._Str_5390;
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

    public get _Str_19297(): boolean
    {
        return (this._furniType.indexOf('external_image') !== -1);
    }
}
