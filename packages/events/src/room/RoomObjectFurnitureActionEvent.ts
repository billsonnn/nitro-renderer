import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectFurnitureActionEvent extends RoomObjectEvent
{
    public static DICE_OFF: string = 'ROFCAE_DICE_OFF';
    public static DICE_ACTIVATE: string = 'ROFCAE_DICE_ACTIVATE';
    public static USE_HABBOWHEEL: string = 'ROFCAE_USE_HABBOWHEEL';
    public static STICKIE: string = 'ROFCAE_STICKIE';
    public static ENTER_ONEWAYDOOR: string = 'ROFCAE_ENTER_ONEWAYDOOR';
    public static SOUND_MACHINE_INIT: string = 'ROFCAE_SOUND_MACHINE_INIT';
    public static SOUND_MACHINE_START: string = 'ROFCAE_SOUND_MACHINE_START';
    public static SOUND_MACHINE_STOP: string = 'ROFCAE_SOUND_MACHINE_STOP';
    public static SOUND_MACHINE_DISPOSE: string = 'ROFCAE_SOUND_MACHINE_DISPOSE';
    public static JUKEBOX_INIT: string = 'ROFCAE_JUKEBOX_INIT';
    public static JUKEBOX_START: string = 'ROFCAE_JUKEBOX_START';
    public static JUKEBOX_MACHINE_STOP: string = 'ROFCAE_JUKEBOX_MACHINE_STOP';
    public static JUKEBOX_DISPOSE: string = 'ROFCAE_JUKEBOX_DISPOSE';
    public static MOUSE_BUTTON: string = 'ROFCAE_MOUSE_BUTTON';
    public static MOUSE_ARROW: string = 'ROFCAE_MOUSE_ARROW';
}
