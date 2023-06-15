import { IMessageDataWrapper } from '@/api'

export class QuestMessageData {
  constructor(wrapper: IMessageDataWrapper) {
    this._receiveTime = new Date()
    this._campaignCode = wrapper.readString()
    this._completedQuestsInCampaign = wrapper.readInt()
    this._questCountInCampaign = wrapper.readInt()
    this._activityPointType = wrapper.readInt()
    this._id = wrapper.readInt()
    this._accepted = wrapper.readBoolean()
    this._type = wrapper.readString()
    this._imageVersion = wrapper.readString()
    this._rewardCurrencyAmount = wrapper.readInt()
    this._localizationCode = wrapper.readString()
    this._completedSteps = wrapper.readInt()
    this._totalSteps = wrapper.readInt()
    this._sortOrder = wrapper.readInt()
    this._catalogPageName = wrapper.readString()
    this._chainCode = wrapper.readString()
    this._easy = wrapper.readBoolean()
  }

  private _campaignCode: string

  public get campaignCode(): string {
    return this._campaignCode
  }

  private _completedQuestsInCampaign: number

  public get completedQuestsInCampaign(): number {
    return this._completedQuestsInCampaign
  }

  private _questCountInCampaign: number

  public get questCountInCampaign(): number {
    return this._questCountInCampaign
  }

  private _activityPointType: number

  public get activityPointType(): number {
    return this._activityPointType
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  public set id(k: number) {
    this._id = k
  }

  private _accepted: boolean

  public get accepted(): boolean {
    return this._accepted
  }

  public set accepted(k: boolean) {
    this._accepted = k
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _imageVersion: string

  public get imageVersion(): string {
    return this._imageVersion
  }

  private _rewardCurrencyAmount: number

  public get rewardCurrencyAmount(): number {
    return this._rewardCurrencyAmount
  }

  private _localizationCode: string

  public get localizationCode(): string {
    return this._localizationCode
  }

  private _completedSteps: number

  public get completedSteps(): number {
    return this._completedSteps
  }

  private _totalSteps: number

  public get totalSteps(): number {
    return this._totalSteps
  }

  private _waitPeriodSeconds: number

  public get waitPeriodSeconds(): number {
    if (this._waitPeriodSeconds < 1) {
      return 0
    }
    const k = new Date()
    const _local_2 = (k.getTime() - this._receiveTime.getTime())
    const _local_3 = Math.max(0, (this._waitPeriodSeconds - Math.floor((_local_2 / 1000))))
    return _local_3
  }

  public set waitPeriodSeconds(k: number) {
    this._waitPeriodSeconds = k
  }

  private _sortOrder: number

  public get sortOrder(): number {
    return this._sortOrder
  }

  private _catalogPageName: string

  public get catalogPageName(): string {
    return this._catalogPageName
  }

  private _chainCode: string

  public get chainCode(): string {
    return this._chainCode
  }

  private _easy: boolean

  public get easy(): boolean {
    return this._easy
  }

  private _receiveTime: Date

  public get receiveTime(): Date {
    return this._receiveTime
  }

  public get isCompleted(): boolean {
    return this._completedSteps == this._totalSteps
  }

  public get completedCampaign(): boolean {
    return this._id < 1
  }

  public get lastQuestInCampaign(): boolean {
    return this._completedQuestsInCampaign >= this._questCountInCampaign
  }

  public static getCampaignLocalizationKeyForCode(k: string): string {
    return 'quests.' + k
  }

  public getCampaignLocalizationKey(): string {
    return QuestMessageData.getCampaignLocalizationKeyForCode(this.campaignCode)
  }

  public getQuestLocalizationKey(): string {
    return (this.getCampaignLocalizationKey() + '.') + this._localizationCode
  }
}
