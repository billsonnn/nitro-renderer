import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { AvatarEffectActivatedParser } from '../../../parser/inventory/avatareffect/AvatarEffectActivatedParser';

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
