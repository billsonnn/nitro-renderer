import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RoomVisualizationSettingsParser } from '../../../parser';

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
