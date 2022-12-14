import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class NotEnoughBalanceMessageParser implements IMessageParser
{
    private _notEnoughCredits: boolean = false;
    private _notEnoughActivityPoints: boolean = false;
    private _activityPointType: number = 0;

    public flush(): boolean
    {
        this._notEnoughCredits = false;
        this._notEnoughActivityPoints = false;
        this._activityPointType = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._notEnoughCredits = wrapper.readBoolean();
        this._notEnoughActivityPoints = wrapper.readBoolean();

        if(wrapper.bytesAvailable) this._activityPointType = wrapper.readInt();

        return true;
    }

    public get notEnoughCredits(): boolean
    {
        return this._notEnoughCredits;
    }

    public get notEnoughActivityPoints(): boolean
    {
        return this._notEnoughActivityPoints;
    }

    public get activityPointType(): number
    {
        return this._activityPointType;
    }
}
