import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { AvatarEffectsParser } from '../../../parser';

export class AvatarEffectsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvatarEffectsParser);
    }

    public getParser(): AvatarEffectsParser
    {
        return this.parser as AvatarEffectsParser;
    }
}
