import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineRoomAdEvent extends RoomEngineObjectEvent
{
    public static FURNI_CLICK: string = 'RERAE_FURNI_CLICK';
    public static FURNI_DOUBLE_CLICK: string = 'RERAE_FURNI_DOUBLE_CLICK';
    public static TOOLTIP_SHOW: string = 'RERAE_TOOLTIP_SHOW';
    public static TOOLTIP_HIDE: string = 'RERAE_TOOLTIP_HIDE';
}
