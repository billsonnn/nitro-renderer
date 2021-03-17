import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { AvatarEffectExpiredParser } from '../../../parser/inventory/avatareffect/AvatarEffectExpiredParser';

export class AvatarEffectExpiredEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvatarEffectExpiredParser);
    }

    public getParser(): AvatarEffectExpiredParser
    {
        return this.parser as AvatarEffectExpiredParser;
    }
}
