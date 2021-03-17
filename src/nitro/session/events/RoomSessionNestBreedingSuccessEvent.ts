import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionNestBreedingSuccessEvent extends RoomSessionEvent
{
    public static RSPFUE_NEST_BREEDING_SUCCESS: string = 'RSPFUE_NEST_BREEDING_SUCCESS';

    private _rarityCategory: number;
    private _petId: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: number)
    {
        super(RoomSessionNestBreedingSuccessEvent.RSPFUE_NEST_BREEDING_SUCCESS, k);

        this._petId = _arg_2;
        this._rarityCategory = _arg_3;
    }

    public get _Str_16731(): number
    {
        return this._rarityCategory;
    }

    public get _Str_2508(): number
    {
        return this._petId;
    }
}