import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionErrorMessageEvent extends RoomSessionEvent
{
    public static RSEME_KICKED: string = 'RSEME_KICKED';
    public static RSEME_PETS_FORBIDDEN_IN_HOTEL: string = 'RSEME_PETS_FORBIDDEN_IN_HOTEL';
    public static RSEME_PETS_FORBIDDEN_IN_FLAT: string = 'RSEME_PETS_FORBIDDEN_IN_FLAT';
    public static RSEME_MAX_PETS: string = 'RSEME_MAX_PETS';
    public static RSEME_MAX_NUMBER_OF_OWN_PETS: string = 'RSEME_MAX_NUMBER_OF_OWN_PETS';
    public static RSEME_NO_FREE_TILES_FOR_PET: string = 'RSEME_NO_FREE_TILES_FOR_PET';
    public static RSEME_SELECTED_TILE_NOT_FREE_FOR_PET: string = 'RSEME_SELECTED_TILE_NOT_FREE_FOR_PET';
    public static RSEME_BOTS_FORBIDDEN_IN_HOTEL: string = 'RSEME_BOTS_FORBIDDEN_IN_HOTEL';
    public static RSEME_BOTS_FORBIDDEN_IN_FLAT: string = 'RSEME_BOTS_FORBIDDEN_IN_FLAT';
    public static RSEME_BOT_LIMIT_REACHED: string = 'RSEME_BOT_LIMIT_REACHED';
    public static RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT: string = 'RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT';
    public static RSEME_BOT_NAME_NOT_ACCEPTED: string = 'RSEME_BOT_NAME_NOT_ACCEPTED';

    private _message: string;

    constructor(k: string, _arg_2: IRoomSession, _arg_3: string = null)
    {
        super(k, _arg_2);

        this._message = _arg_3;
    }

    public get message(): string
    {
        return this._message;
    }
}
