import { ModeratorUserInfoData } from 'nitro-renderer/src/nitro/communication/messages/parser/modtool/utils/ModeratorUserInfoData';
import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class ModtoolUserInfoParser implements IMessageParser
{
    private _data: ModeratorUserInfoData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new ModeratorUserInfoData(wrapper);

        return true;
    }

    public get data(): ModeratorUserInfoData
    {
        return this._data;
    }



}
