import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { AvatarEffectsParser } from '../../../parser/inventory/avatareffect/AvatarEffectsParser';

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
