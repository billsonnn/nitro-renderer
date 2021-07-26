import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionConfirmPetBreedingEvent extends RoomSessionEvent
{
    public static CONFIRM_PET_BREEDING: string = 'RSPFUE_CONFIRM_PET_BREEDING';

    private _nestId: number;
    private _pet1: any;
    private _pet2: any;
    private _rarityCategories: any[];
    private _resultPetTypeId: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: any, _arg_4: any, _arg_5: any[], _arg_6: number)
    {
        super(RoomSessionConfirmPetBreedingEvent.CONFIRM_PET_BREEDING, k);

        this._nestId = _arg_2;
        this._pet1 = _arg_3;
        this._pet2 = _arg_4;
        this._rarityCategories = _arg_5;
        this._resultPetTypeId = _arg_6;
    }

    public get rarityCategories(): any[]
    {
        return this._rarityCategories;
    }

    public get nestId(): number
    {
        return this._nestId;
    }

    public get pet1(): any
    {
        return this._pet1;
    }

    public get pet2(): any
    {
        return this._pet2;
    }

    public get resultPetTypeId(): number
    {
        return this._resultPetTypeId;
    }
}
