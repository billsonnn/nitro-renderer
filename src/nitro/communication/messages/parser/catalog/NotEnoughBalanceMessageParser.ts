import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class NotEnoughBalanceMessageParser implements IMessageParser
{
    private _Str_17433: boolean = false;
    private _Str_19031: boolean = false;
    private _activityPointType: number = 0;

    public flush(): boolean
    {
        this._Str_17433 = false;
        this._Str_19031 = false;
        this._activityPointType = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._Str_17433 = wrapper.readBoolean();
        this._Str_19031 = wrapper.readBoolean();

        if(wrapper.bytesAvailable) this._activityPointType = wrapper.readInt();

        return true;
    }

    public get notEnoughCredits(): boolean
    {
        return this._Str_17433;
    }

    public get _Str_24352(): boolean
    {
        return this._Str_19031;
    }

    public get activityPointType(): number
    {
        return this._activityPointType;
    }
}
