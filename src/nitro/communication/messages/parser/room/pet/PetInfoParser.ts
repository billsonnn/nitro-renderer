import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetInfoParser implements IMessageParser {
  private _skillThresholds: number[]

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _maximumLevel: number

  public get maximumLevel(): number {
    return this._maximumLevel
  }

  private _experience: number

  public get experience(): number {
    return this._experience
  }

  private _energy: number

  public get energy(): number {
    return this._energy
  }

  private _happyness: number

  public get happyness(): number {
    return this._happyness
  }

  private _levelExperienceGoal: number

  public get levelExperienceGoal(): number {
    return this._levelExperienceGoal
  }

  private _maximumEnergy: number

  public get maximumEnergy(): number {
    return this._maximumEnergy
  }

  private _maximumHappyness: number

  public get maximumHappyness(): number {
    return this._maximumHappyness
  }

  private _respect: number

  public get respect(): number {
    return this._respect
  }

  private _ownerId: number

  public get ownerId(): number {
    return this._ownerId
  }

  private _ownerName: string

  public get ownerName(): string {
    return this._ownerName
  }

  private _age: number

  public get age(): number {
    return this._age
  }

  private _rarityLevel: number

  public get rarityLevel(): number {
    return this._rarityLevel
  }

  private _saddle: boolean

  public get saddle(): boolean {
    return this._saddle
  }

  private _rider: boolean

  public get rider(): boolean {
    return this._rider
  }

  private _breedable: boolean

  public get breedable(): boolean {
    return this._breedable
  }

  private _fullyGrown: boolean

  public get fullyGrown(): boolean {
    return this._fullyGrown
  }

  private _dead: boolean

  public get dead(): boolean {
    return this._dead
  }

  private _maximumTimeToLive: number

  public get maximumTimeToLive(): number {
    return this._maximumTimeToLive
  }

  private _remainingTimeToLive: number

  public get remainingTimeToLive(): number {
    return this._remainingTimeToLive
  }

  private _remainingGrowTime: number

  public get remainingGrowTime(): number {
    return this._remainingGrowTime
  }

  private _publiclyRideable: number

  public get publiclyRideable(): number {
    return this._publiclyRideable
  }

  private _unknownRarity: number

  public get unknownRarity(): number {
    return this._unknownRarity
  }

  private _publiclyBreedable: boolean

  public get publiclyBreedable(): boolean {
    return this._publiclyBreedable
  }

  public get skillTresholds(): number[] {
    return this._skillThresholds
  }

  public flush(): boolean {
    this._id = -1
    this._skillThresholds = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._level = wrapper.readInt()
    this._maximumLevel = wrapper.readInt()
    this._experience = wrapper.readInt()
    this._levelExperienceGoal = wrapper.readInt()
    this._energy = wrapper.readInt()
    this._maximumEnergy = wrapper.readInt()
    this._happyness = wrapper.readInt()
    this._maximumHappyness = wrapper.readInt()
    this._respect = wrapper.readInt()
    this._ownerId = wrapper.readInt()
    this._age = wrapper.readInt()
    this._ownerName = wrapper.readString()
    this._rarityLevel = wrapper.readInt()
    this._saddle = wrapper.readBoolean()
    this._rider = wrapper.readBoolean()

    let total = wrapper.readInt()

    while (total > 0) {
      this._skillThresholds.push(wrapper.readInt())

      total--
    }

    this._skillThresholds.sort()
    this._publiclyRideable = wrapper.readInt()
    this._breedable = wrapper.readBoolean()
    this._fullyGrown = wrapper.readBoolean()
    this._dead = wrapper.readBoolean()
    this._unknownRarity = wrapper.readInt()
    this._maximumTimeToLive = wrapper.readInt()
    this._remainingTimeToLive = wrapper.readInt()
    this._remainingGrowTime = wrapper.readInt()
    this._publiclyBreedable = wrapper.readBoolean()

    return true
  }
}
