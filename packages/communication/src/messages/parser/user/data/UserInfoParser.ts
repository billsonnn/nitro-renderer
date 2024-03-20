import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { UserInfoDataParser } from './UserInfoDataParser';

export class UserInfoParser implements IMessageParser
{
    private _userInfo: UserInfoDataParser;

    public flush(): boolean
    {
        this._userInfo = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userInfo = new UserInfoDataParser(wrapper);

        if(!this._userInfo) return false;

        return true;
    }

    public get userInfo(): UserInfoDataParser
    {
        return this._userInfo;
    }
}
