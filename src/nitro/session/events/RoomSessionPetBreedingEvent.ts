import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPetBreedingEvent extends RoomSessionEvent
{
    public static RSPFUE_PET_BREEDING: string = 'RSPFUE_PET_BREEDING';

    private _state: number;
    private _ownPetId: number;
    private _otherPetId: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: number, _arg_4: number)
    {
        super(RoomSessionPetBreedingEvent.RSPFUE_PET_BREEDING, k);

        this._state = _arg_2;
        this._ownPetId = _arg_3;
        this._otherPetId = _arg_4;
    }

    public get state(): number
    {
        return this._state;
    }

    public get _Str_7440(): number
    {
        return this._ownPetId;
    }

    public get _Str_7663(): number
    {
        return this._otherPetId;
    }
}