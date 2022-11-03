import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { AvatarEffectSelectedParser } from '../../../parser';

export class AvatarEffectSelectedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvatarEffectSelectedParser);
    }

    public getParser(): AvatarEffectSelectedParser
    {
        return this.parser as AvatarEffectSelectedParser;
    }
}
