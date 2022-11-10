import { IRoomObject } from '../../api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectWidgetRequestEvent extends RoomObjectEvent
{
    public static OPEN_WIDGET: string = 'ROWRE_OPEN_WIDGET';
    public static CLOSE_WIDGET: string = 'ROWRE_CLOSE_WIDGET';
    public static OPEN_FURNI_CONTEXT_MENU: string = 'ROWRE_OPEN_FURNI_CONTEXT_MENU';
    public static CLOSE_FURNI_CONTEXT_MENU: string = 'ROWRE_CLOSE_FURNI_CONTEXT_MENU';
    public static PLACEHOLDER: string = 'ROWRE_PLACEHOLDER';
    public static CREDITFURNI: string = 'ROWRE_CREDITFURNI';
    public static STACK_HEIGHT: string = 'ROWRE_STACK_HEIGHT';
    public static EXTERNAL_IMAGE: string = 'ROWRE_EXTERNAL_IMAGE';
    public static STICKIE: string = 'ROWRE_STICKIE';
    public static PRESENT: string = 'ROWRE_PRESENT';
    public static TROPHY: string = 'ROWRE_TROPHY';
    public static TEASER: string = 'ROWRE_TEASER';
    public static ECOTRONBOX: string = 'ROWRE_ECOTRONBOX';
    public static DIMMER: string = 'ROWRE_DIMMER';
    public static WIDGET_REMOVE_DIMMER: string = 'ROWRE_WIDGET_REMOVE_DIMMER';
    public static CLOTHING_CHANGE: string = 'ROWRE_CLOTHING_CHANGE';
    public static JUKEBOX_PLAYLIST_EDITOR: string = 'ROWRE_JUKEBOX_PLAYLIST_EDITOR';
    public static MANNEQUIN: string = 'ROWRE_MANNEQUIN';
    public static PET_PRODUCT_MENU: string = 'ROWRE_PET_PRODUCT_MENU';
    public static GUILD_FURNI_CONTEXT_MENU: string = 'ROWRE_GUILD_FURNI_CONTEXT_MENU';
    public static MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG: string = 'ROWRE_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG';
    public static PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG: string = 'ROWRE_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG';
    public static BACKGROUND_COLOR: string = 'ROWRE_BACKGROUND_COLOR';
    public static MYSTERYBOX_OPEN_DIALOG: string = 'ROWRE_MYSTERYBOX_OPEN_DIALOG';
    public static EFFECTBOX_OPEN_DIALOG: string = 'ROWRE_EFFECTBOX_OPEN_DIALOG';
    public static MYSTERYTROPHY_OPEN_DIALOG: string = 'ROWRE_MYSTERYTROPHY_OPEN_DIALOG';
    public static ACHIEVEMENT_RESOLUTION_OPEN: string = 'ROWRE_ACHIEVEMENT_RESOLUTION_OPEN';
    public static ACHIEVEMENT_RESOLUTION_ENGRAVING: string = 'ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING';
    public static ACHIEVEMENT_RESOLUTION_FAILED: string = 'ROWRE_ACHIEVEMENT_RESOLUTION_FAILED';
    public static FRIEND_FURNITURE_CONFIRM: string = 'ROWRE_FRIEND_FURNITURE_CONFIRM';
    public static FRIEND_FURNITURE_ENGRAVING: string = 'ROWRE_FRIEND_FURNITURE_ENGRAVING';
    public static BADGE_DISPLAY_ENGRAVING: string = 'ROWRE_BADGE_DISPLAY_ENGRAVING';
    public static HIGH_SCORE_DISPLAY: string = 'ROWRE_HIGH_SCORE_DISPLAY';
    public static HIDE_HIGH_SCORE_DISPLAY: string = 'ROWRE_HIDE_HIGH_SCORE_DISPLAY';
    public static INERNAL_LINK: string = 'ROWRE_INTERNAL_LINK';
    public static ROOM_LINK: string = 'ROWRE_ROOM_LINK';
    public static YOUTUBE: string = 'ROWRE_YOUTUBE';

    constructor(type: string, roomObject: IRoomObject)
    {
        super(type, roomObject);
    }
}
