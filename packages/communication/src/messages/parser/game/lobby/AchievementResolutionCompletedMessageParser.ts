import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class AchievementResolutionCompletedMessageParser implements IMessageParser
{
    private _stuffCode:string;
    private _badgeCode:string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._stuffCode = wrapper.readString();
        this._badgeCode = wrapper.readString();

        return true;
    }

    public get stuffCode():string
    {
        return this._stuffCode;
    }

    public get badgeCode():string
    {
        return this._badgeCode;
    }
}
