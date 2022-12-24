import { IRoomSession } from '../../api';
import { BreedingPetInfo, RarityCategoryData } from '../../nitro';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionConfirmPetBreedingEvent extends RoomSessionEvent
{
    public static CONFIRM_PET_BREEDING: string = 'RSPFUE_CONFIRM_PET_BREEDING';

    private _nestId: number;
    private _pet1: BreedingPetInfo;
    private _pet2: BreedingPetInfo;
    private _rarityCategories: RarityCategoryData[];
    private _resultPetTypeId: number;

    constructor(session: IRoomSession, nestId: number, pet1: BreedingPetInfo, pet2: BreedingPetInfo, rarityCategories: RarityCategoryData[], resultPetTypeId: number)
    {
        super(RoomSessionConfirmPetBreedingEvent.CONFIRM_PET_BREEDING, session);

        this._nestId = nestId;
        this._pet1 = pet1;
        this._pet2 = pet2;
        this._rarityCategories = rarityCategories;
        this._resultPetTypeId = resultPetTypeId;
    }

    public get nestId(): number
    {
        return this._nestId;
    }

    public get pet1(): BreedingPetInfo
    {
        return this._pet1;
    }

    public get pet2(): BreedingPetInfo
    {
        return this._pet2;
    }

    public get rarityCategories(): RarityCategoryData[]
    {
        return this._rarityCategories;
    }

    public get resultPetTypeId(): number
    {
        return this._resultPetTypeId;
    }
}
