import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ShowEnforceRoomCategoryDialogParser } from '../../parser/roomsettings/ShowEnforceRoomCategoryDialogParser';

export class ShowEnforceRoomCategoryDialogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ShowEnforceRoomCategoryDialogParser);
    }

    public getParser(): ShowEnforceRoomCategoryDialogParser
    {
        return this.parser as ShowEnforceRoomCategoryDialogParser;
    }
}
