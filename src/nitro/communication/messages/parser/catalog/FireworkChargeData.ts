import { IMessageDataWrapper } from '../../../../../api';

export class FireworkChargeData
{
    private _stuffId: number;
    private _charges: number;
    private _credits: number;
    private _activityPoints: number;
    private _creditsAndActivityPointsType: number;
    private _pathSize: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._stuffId = wrapper.readInt();
        this._charges = wrapper.readInt();
        this._credits = wrapper.readInt();
        this._activityPoints = wrapper.readInt();
        this._creditsAndActivityPointsType = wrapper.readInt();
        this._pathSize = wrapper.readInt();
    }

    public get stuffId(): number
    {
        return this._stuffId;
    }

    public get charges(): number
    {
        return this._charges;
    }

    public get credits(): number
    {
        return this._credits;
    }

    public get activityPoints(): number
    {
        return this._activityPoints;
    }

    public get pathSize(): number
    {
        return this._pathSize;
    }

    public get creditsAndActivityPointsType(): number
    {
        return this._creditsAndActivityPointsType;
    }
}
