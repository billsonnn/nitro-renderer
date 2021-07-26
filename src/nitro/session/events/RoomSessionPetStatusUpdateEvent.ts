import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetStatusUpdateEvent extends RoomSessionEvent
{
    public static PET_STATUS_UPDATE: string = 'RSPFUE_PET_STATUS_UPDATE';

    private _petId: number;
    private _canBreed: boolean;
    private _canHarvest: boolean;
    private _canRevive: boolean;
    private _hasBreedingPermission: boolean;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: boolean, _arg_4: boolean, _arg_5: boolean, _arg_6: boolean)
    {
        super(RoomSessionPetStatusUpdateEvent.PET_STATUS_UPDATE, k);

        this._petId = _arg_2;
        this._canBreed = _arg_3;
        this._canHarvest = _arg_4;
        this._canRevive = _arg_5;
        this._hasBreedingPermission = _arg_6;
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
