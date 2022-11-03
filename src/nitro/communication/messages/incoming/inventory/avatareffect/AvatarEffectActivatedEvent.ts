import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AvatarEffectActivatedParser } from '../../../parser';

export class AvatarEffectActivatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvatarEffectActivatedParser);
    }

    public getParser(): AvatarEffectActivatedParser
    {
        return this.parser as AvatarEffectActivatedParser;
    }
}
