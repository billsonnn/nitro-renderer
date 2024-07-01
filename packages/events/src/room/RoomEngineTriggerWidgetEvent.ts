import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineTriggerWidgetEvent extends RoomEngineObjectEvent
{
    public static OPEN_WIDGET: string = 'RETWE_OPEN_WIDGET';
    public static CLOSE_WIDGET: string = 'RETWE_CLOSE_WIDGET';
    public static OPEN_FURNI_CONTEXT_MENU: string = 'RETWE_OPEN_FURNI_CONTEXT_MENU';
    public static CLOSE_FURNI_CONTEXT_MENU: string = 'RETWE_CLOSE_FURNI_CONTEXT_MENU';
    public static REQUEST_PLACEHOLDER: string = 'RETWE_REQUEST_PLACEHOLDER';
    public static REQUEST_CREDITFURNI: string = 'RETWE_REQUEST_CREDITFURNI';
    public static REQUEST_STACK_HEIGHT: string = 'RETWE_REQUEST_STACK_HEIGHT';
    public static REQUEST_EXTERNAL_IMAGE: string = 'RETWE_REQUEST_EXTERNAL_IMAGE';
    public static REQUEST_STICKIE: string = 'RETWE_REQUEST_STICKIE';
    public static REQUEST_PRESENT: string = 'RETWE_REQUEST_PRESENT';
    public static REQUEST_TROPHY: string = 'RETWE_REQUEST_TROPHY';
    public static REQUEST_TEASER: string = 'RETWE_REQUEST_TEASER';
    public static REQUEST_ECOTRONBOX: string = 'RETWE_REQUEST_ECOTRONBOX';
    public static REQUEST_DIMMER: string = 'RETWE_REQUEST_DIMMER';
    public static REMOVE_DIMMER: string = 'RETWE_REMOVE_DIMMER';
    public static REQUEST_CLOTHING_CHANGE: string = 'RETWE_REQUEST_CLOTHING_CHANGE';
    public static REQUEST_PLAYLIST_EDITOR: string = 'RETWE_REQUEST_PLAYLIST_EDITOR';
    public static REQUEST_MANNEQUIN: string = 'RETWE_REQUEST_MANNEQUIN';
    public static REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG: string = 'ROWRE_REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG';
    public static REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG: string = 'ROWRE_REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG';
    public static REQUEST_BACKGROUND_COLOR: string = 'RETWE_REQUEST_BACKGROUND_COLOR';
    public static REQUEST_AREA_HIDE: string = 'RETWE_REQUEST_AREA_HIDE';
    public static REQUEST_MYSTERYBOX_OPEN_DIALOG: string = 'RETWE_REQUEST_MYSTERYBOX_OPEN_DIALOG';
    public static REQUEST_EFFECTBOX_OPEN_DIALOG: string = 'RETWE_REQUEST_EFFECTBOX_OPEN_DIALOG';
    public static REQUEST_MYSTERYTROPHY_OPEN_DIALOG: string = 'RETWE_REQUEST_MYSTERYTROPHY_OPEN_DIALOG';
    public static REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING: string = 'RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING';
    public static REQUEST_ACHIEVEMENT_RESOLUTION_FAILED: string = 'RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED';
    public static REQUEST_FRIEND_FURNITURE_CONFIRM: string = 'RETWE_REQUEST_FRIEND_FURNITURE_CONFIRM';
    public static REQUEST_FRIEND_FURNITURE_ENGRAVING: string = 'RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING';
    public static REQUEST_BADGE_DISPLAY_ENGRAVING: string = 'RETWE_REQUEST_BADGE_DISPLAY_ENGRAVING';
    public static REQUEST_HIGH_SCORE_DISPLAY: string = 'RETWE_REQUEST_HIGH_SCORE_DISPLAY';
    public static REQUEST_HIDE_HIGH_SCORE_DISPLAY: string = 'RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY';
    public static REQUEST_INTERNAL_LINK: string = 'RETWE_REQUEST_INTERNAL_LINK';
    public static REQUEST_ROOM_LINK: string = 'RETWE_REQUEST_ROOM_LINK';
    public static REQUEST_YOUTUBE: string = 'RETWE_REQUEST_YOUTUBE';

    private _widget: string;

    constructor(type: string, roomId: number, objectId: number, category: number, widget: string = null)
    {
        super(type, roomId, objectId, category);

        this._widget = widget;
    }

    public get widget(): string
    {
        return this._widget;
    }

    public get contextMenu(): string
    {
        return this._widget;
    }
}
