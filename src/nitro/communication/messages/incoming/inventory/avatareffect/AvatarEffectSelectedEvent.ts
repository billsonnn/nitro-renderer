import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { AvatarEffectSelectedParser } from '../../../parser/inventory/avatareffect/AvatarEffectSelectedParser';

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
