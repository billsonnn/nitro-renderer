import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
