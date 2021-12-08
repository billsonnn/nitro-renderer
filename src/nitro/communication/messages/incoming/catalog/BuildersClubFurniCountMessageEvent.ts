import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BuildersClubFurniCountMessageParser } from '../../parser';

export class BuildersClubFurniCountMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BuildersClubFurniCountMessageParser);
    }

    public getParser(): BuildersClubFurniCountMessageParser
    {
        return this.parser as BuildersClubFurniCountMessageParser;
    }
}
