import { IRoomPetData } from '@/api'

export class RoomPetData implements IRoomPetData {
  private _skillThresholds: number[]

  private _id: number

  public get id(): number {
    return this._id
  }

  public set id(k: number) {
    this._id = k
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  public set level(level: number) {
    this._level = level
  }

  private _maximumLevel: number

  public get maximumLevel(): number {
    return this._maximumLevel
  }

  public set maximumLevel(k: number) {
    this._maximumLevel = k
  }

  private _experience: number

  public get experience(): number {
    return this._experience
  }

  public set experience(experience: number) {
    this._experience = experience
  }

  private _levelExperienceGoal: number

  public get levelExperienceGoal(): number {
    return this._levelExperienceGoal
  }

  public set levelExperienceGoal(k: number) {
    this._levelExperienceGoal = k
  }

  private _energy: number

  public get energy(): number {
    return this._energy
  }

  public set energy(energy: number) {
    this._energy = energy
  }

  private _maximumEnergy: number

  public get maximumEnergy(): number {
    return this._maximumEnergy
  }

  public set maximumEnergy(k: number) {
    this._maximumEnergy = k
  }

  private _happyness: number

  public get happyness(): number {
    return this._happyness
  }

  public set happyness(k: number) {
    this._happyness = k
  }

  private _maximumHappyness: number

  public get maximumHappyness(): number {
    return this._maximumHappyness
  }

  public set maximumHappyness(k: number) {
    this._maximumHappyness = k
  }

  private _ownerId: number

  public get ownerId(): number {
    return this._ownerId
  }

  public set ownerId(k: number) {
    this._ownerId = k
  }

  private _ownerName: string

  public get ownerName(): string {
    return this._ownerName
  }

  public set ownerName(ownerName: string) {
    this._ownerName = ownerName
  }

  private _respect: number

  public get respect(): number {
    return this._respect
  }

  public set respect(k: number) {
    this._respect = k
  }

  private _age: number

  public get age(): number {
    return this._age
  }

  public set age(age: number) {
    this._age = age
  }

  private _unknownRarity: number

  public get unknownRarity(): number {
    return this._unknownRarity
  }

  public set unknownRarity(k: number) {
    this._unknownRarity = k
  }

  private _saddle: boolean

  public get saddle(): boolean {
    return this._saddle
  }

  public set saddle(k: boolean) {
    this._saddle = k
  }

  private _rider: boolean

  public get rider(): boolean {
    return this._rider
  }

  public set rider(k: boolean) {
    this._rider = k
  }

  private _breedable: boolean

  public get breedable(): boolean {
    return this._breedable
  }

  public set breedable(k: boolean) {
    this._breedable = k
  }

  private _publiclyRideable: number

  public get publiclyRideable(): number {
    return this._publiclyRideable
  }

  public set publiclyRideable(k: number) {
    this._publiclyRideable = k
  }

  private _fullyGrown: boolean

  public get fullyGrown(): boolean {
    return this._fullyGrown
  }

  public set fullyGrown(k: boolean) {
    this._fullyGrown = k
  }

  private _dead: boolean

  public get dead(): boolean {
    return this._dead
  }

  public set dead(k: boolean) {
    this._dead = k
  }

  private _maximumTimeToLive: number

  public get maximumTimeToLive(): number {
    return this._maximumTimeToLive
  }

  public set maximumTimeToLive(k: number) {
    this._maximumTimeToLive = k
  }

  private _remainingTimeToLive: number

  public get remainingTimeToLive(): number {
    return this._remainingTimeToLive
  }

  public set remainingTimeToLive(k: number) {
    this._remainingTimeToLive = k
  }

  private _remainingGrowTime: number

  public get remainingGrowTime(): number {
    return this._remainingGrowTime
  }

  public set remainingGrowTime(k: number) {
    this._remainingGrowTime = k
  }

  private _rarityLevel: number

  public get rarityLevel(): number {
    return this._rarityLevel
  }

  public set rarityLevel(rarityLevel: number) {
    this._rarityLevel = rarityLevel
  }

  private _publiclyBreedable: boolean

  public get publiclyBreedable(): boolean {
    return this._publiclyBreedable
  }

  public set publiclyBreedable(k: boolean) {
    this._publiclyBreedable = k
  }

  private _adultLevel: number = 7

  public get adultLevel(): number {
    return this._adultLevel
  }

  public get skillTresholds(): number[] {
    return this._skillThresholds
  }

  public set skillTresholds(k: number[]) {
    this._skillThresholds = k
  }
}
