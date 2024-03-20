import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { CameraSnapshotMessageParser } from '../../parser';

export class CameraSnapshotMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraSnapshotMessageParser);
    }

    public getParser(): CameraSnapshotMessageParser
    {
        return this.parser as CameraSnapshotMessageParser;
    }
}
