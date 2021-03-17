import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
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
