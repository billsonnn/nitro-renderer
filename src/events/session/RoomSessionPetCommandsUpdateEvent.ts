import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetCommandsUpdateEvent extends RoomSessionEvent
{
    public static PET_COMMANDS: string = 'RSPIUE_ENABLED_PET_COMMANDS';

    private _petId: number;
    private _allCommandIds: number[];
    private _enabledCommandIds: number[];

    constructor(k: IRoomSession, id: number, commands: number[], enabledCommands: number[])
    {
        super(RoomSessionPetCommandsUpdateEvent.PET_COMMANDS, k);

        this._petId = id;
        this._allCommandIds = commands;
        this._enabledCommandIds = enabledCommands;
    }

    public get id(): number
    {
        return this._petId;
    }

    public get commands(): number[]
    {
        return this._allCommandIds;
    }

    public get enabledCommands(): number[]
    {
        return this._enabledCommandIds;
    }
}
