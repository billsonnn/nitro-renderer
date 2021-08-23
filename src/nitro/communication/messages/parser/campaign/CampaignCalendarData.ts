import { IMessageDataWrapper } from '../../../../../core';

export class CampaignCalendarData
{
    private _campaignName: string;
    private _campaignImage: string;
    private _currentDay: number;
    private _campaignDays: number;
    private _openedDays: number[];
    private _missedDays: number[];

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._campaignName = wrapper.readString();
        this._campaignImage = wrapper.readString();
        this._currentDay = wrapper.readInt();
        this._campaignDays = wrapper.readInt();
        this._openedDays = [];

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._openedDays.push(wrapper.readInt());

            count--;
        }

        this._missedDays = [];

        count = wrapper.readInt();

        while(count > 0)
        {
            this._missedDays.push(wrapper.readInt());

            count--;
        }

        return true;
    }

    public clone(): CampaignCalendarData
    {
        const data = new CampaignCalendarData();

        data._Str_8399 = this._campaignDays;
        data._Str_19589 = this._campaignImage;
        data._Str_11123 = this._campaignName;
        data._Str_5472 = this._currentDay;
        data._Str_14267 = this._missedDays;
        data._Str_10724 = this._openedDays;

        return data;
    }

    public get _Str_11123(): string
    {
        return this._campaignName;
    }

    public set _Str_11123(name: string)
    {
        this._campaignName = name;
    }

    public get _Str_19589(): string
    {
        return this._campaignImage;
    }

    public set _Str_19589(image: string)
    {
        this._campaignImage = image;
    }

    public get _Str_5472(): number
    {
        return this._currentDay;
    }

    public set _Str_5472(day: number)
    {
        this._currentDay = day;
    }

    public get _Str_8399(): number
    {
        return this._campaignDays;
    }

    public set _Str_8399(days: number)
    {
        this._campaignDays = days;
    }

    public get _Str_10724(): number[]
    {
        return this._openedDays;
    }

    public set _Str_10724(days: number[])
    {
        this._openedDays = days;
    }

    public get _Str_14267(): number[]
    {
        return this._missedDays;
    }

    public set _Str_14267(days: number[])
    {
        this._missedDays = days;
    }
}
