import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomObjectSoundMachineEvent extends RoomEngineObjectEvent
{
    public static SOUND_MACHINE_INIT: string = 'ROSM_SOUND_MACHINE_INIT';
    public static SOUND_MACHINE_SWITCHED_ON: string = 'ROSM_SOUND_MACHINE_SWITCHED_ON';
    public static SOUND_MACHINE_SWITCHED_OFF: string = 'ROSM_SOUND_MACHINE_SWITCHED_OFF';
    public static SOUND_MACHINE_DISPOSE: string = 'ROSM_SOUND_MACHINE_DISPOSE';
    public static JUKEBOX_INIT: string = 'ROSM_JUKEBOX_INIT';
    public static JUKEBOX_SWITCHED_ON: string = 'ROSM_JUKEBOX_SWITCHED_ON';
    public static JUKEBOX_SWITCHED_OFF: string = 'ROSM_JUKEBOX_SWITCHED_OFF';
    public static JUKEBOX_DISPOSE: string = 'ROSM_JUKEBOX_DISPOSE';
}
