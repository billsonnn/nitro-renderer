import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { CallForHelpCategoryData } from './utils/CallForHelpCategoryData';
import { ModtoolRoomVisitedData } from './utils/ModtoolRoomVisitedData';

export class ModtoolRoomUsersParser  implements IMessageParser
{
    private _data: ModtoolRoomVisitedData;
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._data = new ModtoolRoomVisitedData(wrapper);
        return true;
    }

    public get data(): ModtoolRoomVisitedData
    {
        return this._data;
    }
}
