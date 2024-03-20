import { IRoomObject } from '@nitrots/api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectRoomAdEvent extends RoomObjectEvent
{
    public static ROOM_AD_LOAD_IMAGE: string = 'RORAE_ROOM_AD_LOAD_IMAGE';
    public static ROOM_AD_FURNI_CLICK: string = 'RORAE_ROOM_AD_FURNI_CLICK';
    public static ROOM_AD_FURNI_DOUBLE_CLICK: string = 'RORAE_ROOM_AD_FURNI_DOUBLE_CLICK';
    public static ROOM_AD_TOOLTIP_SHOW: string = 'RORAE_ROOM_AD_TOOLTIP_SHOW';
    public static ROOM_AD_TOOLTIP_HIDE: string = 'RORAE_ROOM_AD_TOOLTIP_HIDE';

    private _imageUrl: string = '';
    private _clickUrl: string = '';

    constructor(type: string, object: IRoomObject, imageUrl: string = '', clickUrl: string = '')
    {
        super(type, object);

        this._imageUrl = imageUrl;
        this._clickUrl = clickUrl;
    }

    public get imageUrl(): string
    {
        return this._imageUrl;
    }

    public get clickUrl(): string
    {
        return this._clickUrl;
    }
}
