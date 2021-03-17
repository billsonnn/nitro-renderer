import { IObjectData } from '../../../../../room/object/data/IObjectData';

export interface IFurnitureItemData
{
    itemId: number;
    furniType: string;
    ref: number;
    spriteId: number;
    category: number;
    stuffData: IObjectData;
    isGroupable: boolean;
    isRecycleable: boolean;
    tradable: boolean;
    sellable: boolean;
    secondsToExpiration: number;
    flatId: number;
    slotId: string;
    _Str_3951: number;
    _Str_2794: number;
    rentable: boolean;
    isWallItem: boolean;
    hasRentPeriodStarted: boolean;
    _Str_10616: number;
    _Str_8932: number;
    _Str_9050: number;
    _Str_9408: number;
    _Str_19297: boolean;
}