import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetStatusUpdateEvent extends RoomSessionEvent
{
    public static PET_STATUS_UPDATE: string = 'RSPFUE_PET_STATUS_UPDATE';

    private _petId: number;
    private _canBreed: boolean;
    private _canHarvest: boolean;
    private _canRevive: boolean;
    private _hasBreedingPermission: boolean;

    constructor(roomSession: IRoomSession, petId: number, canBreed: boolean, canHarvest: boolean, canRevive: boolean, hasBreedingPermission: boolean)
    {
        super(RoomSessionPetStatusUpdateEvent.PET_STATUS_UPDATE, roomSession);

        this._petId = petId;
        this._canBreed = canBreed;
        this._canHarvest = canHarvest;
        this._canRevive = canRevive;
        this._hasBreedingPermission = hasBreedingPermission;
    }

    public get petId(): number
    {
        return this._petId;
    }

    public get canBreed(): boolean
    {
        return this._canBreed;
    }

    public get canHarvest(): boolean
    {
        return this._canHarvest;
    }

    public get canRevive(): boolean
    {
        return this._canRevive;
    }

    public get hasBreedingPermission(): boolean
    {
        return this._hasBreedingPermission;
    }
}
