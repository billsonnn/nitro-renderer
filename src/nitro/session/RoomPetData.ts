import { IRoomPetData } from '../../api';

export class RoomPetData implements IRoomPetData
{
    private _id: number;
    private _level: number;
    private _maximumLevel: number;
    private _experience: number;
    private _levelExperienceGoal: number;
    private _energy: number;
    private _maximumEnergy: number;
    private _happyness: number;
    private _maximumHappyness: number;
    private _ownerId: number;
    private _ownerName: string;
    private _respect: number;
    private _age: number;
    private _unknownRarity: number;
    private _saddle: boolean;
    private _rider: boolean;
    private _breedable: boolean;
    private _skillThresholds: number[];
    private _publiclyRideable: number;
    private _fullyGrown: boolean;
    private _dead: boolean;
    private _maximumTimeToLive: number;
    private _remainingTimeToLive: number;
    private _remainingGrowTime: number;
    private _rarityLevel: number;
    private _publiclyBreedable: boolean;
    private _adultLevel: number = 7;

    public get id(): number
    {
        return this._id;
    }

    public set id(k: number)
    {
        this._id = k;
    }

    public get level(): number
    {
        return this._level;
    }

    public set level(level: number)
    {
        this._level = level;
    }

    public get maximumLevel(): number
    {
        return this._maximumLevel;
    }

    public set maximumLevel(k: number)
    {
        this._maximumLevel = k;
    }

    public get experience(): number
    {
        return this._experience;
    }

    public set experience(experience: number)
    {
        this._experience = experience;
    }

    public get levelExperienceGoal(): number
    {
        return this._levelExperienceGoal;
    }

    public set levelExperienceGoal(k: number)
    {
        this._levelExperienceGoal = k;
    }

    public get energy(): number
    {
        return this._energy;
    }

    public set energy(energy: number)
    {
        this._energy = energy;
    }

    public get maximumEnergy(): number
    {
        return this._maximumEnergy;
    }

    public set maximumEnergy(k: number)
    {
        this._maximumEnergy = k;
    }

    public get happyness(): number
    {
        return this._happyness;
    }

    public set happyness(k: number)
    {
        this._happyness = k;
    }

    public get maximumHappyness(): number
    {
        return this._maximumHappyness;
    }

    public set maximumHappyness(k: number)
    {
        this._maximumHappyness = k;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public set ownerId(k: number)
    {
        this._ownerId = k;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public set ownerName(ownerName: string)
    {
        this._ownerName = ownerName;
    }

    public get respect(): number
    {
        return this._respect;
    }

    public set respect(k: number)
    {
        this._respect = k;
    }

    public get age(): number
    {
        return this._age;
    }

    public set age(age: number)
    {
        this._age = age;
    }

    public get unknownRarity(): number
    {
        return this._unknownRarity;
    }

    public set unknownRarity(k: number)
    {
        this._unknownRarity = k;
    }

    public get saddle(): boolean
    {
        return this._saddle;
    }

    public set saddle(k: boolean)
    {
        this._saddle = k;
    }

    public get rider(): boolean
    {
        return this._rider;
    }

    public set rider(k: boolean)
    {
        this._rider = k;
    }

    public get skillTresholds(): number[]
    {
        return this._skillThresholds;
    }

    public set skillTresholds(k: number[])
    {
        this._skillThresholds = k;
    }

    public get publiclyRideable(): number
    {
        return this._publiclyRideable;
    }

    public set publiclyRideable(k: number)
    {
        this._publiclyRideable = k;
    }

    public get breedable(): boolean
    {
        return this._breedable;
    }

    public set breedable(k: boolean)
    {
        this._breedable = k;
    }

    public get fullyGrown(): boolean
    {
        return this._fullyGrown;
    }

    public set fullyGrown(k: boolean)
    {
        this._fullyGrown = k;
    }

    public get dead(): boolean
    {
        return this._dead;
    }

    public set dead(k: boolean)
    {
        this._dead = k;
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public set rarityLevel(rarityLevel: number)
    {
        this._rarityLevel = rarityLevel;
    }

    public get maximumTimeToLive(): number
    {
        return this._maximumTimeToLive;
    }

    public set maximumTimeToLive(k: number)
    {
        this._maximumTimeToLive = k;
    }

    public get remainingTimeToLive(): number
    {
        return this._remainingTimeToLive;
    }

    public set remainingTimeToLive(k: number)
    {
        this._remainingTimeToLive = k;
    }

    public get remainingGrowTime(): number
    {
        return this._remainingGrowTime;
    }

    public set remainingGrowTime(k: number)
    {
        this._remainingGrowTime = k;
    }

    public get publiclyBreedable(): boolean
    {
        return this._publiclyBreedable;
    }

    public set publiclyBreedable(k: boolean)
    {
        this._publiclyBreedable = k;
    }

    public get adultLevel(): number
    {
        return this._adultLevel;
    }
}
