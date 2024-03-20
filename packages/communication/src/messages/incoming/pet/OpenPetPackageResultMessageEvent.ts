import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { OpenPetPackageResultMessageParser } from './../../parser';

export class OpenPetPackageResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OpenPetPackageResultMessageParser);
    }

    public getParser(): OpenPetPackageResultMessageParser
    {
        return this.parser as OpenPetPackageResultMessageParser;
    }
}
