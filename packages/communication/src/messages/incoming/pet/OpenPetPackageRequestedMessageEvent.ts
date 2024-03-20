import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { OpenPetPackageRequestedMessageParser } from './../../parser';

export class OpenPetPackageRequestedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OpenPetPackageRequestedMessageParser);
    }

    public getParser(): OpenPetPackageRequestedMessageParser
    {
        return this.parser as OpenPetPackageRequestedMessageParser;
    }
}
