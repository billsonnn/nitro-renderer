import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionConfirmPetBreedingEvent extends RoomSessionEvent
{
    public static RSPFUE_CONFIRM_PET_BREEDING: string = 'RSPFUE_CONFIRM_PET_BREEDING';

    private _Str_5743: number;
    private _pet1: any;
    private _pet2: any;
    private _Str_4447: any[];
    private _Str_6321: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: any, _arg_4: any, _arg_5: any[], _arg_6: number)
    {
        super(RoomSessionConfirmPetBreedingEvent.RSPFUE_CONFIRM_PET_BREEDING, k);

        this._Str_5743 = _arg_2;
        this._pet1 = _arg_3;
        this._pet2 = _arg_4;
        this._Str_4447 = _arg_5;
        this._Str_6321 = _arg_6;
    }

    public get _Str_10346(): any[]
    {
        return this._Str_4447;
    }

    public get _Str_12369(): number
    {
        return this._Str_5743;
    }

    public get pet1(): any
    {
        return this._pet1;
    }

    public get pet2(): any
    {
        return this._pet2;
    }

    public get _Str_16867(): number
    {
        return this._Str_6321;
    }
}