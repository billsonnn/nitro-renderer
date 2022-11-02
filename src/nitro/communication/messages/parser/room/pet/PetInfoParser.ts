import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class PetInfoParser implements IMessageParser
{
    private _id: number;
    private _name: string;
    private _level: number;
    private _maximumLevel: number;
    private _experience: number;
    private _energy: number;
    private _happyness: number;
    private _levelExperienceGoal: number;
    private _maximumEnergy: number;
    private _maximumHappyness: number;
    private _respect: number;
    private _ownerId: number;
    private _ownerName: string;
    private _age: number;
    private _rarityLevel: number;
    private _saddle: boolean;
    private _rider: boolean;
    private _breedable: boolean;
    private _fullyGrown: boolean;
    private _dead: boolean;
    private _maximumTimeToLive: number;
    private _remainingTimeToLive: number;
    private _remainingGrowTime: number;
    private _skillThresholds: number[];
    private _publiclyRideable: number;
    private _unknownRarity: number;
    private _publiclyBreedable: boolean;

    public flush(): boolean
    {
        this._id = -1;
        this._skillThresholds = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        this._name = wrapper.readString();
        this._level = wrapper.readInt();
        this._maximumLevel = wrapper.readInt();
        this._experience = wrapper.readInt();
        this._levelExperienceGoal = wrapper.readInt();
        this._energy = wrapper.readInt();
        this._maximumEnergy = wrapper.readInt();
        this._happyness = wrapper.readInt();
        this._maximumHappyness = wrapper.readInt();
        this._respect = wrapper.readInt();
        this._ownerId = wrapper.readInt();
        this._age = wrapper.readInt();
        this._ownerName = wrapper.readString();
        this._rarityLevel = wrapper.readInt();
        this._saddle = wrapper.readBoolean();
        this._rider = wrapper.readBoolean();

        let total = wrapper.readInt();

        while(total > 0)
        {
            this._skillThresholds.push(wrapper.readInt());

            total--;
        }

        this._skillThresholds.sort();
        this._publiclyRideable = wrapper.readInt();
        this._breedable = wrapper.readBoolean();
        this._fullyGrown = wrapper.readBoolean();
        this._dead = wrapper.readBoolean();
        this._unknownRarity = wrapper.readInt();
        this._maximumTimeToLive = wrapper.readInt();
        this._remainingTimeToLive = wrapper.readInt();
        this._remainingGrowTime = wrapper.readInt();
        this._publiclyBreedable = wrapper.readBoolean();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get level(): number
    {
        return this._level;
    }

    public get maximumLevel(): number
    {
        return this._maximumLevel;
    }

    public get experience(): number
    {
        return this._experience;
    }

    public get energy(): number
    {
        return this._energy;
    }

    public get happyness(): number
    {
        return this._happyness;
    }

    public get levelExperienceGoal(): number
    {
        return this._levelExperienceGoal;
    }

    public get maximumEnergy(): number
    {
        return this._maximumEnergy;
    }

    public get maximumHappyness(): number
    {
        return this._maximumHappyness;
    }

    public get respect(): number
    {
        return this._respect;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get age(): number
    {
        return this._age;
    }

    public get rarityLevel(): number
    {
        return this._rarityLevel;
    }

    public get saddle(): boolean
    {
        return this._saddle;
    }

    public get rider(): boolean
    {
        return this._rider;
    }

    public get breedable(): boolean
    {
        return this._breedable;
    }

    public get fullyGrown(): boolean
    {
        return this._fullyGrown;
    }

    public get dead(): boolean
    {
        return this._dead;
    }

    public get maximumTimeToLive(): number
    {
        return this._maximumTimeToLive;
    }

    public get remainingTimeToLive(): number
    {
        return this._remainingTimeToLive;
    }

    public get remainingGrowTime(): number
    {
        return this._remainingGrowTime;
    }

    public get skillTresholds(): number[]
    {
        return this._skillThresholds;
    }

    public get publiclyRideable(): number
    {
        return this._publiclyRideable;
    }

    public get unknownRarity(): number
    {
        return this._unknownRarity;
    }

    public get publiclyBreedable(): boolean
    {
        return this._publiclyBreedable;
    }
}
