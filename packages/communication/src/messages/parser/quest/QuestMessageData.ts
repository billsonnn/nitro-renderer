import { IMessageDataWrapper } from '@nitrots/api';

export class QuestMessageData
{
    private _campaignCode: string;
    private _completedQuestsInCampaign: number;
    private _questCountInCampaign: number;
    private _activityPointType: number;
    private _id: number;
    private _accepted: boolean;
    private _type: string;
    private _imageVersion: string;
    private _rewardCurrencyAmount: number;
    private _localizationCode: string;
    private _completedSteps: number;
    private _totalSteps: number;
    private _waitPeriodSeconds: number;
    private _sortOrder: number;
    private _catalogPageName: string;
    private _chainCode: string;
    private _easy: boolean;
    private _receiveTime: Date;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._receiveTime = new Date();
        this._campaignCode = wrapper.readString();
        this._completedQuestsInCampaign = wrapper.readInt();
        this._questCountInCampaign = wrapper.readInt();
        this._activityPointType = wrapper.readInt();
        this._id = wrapper.readInt();
        this._accepted = wrapper.readBoolean();
        this._type = wrapper.readString();
        this._imageVersion = wrapper.readString();
        this._rewardCurrencyAmount = wrapper.readInt();
        this._localizationCode = wrapper.readString();
        this._completedSteps = wrapper.readInt();
        this._totalSteps = wrapper.readInt();
        this._sortOrder = wrapper.readInt();
        this._catalogPageName = wrapper.readString();
        this._chainCode = wrapper.readString();
        this._easy = wrapper.readBoolean();
    }

    public static getCampaignLocalizationKeyForCode(k: string): string
    {
        return 'quests.' + k;
    }

    public get campaignCode(): string
    {
        return this._campaignCode;
    }

    public get localizationCode(): string
    {
        return this._localizationCode;
    }

    public get completedQuestsInCampaign(): number
    {
        return this._completedQuestsInCampaign;
    }

    public get questCountInCampaign(): number
    {
        return this._questCountInCampaign;
    }

    public get activityPointType(): number
    {
        return this._activityPointType;
    }

    public set accepted(k: boolean)
    {
        this._accepted = k;
    }

    public get accepted(): boolean
    {
        return this._accepted;
    }

    public set id(k: number)
    {
        this._id = k;
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): string
    {
        return this._type;
    }

    public get imageVersion(): string
    {
        return this._imageVersion;
    }

    public get rewardCurrencyAmount(): number
    {
        return this._rewardCurrencyAmount;
    }

    public get completedSteps(): number
    {
        return this._completedSteps;
    }

    public get totalSteps(): number
    {
        return this._totalSteps;
    }

    public get isCompleted(): boolean
    {
        return this._completedSteps == this._totalSteps;
    }

    public set waitPeriodSeconds(k: number)
    {
        this._waitPeriodSeconds = k;
    }

    public get waitPeriodSeconds(): number
    {
        if(this._waitPeriodSeconds < 1)
        {
            return 0;
        }
        const k = new Date();
        const _local_2 = (k.getTime() - this._receiveTime.getTime());
        const _local_3 = Math.max(0, (this._waitPeriodSeconds - Math.floor((_local_2 / 1000))));
        return _local_3;
    }

    public getCampaignLocalizationKey(): string
    {
        return QuestMessageData.getCampaignLocalizationKeyForCode(this.campaignCode);
    }

    public getQuestLocalizationKey(): string
    {
        return (this.getCampaignLocalizationKey() + '.') + this._localizationCode;
    }

    public get completedCampaign(): boolean
    {
        return this._id < 1;
    }

    public get lastQuestInCampaign(): boolean
    {
        return this._completedQuestsInCampaign >= this._questCountInCampaign;
    }

    public get receiveTime(): Date
    {
        return this._receiveTime;
    }

    public get sortOrder(): number
    {
        return this._sortOrder;
    }

    public get catalogPageName(): string
    {
        return this._catalogPageName;
    }

    public get chainCode(): string
    {
        return this._chainCode;
    }

    public get easy(): boolean
    {
        return this._easy;
    }
}
