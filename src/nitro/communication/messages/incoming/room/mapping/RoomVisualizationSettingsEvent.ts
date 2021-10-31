import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomVisualizationSettingsParser } from '../../../parser/room/mapping/RoomVisualizationSettingsParser';

export class RoomVisualizationSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomVisualizationSettingsParser);
    }

    public getParser(): RoomVisualizationSettingsParser
    {
        return this.parser as RoomVisualizationSettingsParser;
    }
}
