import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPresentEvent extends RoomSessionEvent
{
    public static RSPE_PRESENT_OPENED: string = 'RSPE_PRESENT_OPENED';

    private _classId: number = 0;
    private _itemType: string = '';
    private _productCode: string;
    private _placedItemId: number = 0;
    private _placedItemType: string = '';
    private _placedInRoom: boolean;
    private _petFigureString: string;

    constructor(k: string, _arg_2: IRoomSession, classId: number, itemType: string, productCode: string, placedItemId: number, placedItemType: string, placedInRoom: boolean, petFigureString: string)
    {
        super(k, _arg_2);

        this._classId = classId;
        this._itemType = itemType;
        this._productCode = productCode;
        this._placedItemId = placedItemId;
        this._placedItemType = placedItemType;
        this._placedInRoom = placedInRoom;
        this._petFigureString = petFigureString;
    }

    public get classId(): number
    {
        return this._classId;
    }


    public get itemType(): string
    {
        return this._itemType;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get placedItemId(): number
    {
        return this._placedItemId;
    }

    public get placedInRoom(): boolean
    {
        return this._placedInRoom;
    }

    public get placedItemType(): string
    {
        return this._placedItemType;
    }

    public get petFigureString(): string
    {
        return this._petFigureString;
    }
}
